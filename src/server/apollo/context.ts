import type { ApolloFastifyContextFunction } from "@as-integrations/fastify"
import { initKysely } from "../kysely/index.js"

export type GraphQLContext = {
  db: Awaited<ReturnType<typeof initKysely>>
}

export const initGraphQLContext: ApolloFastifyContextFunction<GraphQLContext> =
  async () => {
    const db = await initKysely()

    return {
      db,
    }
  }
