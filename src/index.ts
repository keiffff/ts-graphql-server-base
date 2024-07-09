import { logger } from "./common/logger.js"
import { env } from "./config/env.js"
import { initApolloServer } from "./server/apollo/index.js"
import { initFastifyServer } from "./server/fastify/index.js"

const runGraphQLServer = async () => {
  const fastify = await initFastifyServer()

  await initApolloServer(fastify)

  await fastify.listen(
    {
      port: env.server.port,
      host: "0.0.0.0",
    },
    (error) => {
      if (error) {
        logger.error("Server error", { error })
        process.exit(1)
      }
    },
  )

  if (env.nodeEnv === "development") {
    logger.info(
      `🚀 Server ready at: http://localhost:${env.server.port}/graphql`,
      {
        env: env.appEnv,
      },
    )
  }
}

runGraphQLServer()
