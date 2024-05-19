# ts-graphql-server-base

## Features

- Native ESM
- GraphQL ServerフレームワークにApollo Server（fastify integration）
- GraphQL実装（schema定義、resolver実装）のモジュール化
- DBマイグレーションツールにsqldef
- 型安全なクエリビルダーとしてkysely + DBスキーマからの型定義自動生成にkysely-codegen
- その他utils（winston（logger）/lodash-es/zod/...etc）
- Linter/FormatterにBiome

## TODO
- [ ] unit test設定（vitest/Testcontainers）・サンプルテスト実装
- [ ] Github Actions設定
- [ ] 便利系GraphQL Scalars追加
