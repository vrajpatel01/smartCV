import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function DesktopNavigationItem({ title, icon, paramName }) {
  let pathname = usePathname();
  let data = new RegExp(`^${paramName}$|^${paramName}/.*$`, "i");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={paramName}
          className={clsx(
            "text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
            { "!bg-accent !text-accent-foreground": pathname.match(data) }
          )}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
}

export function MobileNavigationItem({ title, icon, paramName }) {
  let pathname = usePathname();
  const data = new RegExp(`^${paramName}$`, "i");
  return (
    <Link
      href={paramName}
      className={`${
        pathname.match(data) && "!text-foreground"
      } flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
    >
      {icon}
      {title}
    </Link>
  );
}
