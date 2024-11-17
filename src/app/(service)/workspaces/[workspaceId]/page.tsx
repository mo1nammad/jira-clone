import { redirect } from "next/navigation";
import { getCurrent } from "@/app/features/auth/actions";

type WorkspaceIdPageProps = {
  params: { workspaceId: string };
};

export default async function WorkspaceIdPage({
  params: { workspaceId },
}: WorkspaceIdPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <div>{workspaceId}</div>;
}
