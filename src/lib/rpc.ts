import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const env = process.env.NODE_ENV;
// for no reason hc doesnt work with env variables so we have to write paths hear

const PRODUCTION_URL = undefined;
const DEVELOPMENT_URL =
  process.env.APP_DEVELOPMENT_URL || "http://localhost:3000";

console.log(process.env.APP_DEVELOPMENT_URL);
console.log(DEVELOPMENT_URL);

const getAppUrl = () => {
  ("use server");
  if (env === "production") {
    return process.env.APP_PRODUCTION_URL!;
  } else {
    return DEVELOPMENT_URL;
  }
};

export const client = hc<AppType>(getAppUrl());
