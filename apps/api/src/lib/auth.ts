import { db } from "@workspace/database";
import {
  account,
  session,
  user,
  verification,
} from "@workspace/database/db/schema";
import { assertValue } from "@workspace/utils";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

// Get baseURL from environment or infer from Vercel
const getBaseURL = () => {
  // Check for explicit BETTER_AUTH_URL first
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }

  // On Vercel, use VERCEL_URL for preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For production, use VERCEL_PROJECT_PRODUCTION_URL if available
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Fallback for local development
  return process.env.BASE_URL || "http://localhost:8080";
};

export const auth = betterAuth({
  baseURL: getBaseURL(),
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: assertValue(
        process.env.GITHUB_CLIENT_ID,
        "Missing GITHUB_CLIENT_ID"
      ),
      clientSecret: assertValue(
        process.env.GITHUB_CLIENT_SECRET,
        "Missing GITHUB_CLIENT_SECRET"
      ),
    },
    discord: {
      clientId: assertValue(
        process.env.DISCORD_CLIENT_ID,
        "Missing DISCORD_CLIENT_ID"
      ),
      clientSecret: assertValue(
        process.env.DISCORD_CLIENT_SECRET,
        "Missing DISCORD_CLIENT_SECRET"
      ),
    },
    google: {
      clientId: assertValue(
        process.env.GOOGLE_CLIENT_ID,
        "Missing GOOGLE_CLIENT_ID"
      ),
      clientSecret: assertValue(
        process.env.GOOGLE_CLIENT_SECRET,
        "Missing GOOGLE_CLIENT_SECRET"
      ),
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "discord"],
    },
  },
  rateLimit: {
    enabled: true,
  },
  // Disable crossSubDomainCookies on Vercel to avoid cookie issues
  // Vercel preview deployments use different subdomains which can cause cookie problems
  crossSubDomainCookies: {
    enabled: false,
  },
  experimental: { joins: true },
  plugins: [openAPI()],
});
