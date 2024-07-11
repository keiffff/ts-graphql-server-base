import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError, type GraphQLFormattedError } from "graphql"
import { env } from "../../config/env.js"

export const formatError = (error: GraphQLFormattedError) => {
  // バリデーションエラーのsuggestionを返さないように
  if (
    env.nodeEnv === "production" &&
    error.extensions?.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
  ) {
    return new GraphQLError("Invalid query.", {
      extensions: { code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED },
    })
  }

  // サーバー内部のエラーメッセージを直接返さないように
  return new GraphQLError("Unexpected error.", {
    path: error.path,
    extensions: {
      code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    },
  })
}
