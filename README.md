# ts-graphql-server-base

## Features

- Native ESM
- GraphQL ServerフレームワークにApollo Server（fastify integration）
- GraphQL実装（schema定義、resolver実装）のモジュール化
- DBマイグレーションツールにsqldef（psqldef）
- 型安全なクエリビルダーとしてkysely + DBスキーマからの型定義自動生成にkysely-codegen
- その他utils（winston（logger）/lodash-es/zod/...etc）
- Linter/FormatterにBiome
- ER diagram自動生成（tbls + GitHub Actions）

## TODO
- [ ] test設定（Node.js Test runner / Testcontainers）
- [ ] 便利系GraphQL Scalars追加
- [ ] graphql-schema-linter追加
