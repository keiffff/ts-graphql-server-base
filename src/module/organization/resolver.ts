import { groupBy, map } from "lodash-es"
import type { OrganizationModule } from "./types/graphql.js"

export const resolver: OrganizationModule.Resolvers = {
  Query: {
    organization: async (_, { id }, { db }) => {
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
    },
  },
  Organization: {
    accounts: async (organization, _, { db }) => {
      const accounts = await db
        .selectFrom("account")
        .innerJoin(
          "accountOrganization",
          "accountOrganization.accountId",
          "account.id",
        )
        .select(["id", "name", "accountOrganization.organizationId"])
        .where("id", "in", organization.accountIds)
        .execute()

      return map(groupBy(accounts, "id"), (accounts) => ({
        id: accounts[0].id,
        name: accounts[0].name,
        organizationIds: accounts.map((account) => account.organizationId),
      }))
    },
  },
}
