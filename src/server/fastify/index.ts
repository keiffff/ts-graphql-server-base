import compress from "@fastify/compress"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import Fastify from "fastify"
import { env } from "../../config/env.js"

export const initFastifyServer = async () => {
  const fastify = Fastify()

  await fastify.register(
    helmet,
    // NOTE: 開発中はapollo studio（GraphQL Playground）を閲覧できるようにする
    env.nodeEnv !== "production"
      ? {
          crossOriginEmbedderPolicy: false,
          contentSecurityPolicy: false,
        }
      : {},
  )
  await fastify.register(cors, {
    origin: [
      /^https:\/\/.*/,
      /^http:\/\/.*/,
      "https://studio.apollographql.com",
    ],
  })
  await fastify.register(compress, { encodings: ["gzip", "deflate"] })

  return fastify
}
