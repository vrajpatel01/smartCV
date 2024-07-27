import { DesktopNavigationItem, MobileNavigationItem } from "./navigationItem";
import { Home, Settings, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { LuTextQuote, LuLayoutTemplate } from "react-icons/lu";
import { TbInvoice } from "react-icons/tb";

export function DesktopNavigator() {
  return (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <DesktopNavigationItem
        icon={<TbInvoice className="h-5 w-5" />}
        paramName="/resume"
        title="Resume"
      />
      {/* <DesktopNavigationItem
        icon={<User2 className="h-5 w-5" />}
        paramName="/basics"
        title="Resume Create"
      /> */}
      {/* <DesktopNavigationItem
        icon={<Home className="h-5 w-5" />}
        paramName="/"
        title="Dashboard"
      /> */}

      {/* <DesktopNavigationItem
        icon={<LuLayoutTemplate className="h-5 w-5" />}
        paramName="/templates"
        title="Templates"
      /> */}
      <DesktopNavigationItem
        icon={<LuTextQuote className="h-5 w-5" />}
        paramName="/phrases"
        title="Phases"
      />
    </nav>
  );
}

export function MobileNavigator() {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <MobileNavigationItem
        icon={<Home className="h-5 w-5" />}
        paramName="/"
        title="Dashboard"
      />
      <MobileNavigationItem
        icon={<User2 className="h-5 w-5" />}
        paramName="/users"
        title="Users"
      />
      <MobileNavigationItem
        icon={<LuLayoutTemplate className="h-5 w-5" />}
        paramName="/templates"
        title="Templates"
      />
      <MobileNavigationItem
        icon={<LuTextQuote className="h-5 w-5" />}
        paramName="/phrases"
        title="Phases"
      />
      <MobileNavigationItem
        icon={<TbInvoice className="h-5 w-5" />}
        paramName="/invoices"
        title="Invoices"
      />
      <MobileNavigationItem
        icon={<Settings className="h-5 w-5" />}
        paramName="/settings"
        title="Settings"
      />
    </nav>
  );
}
