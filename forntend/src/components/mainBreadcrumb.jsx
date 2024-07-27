import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainBreadcrumb() {
  let pathname = usePathname();
  if (pathname === "/") pathname = "/dashboard";
  const data = pathname.split("/").filter((item) => item !== "");
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {data.map((item, index) => {
          const itemLink = data.slice(0, index + 1).join("/");
          return (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link
                    href={`/${itemLink}`}
                    className={clsx("capitalize", {
                      "text-secondary-foreground": data.length === index + 1,
                    })}
                  >
                    {item.replace("-", " ")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {data.length - 1 !== index && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
