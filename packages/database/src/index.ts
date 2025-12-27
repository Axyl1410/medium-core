import { assertValue } from "@workspace/utils";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./db/schema";

const databaseUrl = assertValue(
  process.env.DATABASE_URL,
  "DATABASE_URL is not set"
);

export const db = drizzle(databaseUrl, { schema });

export * from "drizzle-orm";
export * from "./db/schema";
