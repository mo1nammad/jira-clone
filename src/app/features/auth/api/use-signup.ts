import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { AuthClientError } from "../utils";

type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;
type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;

export const useSignup = () => {
  const mutation = useMutation<ResponseType, AuthClientError, RequestType>({
    mutationKey: ["signup-user"],
    mutationFn: async ({ json }: RequestType) => {
      const response = await client.api.auth.register.$post({ json });

      // if there is error
      if (!response.ok) {
        const error = await response.json();

        throw new AuthClientError(error.message, {
          code: error.code,
        });
      }
      return await response.json();
    },
  });

  return mutation;
};
