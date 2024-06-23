import { findAccountById } from "./model/findAccountById/index.js"
import { findOrganizationsByIds } from "./model/findOrganizationsByIds/index.js"
import type { AccountModule } from "./types/graphql.js"

export const resolver: AccountModule.Resolvers = {
  Query: {
    account: async (_, { id }) => {
      const account = await findAccountById(id)

      return account
    },
  },
  Account: {
    organizations: async (account, _) => {
      const organizations = await findOrganizationsByIds(
        account.organizationIds,
      )

      return organizations
    },
  },
}
