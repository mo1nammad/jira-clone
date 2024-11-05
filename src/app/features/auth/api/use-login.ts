import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { AuthClientError } from "../utils";

type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, AuthClientError, RequestType>({
    mutationKey: ["loginUser"],
    mutationFn: async ({ json }: RequestType) => {
      const response = await client.api.auth.login.$post({ json });

      // if there is error
      if (!response.ok) {
        const error = await response.json();

        throw new AuthClientError(error.message, {
          code: error.code,
        });
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current"],
      });
    },
  });

  return mutation;
};
