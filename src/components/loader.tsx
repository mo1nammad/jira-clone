import { cn } from "@/lib/utils";
import { LoaderIcon, LucideProps } from "lucide-react";

const Loader = ({ className, ...props }: LucideProps) => {
  return (
    <LoaderIcon
      {...props}
      className={cn("size-4 animate-spin text-muted-foreground", className)}
    />
  );
};

export default Loader;
