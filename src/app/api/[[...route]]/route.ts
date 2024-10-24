import { Hono } from "hono";
import { handle } from "hono/vercel";

// import routes
import AuthRoute from "@/app/features/auth/server/route";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", AuthRoute);

export const GET = handle(app);
export type AppType = typeof routes;
