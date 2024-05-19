import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchema } from "@graphql-tools/load"
import { loadFiles } from "@graphql-tools/load-files"
import { mergeResolvers } from "@graphql-tools/merge"
import { addResolversToSchema } from "@graphql-tools/schema"

const createGraphQLSchema = async () => {
  const baseDir = resolve(fileURLToPath(import.meta.url), "../../../")

  const loadedSchema = await loadSchema(join(baseDir, "/module/*/*.graphql"), {
    loaders: [new GraphQLFileLoader()],
  })

  const resolvers = mergeResolvers(
    await loadFiles(join(baseDir, "/module/*/resolver.*"), {
      exportNames: ["resolver"],
    }),
  )

  return addResolversToSchema({
    schema: loadedSchema,
    resolvers,
  })
}

export const graphQLSchema = await createGraphQLSchema()
