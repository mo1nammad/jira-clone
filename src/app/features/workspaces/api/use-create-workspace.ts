import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["workspaces"],
    mutationFn: async (req: RequestType) => {
      const response = await client.api.workspaces.$post(req);
      if (!response.ok) throw new Error("something went wrong");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspace created");
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
    onError: () => toast.error("Failed to create workspace "),
  });

  return mutation;
};
