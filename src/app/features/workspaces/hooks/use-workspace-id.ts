import { useParams } from "next/navigation";

export default function useWorkspaceId() {
  const { workspaceId } = useParams();

  return workspaceId as string | undefined;
}
