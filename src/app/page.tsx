import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
   return (
      <div className="flex items-center gap-x-4 pt-4">
         <Button>hello</Button>
         <Button variant={"destructive"}>destructive</Button>
         <Button variant={"ghost"}>ghost</Button>
         <Button variant={"secondary"}>secondary</Button>
         <Button variant={"muted"}>muted</Button>
         <Button variant={"teritary"}>teritary</Button>
         <Input />
      </div>
   );
}
