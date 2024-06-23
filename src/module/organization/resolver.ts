import { findAccountsByIds } from "./model/findAccountsByIds/index.js"
import { findOrganizationById } from "./model/findOrganizationById/index.js"
import type { OrganizationModule } from "./types/graphql.js"

export const resolver: OrganizationModule.Resolvers = {
  Query: {
    organization: async (_, { id }) => {
      const organization = await findOrganizationById(id)

      return organization
    },
  },
  Organization: {
    accounts: async (organization, _) => {
      const accounts = await findAccountsByIds(organization.accountIds)

      return accounts
    },
  },
}
