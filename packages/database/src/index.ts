import { assertValue } from "@workspace/utils";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

const databaseUrl = assertValue(
  process.env.DATABASE_URL,
  "DATABASE_URL is not set"
);

//todo: change to postgres later
export const db = drizzle(databaseUrl);

export * from "drizzle-orm";
