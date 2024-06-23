import type { ApolloFastifyContextFunction } from "@as-integrations/fastify"
import { findAccountById } from "../../module/account/model/findAccountById/index.js"

export type GraphQLContext = {
  requester: {
    id: string
  } | null
}

export const initGraphQLContext: ApolloFastifyContextFunction<
  GraphQLContext
> = async () => {
  // TODO: 認証情報からアカウントIDを引いてくる
  const accountId = "018f1279-9922-7e9a-b2f7-769d26115737"

  const account = await findAccountById(accountId)

  return {
    requester: account,
  }
}
