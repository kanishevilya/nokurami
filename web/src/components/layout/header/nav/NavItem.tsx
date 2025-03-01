import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/components/layout/sidebar/types/Route";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

interface NavItemProps {
  route: Route;
}

export function NavItem({ route }: NavItemProps) {
  const pathname = usePathname();

  const isActive = pathname === route.href;

  return (
    <Link
      href={route.href}
      className={cn(
        "flex flex-col items-center gap-x-2 text-sm font-medium transition hover:opacity-75",
        isActive && "text-primary"
      )}
    >
      <div className="flex items-center gap-x-2">
        <route.icon className="h-5 w-5" />
        <span>{route.label}</span>
      </div>
      {isActive && (
        <div className="border-b-2 mt-1 -mb-2 border-primary w-full" />
      )}
    </Link>
  );
}
