import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const env = process.env.NODE_ENV;

const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL!;
const DEVELOPMENT_URL =
  process.env.NEXT_PUBLIC_DEVELOPMENT_URL || "http://localhost:3000";

const getAppUrl = () => {
  if (env === "production") {
    return PRODUCTION_URL;
  } else {
    return DEVELOPMENT_URL;
  }
};

export const client = hc<AppType>(getAppUrl());
