import { assertValue } from "@workspace/utils";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = assertValue(
  process.env.DATABASE_URL,
  "DATABASE_URL is not set"
);

export const db = drizzle(databaseUrl);

export * from "drizzle-orm";
