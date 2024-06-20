import { CamelCasePlugin, Kysely, PostgresDialect, sql } from "kysely"
import pg from "pg"
import { logger } from "../../common/logger.js"
import { env } from "../../config/env.js"
import type { DB } from "./types.js"

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    // NOTE: Native ESMで動かすには、Poolをimportするのではなく、pg.Poolとする必要がある
    pool: new pg.Pool({
      connectionString: env.db.appDatabaseUrl,
    }),
  }),
  plugins: [new CamelCasePlugin()],
})

export const initKysely = async () => {
  // TODO: リクエストを受信した際、アプリケーションコンテキストとして実行したい処理を記述する
  try {
    await sql`SELECT 1;`.execute(db)
  } catch (e) {
    logger.error("Failed to establish database connection:", { e })
    throw e
  }

  return db
}
