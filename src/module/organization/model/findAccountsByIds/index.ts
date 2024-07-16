import { groupBy, map } from "lodash-es"
import { db } from "../../../../common/db/index.js"

export const findAccountsByIds = async (ids: string[]) => {
  if (ids.length === 0) {
    return []
  }

  const accounts = await db
    .selectFrom("account")
    .innerJoin(
      "accountOrganization",
      "accountOrganization.accountId",
      "account.id",
    )
    .select(["id", "name", "accountOrganization.organizationId"])
    .where("id", "in", ids)
    .execute()

  return map(groupBy(accounts, "id"), (accounts) => ({
    id: accounts[0].id,
    name: accounts[0].name,
    organizationIds: accounts.map((account) => account.organizationId),
  }))
}
