import type { Organization } from "../organization/model/index.js"
import { findAccountById } from "./model/findAccountById/index.js"
import { insertAccount } from "./model/insertAccount/index.js"
import type { AccountModule } from "./types/graphql.js"

export const resolver: AccountModule.Resolvers = {
  Query: {
    account: async (_, { id }) => {
      const account = await findAccountById(id)

      return account
    },
  },
  Account: {
    organizations: async (account, _, { dataLoaders }) => {
      const organizations = await dataLoaders.organization.loadMany(
        account.organizationIds,
      )

      return organizations.filter(
        (organization): organization is Organization =>
          organization !== null && !(organization instanceof Error),
      )
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const newAccount = await insertAccount(input.name)

      return {
        account: {
          id: newAccount.id,
          name: newAccount.name,
          organizationIds: [],
        },
      }
    },
  },
}
