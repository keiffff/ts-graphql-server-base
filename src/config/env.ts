import { z } from "zod"

type Env = Readonly<{
  nodeEnv: "development" | "production" | "test"
  appEnv: "local" | "dev" | "stg" | "prd"
  server: {
    port: number
  }
  db: {
    appDatabaseUrl: string
  }
}>

const getEnv = (): Env => {
  const nodeEnv = z
    .enum(["development", "production", "test"])
    .parse(process.env.NODE_ENV)

  const appEnv = z
    .enum(["local", "dev", "stg", "prd"])
    .parse(process.env.APP_ENV)

  const port = z
    .preprocess((value) => {
      const parsed = Number(value)
      return Number.isNaN(parsed) ? undefined : parsed
    }, z.number().min(1).max(65535))
    .parse(process.env.PORT || 8080)

  const appDatabaseUrl = z.string().parse(process.env.APP_DATABASE_URL)

  return {
    nodeEnv,
    appEnv,
    server: {
      port,
    },
    db: {
      appDatabaseUrl,
    },
  }
}

export const env = getEnv()
