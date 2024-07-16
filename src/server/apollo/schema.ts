import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { loadFiles } from "@graphql-tools/load-files"
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { constraintDirectiveTypeDefs } from "graphql-constraint-directive/apollo4.js"
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from "graphql-scalars"

export const createGraphQLSchema = async () => {
  const baseDir = resolve(fileURLToPath(import.meta.url), "../../../")

  const typeDefs = await loadFiles(join(baseDir, "/module/*/*.graphql")).then(
    (types) => mergeTypeDefs(types),
  )

  const resolvers = mergeResolvers([
    scalarResolvers,
    ...(await loadFiles(join(baseDir, "/module/*/resolver.*"), {
      exportNames: ["resolver"],
    })),
  ])

  return makeExecutableSchema({
    typeDefs: [scalarTypeDefs, constraintDirectiveTypeDefs, typeDefs],
    resolvers,
  })
}
