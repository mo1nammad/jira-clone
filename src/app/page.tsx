"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrent } from "./features/auth/api/use-current";
import { useLogout } from "./features/auth/api/use-logout";
import { UserButton } from "./features/auth/components/user-button";

export default function Home() {
  const { query, redirectToAuth } = useCurrent();
  const { data: userData, isLoading } = query;

  const { mutate: logoutUser } = useLogout();

  const handleLogout = () => logoutUser(undefined);

  useEffect(() => {
    if (!userData && !isLoading) redirectToAuth();
  }, [isLoading, userData]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
