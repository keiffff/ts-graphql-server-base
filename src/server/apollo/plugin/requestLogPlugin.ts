import type { ApolloServerPlugin } from "@apollo/server"
import {
  type DefinitionNode,
  type OperationDefinitionNode,
  parse,
  stripIgnoredCharacters,
} from "graphql"
import { AppError } from "../../../common/error.js"
import { logger } from "../../../common/logger.js"

export const requestLogPlugin = (): ApolloServerPlugin => ({
  async requestDidStart({ request }) {
    if (!request.query) {
      return
    }

    const query = stripIgnoredCharacters(request.query)
    const variables = Object.keys(request.variables ?? {})

    // introspectionの場合には、ログを出力してもノイズになるだけなので弾く
    if (isIntrospectionQuery(query)) {
      return
    }

    logger.info("Request started.", {
      query,
      variables,
    })

    return {
      // biome-ignore lint/suspicious/useAwait:
      async didEncounterErrors({ errors, operationName }) {
        for (const error of errors) {
          logger.error(error.message, {
            operationName,
            stack: error.stack,
            extensions:
              error.originalError instanceof AppError
                ? error.originalError.metadata
                : {},
          })
        }
      },
    }
  },
})

/**
 * リクエストされたGraphQL queryが、IntrospectionQueryに合致するか判定する
 */
const isIntrospectionQuery = (query: string) => {
  const document = parse(query)

  const operationDefinitions = document.definitions.filter(
    (definition: DefinitionNode): definition is OperationDefinitionNode =>
      definition.kind === "OperationDefinition",
  )

  // IntrospectionQueryの場合、operationDefinitionは必ず1件になるため
  if (operationDefinitions.length > 1) {
    return false
  }

  const selectionNodes = operationDefinitions[0].selectionSet.selections

  // IntrospectionQueryの場合、selectionNodeは必ず1件になるため
  if (selectionNodes.length > 1) {
    return false
  }

  const selectionNode = selectionNodes[0]

  return (
    selectionNode.kind === "Field" && selectionNode.name.value === "__schema"
  )
}
