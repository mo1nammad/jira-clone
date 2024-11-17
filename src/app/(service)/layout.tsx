import React from "react";
import { redirect } from "next/navigation";

import { getCurrent } from "@/app/features/auth/actions";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen">
      <div className="size-full flex">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>

        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
