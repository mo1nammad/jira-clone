"use client";

import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspaces";

import Loader from "./loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceAvatar } from "@/app/features/workspaces/components/workspace-avatar";
import useWorkspaceId from "@/app/features/workspaces/hooks/use-workspace-id";

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { data: workspaces, isLoading, error } = useGetWorkspace();

  if (isLoading) return <Loader />;

  if (error || !workspaces || workspaces.total === 0)
    return (
      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-700">No Workspace exists</p>
        <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
    );
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select
        onValueChange={(val) => router.push(`/workspaces/${val}`)}
        defaultValue={workspaceId}
      >
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1 focus:ring-transparent h-14">
          <SelectValue placeholder="Select a workspace" />
          <SelectContent>
            {workspaces?.documents.map((workspace) => (
              <SelectItem
                value={workspace.$id}
                key={workspace.$id}
                onMouseEnter={() =>
                  router.prefetch(`/workspaces/${workspace.$id}`)
                }
              >
                <div className="flex justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};
