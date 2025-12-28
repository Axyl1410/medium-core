import { assertValue } from "@workspace/utils";
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = assertValue(
  process.env.DATABASE_URL,
  "DATABASE_URL is not set"
);

const sql = neon(databaseUrl);
export const db = drizzle({ client: sql });

export * from "drizzle-orm";
export * from "./db/schema";
