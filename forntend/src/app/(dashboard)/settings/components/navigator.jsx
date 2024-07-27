"use client";
import clsx from "clsx";
import { ShieldCheck, User2, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsNavigatorItem({ icon, title, pathName }) {
  let pathname = usePathname();
  const isActive = pathname === `/settings/${pathName}`;
  return (
    <Link
      href={`/settings/${pathName}`}
      className={clsx(
        "text-muted-foreground transition-colors hover:text-foreground z-10",
        { "!text-foreground": isActive }
      )}
    >
      <span className="block whitespace-nowrap">{title}</span>
    </Link>
  );
}

export function SettingsNavigator() {
  return (
    <>
      <SettingsNavigatorItem
        icon={<User2 className="w-5 h-5" />}
        title="General"
        pathName="general"
      />
      <SettingsNavigatorItem
        icon={<UsersRound className="w-5 h-5" />}
        title="User Administration"
        pathName="user-administration"
      />
    </>
  );
}
