import { createGraphiQLFetcher } from "@graphiql/toolkit"
import { GraphiQL } from "graphiql"
import { buildClientSchema } from "graphql"
import { createRoot } from "react-dom/client"
import introspection from "./introspection.json?raw"

const fetcher = createGraphiQLFetcher({ url: "/graphql" })
const schema = buildClientSchema(JSON.parse(introspection))

const root = createRoot(document.getElementById("root"))
root.render(<GraphiQL schema={schema} fetcher={fetcher} />)
