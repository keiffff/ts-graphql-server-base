import type { ApolloFastifyContextFunction } from "@as-integrations/fastify"
import { createAccountDataLoader } from "../../module/account/dataLoader.js"
import { createOrganizationDataLoader } from "../../module/organization/dataLoader.js"

export type GraphQLContext = {
  req: {
    account?: {
      id: string
      organizationIds: string[]
    }
  }
  dataLoaders: {
    account: ReturnType<typeof createAccountDataLoader>
    organization: ReturnType<typeof createOrganizationDataLoader>
  }
}

export const initGraphQLContext: ApolloFastifyContextFunction<
  GraphQLContext
  // biome-ignore lint/suspicious/useAwait: <explanation>
> = async () => {
  // TODO: 認証情報からアカウントIDを引いてくる
  const accountId = "018f1279-9922-7e9a-b2f7-769d26115737"

  const account = {
    id: accountId,
    organizationIds: [],
  }

  return {
    req: {
      account: account
        ? {
            id: account.id,
            organizationIds: account.organizationIds,
          }
        : undefined,
    },
    dataLoaders: {
      account: createAccountDataLoader(),
      organization: createOrganizationDataLoader(),
    },
  }
}
