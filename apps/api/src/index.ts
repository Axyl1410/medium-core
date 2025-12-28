import { Hono } from "hono";
import { cors } from "hono/cors";

// import { auth } from "./lib/auth";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const app = new Hono<{
  // Variables: {
  //   user: typeof auth.$Infer.Session.user | null;
  //   session: typeof auth.$Infer.Session.session | null;
  // };
}>();

const welcomeStrings = [
  `Hello Hono from Bun ${process.versions.bun}!`,
  "To learn more about Hono + Bun on Vercel, visit https://vercel.com/docs/frameworks/backend/hono",
];

app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "*", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// app.use("*", async (c, next) => {
//   const session = await auth.api.getSession({ headers: c.req.raw.headers });

//   if (!session) {
//     c.set("user", null);
//     c.set("session", null);
//     await next();
//     return;
//   }

//   c.set("user", session.user);
//   c.set("session", session.session);
//   await next();
// });

// app.on(["POST", "GET"], "/api/auth/*", async (c) => {
//   try {
//     return await auth.handler(c.req.raw);
//   } catch (error) {
//     console.error("Auth handler error:", error);
//     return c.json(
//       {
//         error: "Internal server error",
//         message: error instanceof Error ? error.message : "Unknown error",
//       },
//       500
//     );
//   }
// });

// app.get("/session", (c) => {
//   const session = c.get("session");
//   const user = c.get("user");

//   if (!user) {
//     return c.body(null, 401);
//   }

//   return c.json({
//     session,
//     user,
//   });
// });

app.get("/", (c) => {
  return c.text(welcomeStrings.join("\n\n"));
});

export default app;
