import { db } from "../../../../common/db/index.js"

export const findAccountById = async (id: string) => {
  const accounts = await db
    .selectFrom("account")
    .innerJoin(
      "accountOrganization",
      "accountOrganization.accountId",
      "account.id",
    )
    .select([
      "account.id",
      "account.name",
      "accountOrganization.organizationId",
    ])
    .where("account.id", "=", id)
    .execute()

  if (accounts.length === 0) {
    return null
  }

  return {
    id: accounts[0].id,
    name: accounts[0].name,
    organizationIds: accounts.map((account) => account.organizationId),
  }
}
