import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely"
import pg from "pg"
import { env } from "../../config/env.js"
import type { DB } from "./types.js"

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    // NOTE: Native ESMで動かすには、Poolをimportするのではなく、pg.Poolとする必要がある
    pool: new pg.Pool({
      connectionString: env.db.appDatabaseUrl,
    }),
  }),
  plugins: [new CamelCasePlugin()],
})
