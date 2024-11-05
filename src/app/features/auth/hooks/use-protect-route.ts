import { useEffect } from "react";
import { useCurrent } from "../api/use-current";

export function useProtectRoute() {
  const { query, redirectToAuth } = useCurrent();
  const { data: userData, isLoading } = query;
  useEffect(() => {
    if (!userData && !isLoading) redirectToAuth();
  }, [redirectToAuth, userData, isLoading]);
}

export function useProtectSession() {
  const { query, redirectToDashboard } = useCurrent();
  const { data: userData, isLoading } = query;
  useEffect(() => {
    if (userData && !isLoading) redirectToDashboard();
  }, [redirectToDashboard, userData, isLoading]);
}
