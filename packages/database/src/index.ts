import { neon } from "@neondatabase/serverless";
import { assertValue } from "@workspace/utils";
import { drizzle } from "drizzle-orm/neon-http";
// biome-ignore lint/performance/noNamespaceImport: Cần namespace import để pass schema object vào drizzle
import * as schema from "./db/schema"; // Import schema vào đây để pass cho drizzle

// Note: dotenv is not loaded here to avoid issues on Vercel
// For local development, ensure dotenv is loaded in your application entry point
// Vercel automatically provides environment variables via process.env

const databaseUrl = assertValue(
  process.env.DATABASE_URL,
  "DATABASE_URL environment variable is not set. Set it in your Vercel project settings or local .env file."
);

const sql = neon(databaseUrl);

// Pass schema vào hàm drizzle để có autocomplete tốt hơn
export const db = drizzle(sql, { schema });

// --- QUAN TRỌNG: Export schema để tránh race condition khi load module ---
// Xuất khẩu toàn bộ schema ra ngoài thông qua index
// biome-ignore lint/performance/noBarrelFile: Cần thiết để tránh lỗi "Requested module is not instantiated yet"
export * from "./db/schema";
