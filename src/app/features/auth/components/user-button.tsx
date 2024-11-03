"use client";

import { Loader } from "lucide-react";

import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeperator } from "@/components/dotted-seperator";
import React from "react";

export const UserButton = () => {
  const { query, redirectToAuth, redirectToDashboard } = useCurrent();
  const { data: userData, isLoading } = query;

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!userData) return null;

  const { name, email } = userData.user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  return (
    <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
      <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
        {avatarFallback}
      </AvatarFallback>
    </Avatar>
  );
};
