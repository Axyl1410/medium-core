import "dotenv/config";

// Skip if explicitly disabled
if (process.env.SKIP_DB_GENERATE === "true") {
  console.log("⏭️  Skipping drizzle-kit generate: SKIP_DB_GENERATE=true");
  process.exit(0);
}

// Skip if DATABASE_URL is not set
if (!process.env.DATABASE_URL) {
  console.log("⏭️  Skipping drizzle-kit generate: DATABASE_URL not set");
  process.exit(0);
}

try {
  const { execSync } = await import("node:child_process");
  execSync("drizzle-kit generate", { stdio: "inherit" });
} catch (error) {
  console.error("❌ Error running drizzle-kit generate:", error);
  process.exit(1);
}
