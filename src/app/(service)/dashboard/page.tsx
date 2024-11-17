import { redirect } from "next/navigation";
import { getCurrent } from "@/app/features/auth/actions";
import { getWorkspaces } from "@/app/features/workspaces/actions";

export default async function DashboardPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const data = await getWorkspaces();

  if (!data || data.workspaces.total === 0) redirect("/workspaces/create");
  else redirect(`/workspaces/${data.workspaces.documents[0].$id}`);
}
