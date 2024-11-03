import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) return null;

      return await response.json();
    },
  });
  const router = useRouter();

  const redirectToDashboard = () => router.push("/dashboard");
  const redirectToAuth = () => router.push("/sign-in");
  return {
    redirectToAuth,
    redirectToDashboard,
    query,
  };
};
