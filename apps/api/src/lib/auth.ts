import { account, db, session, user, verification } from "@workspace/database";
import { assertValue } from "@workspace/utils";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
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
  crossSubDomainCookies: {
    enabled: true,
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
  experimental: { joins: true },
  plugins: [openAPI()],
});
