import { groupBy, map } from "lodash-es"
import type { AccountModule } from "./types/graphql.js"

export const resolver: AccountModule.Resolvers = {
  Query: {
    account: async (_, { id }, { db }) => {
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
    },
  },
  Account: {
    organizations: async (account, _, { db }) => {
      const organizations = await db
        .selectFrom("organization")
        .innerJoin(
          "accountOrganization",
          "accountOrganization.organizationId",
          "organization.id",
        )
        .select(["id", "name", "accountOrganization.accountId"])
        .where("id", "in", account.organizationIds)
        .execute()

      return map(groupBy(organizations, "id"), (organizations) => ({
        id: organizations[0].id,
        name: organizations[0].name,
        accountIds: organizations.map((organization) => organization.accountId),
      }))
    },
  },
}
