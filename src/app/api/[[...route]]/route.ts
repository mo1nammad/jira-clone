import { Hono } from "hono";
import { handle } from "hono/vercel";

// import routes
import { loginAuth, signupAuth } from "@/app/features/auth/server/route";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", loginAuth).route("/auth", signupAuth);

export const POST = handle(app);
export type AppType = typeof routes;
