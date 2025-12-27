import "dotenv/config";
import { assertValue } from "@workspace/utils";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: assertValue(
      process.env.DATABASE_URL,
      "DATABASE_URL environment variable is required"
    ),
  },
});
