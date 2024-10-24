import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const env = process.env.NODE_ENV;

const getAppUrl = () => {
  if (env === "production") {
    return process.env.APP_PRODUCTION_URL!;
  } else return process.env.APP_DEVELOPEMENT_URL!;
};

export const client = hc<AppType>(getAppUrl() + "/");
