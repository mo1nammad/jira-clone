import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "destructive" }))}
      >
        Dashboard
      </Link>
    </div>
  );
}
