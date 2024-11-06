import { cn } from "@/lib/utils";
import { Settings, UsersIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

const routes = [
  {
    label: "Home",
    href: "/dashboard",
    icon: GoHome,
    active: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/dashboard/tasks",
    icon: GoCheckCircle,
    active: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    active: Settings,
  },
  {
    label: "Members",
    href: "/dashboard/members",
    icon: UsersIcon,
    active: UsersIcon,
  },
];

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.active : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 font-medium rounded-md hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              <span>{item.label}</span>
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
