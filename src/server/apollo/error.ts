import {
  ApolloServerErrorCode,
  unwrapResolverError,
} from "@apollo/server/errors"
import { GraphQLError, type GraphQLFormattedError } from "graphql"
import { AppError, errorCode } from "../../common/error.js"

const createGraphQLErrorFormatter =
  (): ((
    formattedError: GraphQLFormattedError,
    error: unknown,
  ) => GraphQLFormattedError) =>
  (formattedError, error) => {
    if (
      formattedError.extensions?.code ===
        ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED ||
      formattedError.extensions?.code === ApolloServerErrorCode.BAD_USER_INPUT
    ) {
      return new GraphQLError("Bad Request Error.", {
        extensions: {
          code: errorCode.BAD_REQUEST,
        },
      })
    }

    const originalError = unwrapResolverError(error)

    if (originalError instanceof AppError) {
      return new GraphQLError(originalError.message, {
        extensions: {
          code: originalError.code,
        },
      })
    }

    return new GraphQLError("Internal Server Error.", {
      extensions: {
        code: errorCode.INTERNAL_SERVER_ERROR,
      },
    })
  }

export const graphQLErrorFormatter = createGraphQLErrorFormatter()
