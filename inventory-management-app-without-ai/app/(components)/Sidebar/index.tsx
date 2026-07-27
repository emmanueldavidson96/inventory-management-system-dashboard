"use client";

import Link from "next/link";
import {
  Menu,
  LayoutDashboard,
  Package,
  Boxes,
  Users,
  ShoppingCart,
  Truck,
  Settings,
  LogOut,
  ChevronLeft,
  LucideIcon,
  Archive,
  Clipboard,
  SlidersHorizontal,
  CircleDollarSign,
} from "lucide-react";

import { setMode, setSidebarCollapse } from "@/features/mode/modeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { RootState } from "@/store";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center 
          ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"} 
          hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors 
          ${isActive ? "bg-blue-200 text-white" : ""}`}
      >
        <Icon className={`w-6 h-6 !text-gray-700`} />
        <span
          className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const dispatch = useAppDispatch();

  const sideBarCollapse = useAppSelector(
    (state: RootState) => state.mode.sideBarCollapse,
  );

  const toggleSidebar = () => {
    dispatch(setSidebarCollapse(!sideBarCollapse));
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out shadow-sm
        ${sideBarCollapse ? "w-20" : "w-72"}
      `}
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`overflow-hidden whitespace-nowrap transition-all duration-300
              ${sideBarCollapse ? "w-0 opacity-0" : "w-auto opacity-100"}
            `}
          >
            <h1 className="font-bold text-xl">OsemStocks</h1>
            <p className="text-xs text-muted-foreground">
              Inventory Management
            </p>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 transition-colors hover:bg-muted"
        >
          {sideBarCollapse ? (
            <Menu className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* ================= NAVIGATION ================= */}

      {/* <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="
                group
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                transition-colors
                hover:bg-muted
              "
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span
                className={`
                  whitespace-nowrap
                  transition-all
                  duration-300
                  ${sideBarCollapse ? "hidden" : "block"}
                `}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav> */}

      <div className="flex-grow mt-8">
        <SidebarLink
          href={`/dashboard`}
          icon={LayoutDashboard}
          label={`Dashboard`}
          isCollapsed={sideBarCollapse}
        />
        <SidebarLink
          href={`/inventory`}
          icon={Archive}
          label={`Inventory`}
          isCollapsed={sideBarCollapse}
        />
        <SidebarLink
          href={`/products`}
          icon={Clipboard}
          label={`Products`}
          isCollapsed={sideBarCollapse}
        />
        <SidebarLink
          href={`/users`}
          icon={Users}
          label={`Dashboard`}
          isCollapsed={sideBarCollapse}
        />
        <SidebarLink
          href={`/settings`}
          icon={SlidersHorizontal}
          label={`Dashboard`}
          isCollapsed={sideBarCollapse}
        />
        <SidebarLink
          href={`/expenses`}
          icon={CircleDollarSign}
          label={`Expenses`}
          isCollapsed={sideBarCollapse}
        />
      </div>

      {/* ================= USER ================= */}

      <div className="border-t border-border p-4">
        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            p-2
            hover:bg-muted
            transition-colors
          "
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            EO
          </div>

          {!sideBarCollapse && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-medium">Emmanuel</p>

              <p className="truncate text-sm text-muted-foreground">
                Administrator
              </p>
            </div>
          )}

          {!sideBarCollapse && (
            <button className="rounded-lg p-2 hover:bg-background">
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>

        <p
          className={`
            mt-6
            text-center
            text-xs
            text-muted-foreground
            transition-opacity
            duration-300
            ${sideBarCollapse ? "opacity-0" : "opacity-100"}
          `}
        >
          © 2026 OsemStocks
        </p>
      </div>
    </aside>
  );
}
