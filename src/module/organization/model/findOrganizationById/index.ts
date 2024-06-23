import { db } from "../../../../common/db/index.js"

export const findOrganizationById = async (id: string) => {
  const organizations = await db
    .selectFrom("organization")
    .innerJoin(
      "accountOrganization",
      "accountOrganization.organizationId",
      "organization.id",
    )
    .select(["id", "name", "accountOrganization.accountId"])
    .where("id", "=", id)
    .execute()

  if (organizations.length === 0) {
    return null
  }

  return {
    id: organizations[0].id,
    name: organizations[0].name,
    accountIds: organizations.map((organization) => organization.accountId),
  }
}
