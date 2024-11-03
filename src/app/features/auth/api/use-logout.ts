import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: async () => {
      await client.api.auth.logout.$post();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current"],
      });
    },
  });

  return mutation;
};
