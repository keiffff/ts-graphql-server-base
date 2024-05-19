import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "./src/module/**/schema.graphql",
  overwrite: true,
  emitLegacyCommonJSImports: false,
  generates: {
    "./src/common/types/graphql.ts": {
      config: {
        useTypeImports: true,
        namingConvention: {
          transformUnderscore: true,
        },
        enumsAsTypes: true,
        contextType: "../../server/apollo/context.js#GraphQLContext",
        useIndexSignature: true,
        typesPrefix: "Gql",
        mappers: {
          Account: "../../module/account/model.js#Account",
          Organization: "../../module/organization/model.js#Organization",
        },
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
    "./src/module/": {
      preset: "graphql-modules",
      presetConfig: {
        useGraphQLModules: false,
        baseTypesPath: "./common/types/graphql.ts",
        importBaseTypesFrom: "../../../common/types/graphql.ts",
        filename: "types/graphql.ts",
        requireRootResolvers: true,
      },
      config: {
        useTypeImports: true,
        namingConvention: {
          transformUnderscore: true,
        },
        typesPrefix: "Gql",
        enumsAsTypes: true,
      },
    },
  },
}

export default config
