"use client";

import { CreateWorkspaceForm } from "@/app/features/workspaces/components/create-workspace-form";

export default function DashboardPage() {
  return (
    <div>
      this is dahsboard default page
      <div>
        <CreateWorkspaceForm onCancel={() => {}} />
      </div>
    </div>
  );
}
