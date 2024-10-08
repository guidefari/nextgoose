import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { Resource } from "sst"
import { z } from "zod"

const connectionStringSchema = z
  .string()
  .url()
  .refine(url => url.startsWith("postgres://"), {
    message: "URL must start with postgres://",
  })

const connectionString = Resource.SquealDBUrl.value

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set")
}

try {
  connectionStringSchema.parse(connectionString)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Invalid DATABASE_URL:", error.errors)
  }
  throw new Error("Invalid DATABASE_URL format")
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client)
