import { groupBy, map } from "lodash-es"
import { db } from "../../../../common/db/index.js"

export const findOrganizationsByIds = async (ids: readonly string[]) => {
  if (ids.length === 0) {
    return []
  }

  const organizations = await db
    .selectFrom("organization")
    .innerJoin(
      "accountOrganization",
      "accountOrganization.organizationId",
      "organization.id",
    )
    .select(["id", "name", "accountOrganization.accountId"])
    .where("id", "in", ids)
    .execute()

  return map(groupBy(organizations, "id"), (organizations) => ({
    id: organizations[0].id,
    name: organizations[0].name,
    accountIds: organizations.map((organization) => organization.accountId),
  }))
}
