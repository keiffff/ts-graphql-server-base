import { ApolloServer } from "@apollo/server"
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify"
import type { FastifyInstance } from "fastify"
import { type GraphQLContext, initGraphQLContext } from "./context.js"
import { formatError } from "./error.js"
import { requestLogPlugin } from "./plugin/requestLogPlugin.js"
import { graphQLSchema } from "./schema.js"

export const initApolloServer = async (fastify: FastifyInstance) => {
  const apollo = new ApolloServer<GraphQLContext>({
    schema: graphQLSchema,
    formatError,
    plugins: [fastifyApolloDrainPlugin(fastify), requestLogPlugin()],
  })

  await apollo.start()

  await fastify.register(fastifyApollo(apollo), {
    context: initGraphQLContext,
  })

  return apollo
}
