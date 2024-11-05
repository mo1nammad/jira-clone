"use client";
import React from "react";
import { LogOut } from "lucide-react";

import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { DottedSeperator } from "@/components/dotted-seperator";

import { DottedSeperator } from "@/components/dotted-seperator";
import Loader from "@/components/loader";
import { useProtectRoute } from "../hooks/use-protect-route";

export const UserButton = () => {
  useProtectRoute();

  const { query } = useCurrent();
  const { mutate: logoutFn } = useLogout();
  const { data: userData, isLoading } = query;

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border-neutral-300">
        <Loader />
      </div>
    );
  }

  if (!userData) return null;

  const { name, email } = userData.user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 py-4 px-2.5">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center items-center mb-4">
          <p className="text-sm font-medium text-neutral-900">
            {name || "User"}
          </p>
          <p className="text-xs text-neutral-500">{email}</p>
        </div>
        <DottedSeperator classname="mb-1" />
        <DropdownMenuItem
          onClick={() => logoutFn()}
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
        >
          <LogOut className="size-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
