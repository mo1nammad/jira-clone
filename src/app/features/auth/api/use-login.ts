import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<
  (typeof client.api.auth.login)["$post"]
>["json"];

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (body: RequestType) => {
      const response = await client.api.auth.login.$post({ json: body });
      return await response.json();
    },
  });

  return mutation;
};
