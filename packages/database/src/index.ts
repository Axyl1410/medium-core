import { assertValue } from "@workspace/utils";
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// biome-ignore lint/performance/noNamespaceImport: Cần namespace import để pass schema object vào drizzle
import * as schema from "./db/schema"; // Import schema vào đây để pass cho drizzle

const databaseUrl = assertValue(
  process.env.DATABASE_URL,
  "DATABASE_URL is not set"
);

const sql = neon(databaseUrl);

// Pass schema vào hàm drizzle để có autocomplete tốt hơn
export const db = drizzle(sql, { schema });

// TUYỆT ĐỐI KHÔNG DÙNG:
// export * from "drizzle-orm";
// export * from "./db/schema";
