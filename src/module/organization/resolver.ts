import type { Account } from "../account/model/index.js"
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
    accounts: async (organization, _, { dataLoaders }) => {
      const accounts = await dataLoaders.account.loadMany(
        organization.accountIds,
      )

      return accounts.filter(
        (account): account is Account =>
          account !== null && !(account instanceof Error),
      )
    },
  },
}
