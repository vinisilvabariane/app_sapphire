import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import {
    Gem,
    LayoutGrid,
    Kanban,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
    id: string;
    label: string;
    href: string;
    icon: React.ElementType;
};

const navItems: NavItem[] = [
    { id: "home", label: "Hub", href: "/home", icon: LayoutGrid },
    { id: "workspaces", label: "Workspaces", href: "/workspaces", icon: Kanban },
];

type SideNavProps = {
    currentPath?: string;
};

export function SideNav({ currentPath }: SideNavProps) {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("sidenav-collapsed");
        if (saved === "true") setCollapsed(true);
    }, []);

    const toggle = () =>
        setCollapsed((prev) => {
            localStorage.setItem("sidenav-collapsed", String(!prev));
            return !prev;
        });

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-[width] duration-200 ease-in-out shrink-0 overflow-hidden",
                collapsed ? "w-16" : "w-60",
            )}
        >
            {/* Logo */}
            <div className="flex items-center h-14 px-3 border-b border-sidebar-border shrink-0">
                <Link href="/home" className="flex items-center gap-2 min-w-0 flex-1">
                    <Gem className="h-5 w-5 text-sidebar-primary shrink-0" />
                    {!collapsed && (
                        <span className="font-bold text-sm tracking-wide text-sidebar-foreground truncate">
                            Sapphire
                        </span>
                    )}
                </Link>
                <button
                    onClick={toggle}
                    title={collapsed ? "Expandir menu" : "Recolher menu"}
                    className="flex h-6 w-6 items-center justify-center rounded text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors shrink-0"
                >
                    {collapsed ? (
                        <ChevronRight className="h-3.5 w-3.5" />
                    ) : (
                        <ChevronLeft className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active =
                        currentPath === item.href ||
                        (item.href !== "/home" &&
                            currentPath?.startsWith(item.href + "/"));
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            className={cn(
                                "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                                "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                                active &&
                                    "bg-sidebar-accent text-sidebar-foreground font-semibold",
                                collapsed && "justify-center",
                            )}
                        >
                            <Icon className="h-4 w-4 shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom — Settings */}
            <div className="py-3 px-2 border-t border-sidebar-border shrink-0">
                <Link
                    href="/settings"
                    title={collapsed ? "Configurações" : undefined}
                    className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                        "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                        collapsed && "justify-center",
                    )}
                >
                    <Settings className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Configurações</span>}
                </Link>
            </div>
        </aside>
    );
}
