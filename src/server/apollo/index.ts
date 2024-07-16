import { ApolloServer } from "@apollo/server"
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify"
import type { FastifyInstance } from "fastify"
import { createApollo4QueryValidationPlugin } from "graphql-constraint-directive/apollo4.js"
import { type GraphQLContext, initGraphQLContext } from "./context.js"
import { formatError } from "./error.js"
import { requestLogPlugin } from "./plugin/requestLogPlugin.js"
import { createGraphQLSchema } from "./schema.js"

export const initApolloServer = async (fastify: FastifyInstance) => {
  const apollo = new ApolloServer<GraphQLContext>({
    schema: await createGraphQLSchema(),
    formatError,
    plugins: [
      fastifyApolloDrainPlugin(fastify),
      // @ts-ignore: plugin内部に起因する型エラーが出るが、正常に動作する
      createApollo4QueryValidationPlugin(),
      requestLogPlugin(),
    ],
  })

  await apollo.start()

  await fastify.register(fastifyApollo(apollo), {
    context: initGraphQLContext,
  })

  return apollo
}
