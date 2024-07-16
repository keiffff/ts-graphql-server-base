import { db } from "../../../../common/db/index.js"

export const insertAccount = async (name: string) =>
  await db
    .insertInto("account")
    .values({ name })
    .returning(["id", "name"])
    .executeTakeFirstOrThrow()
