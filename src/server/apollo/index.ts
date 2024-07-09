import { ApolloServer } from "@apollo/server"
import { ApolloServerErrorCode } from "@apollo/server/errors"
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify"
import type { FastifyInstance } from "fastify"
import { GraphQLError } from "graphql"
import { env } from "../../config/env.js"
import { type GraphQLContext, initGraphQLContext } from "./context.js"
import { requestLogPlugin } from "./plugin/requestLogPlugin.js"
import { graphQLSchema } from "./schema.js"

export const initApolloServer = async (fastify: FastifyInstance) => {
  const apollo = new ApolloServer<GraphQLContext>({
    schema: graphQLSchema,
    formatError: (error) => {
      // prdの場合はバリデーションエラーのsuggestionを返さないように
      if (
        env.appEnv === "prd" &&
        error.extensions?.code ===
          ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
      ) {
        return new GraphQLError("Invalid query.", {
          extensions: { code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED },
        })
      }

      return error
    },
    plugins: [fastifyApolloDrainPlugin(fastify), requestLogPlugin()],
    introspection: true,
  })

  await apollo.start()

  await fastify.register(fastifyApollo(apollo), {
    context: initGraphQLContext,
  })

  return apollo
}
