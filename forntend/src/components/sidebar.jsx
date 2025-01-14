"use client";
import { Package2, Settings } from "lucide-react";
import Link from "next/link";
import { DesktopNavigationItem } from "./navigator/navigationItem";
import { DesktopNavigator } from "./navigator/navigator";

export default function Sidebar() {
  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <div className="flex items-center flex-col py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <DesktopNavigator />
        </div>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <DesktopNavigationItem
            icon={<Settings className="h-5 w-5" />}
            paramName="/settings"
            title="Settings"
          />
        </nav>
      </aside>
    </div>
  );
}
