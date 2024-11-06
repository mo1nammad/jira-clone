import { Hono } from "hono";
import { handle } from "hono/vercel";

// import routes
import { auth } from "@/app/features/auth/server/route";
import workspaces from "@/app/features/workspaces/server/route";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", auth).route("/workspaces", workspaces);

export const POST = handle(routes);
export const GET = handle(routes);
export type AppType = typeof routes;
