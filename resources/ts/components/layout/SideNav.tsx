import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    BarChart3,
    LayoutGrid,
    Kanban,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { cn } from "@/lib/utils";

type NavItem = {
    disabled?: boolean;
    id: string;
    label: string;
    href: string;
    icon: React.ElementType;
    tag?: string;
};

const navItems: NavItem[] = [
    { id: "home", label: "Hub", href: "/home", icon: LayoutGrid, tag: "Base" },
    { id: "workspaces", label: "Workspaces", href: "/workspaces", icon: Kanban, tag: "Jira" },
    { id: "analytics", label: "Analytics", href: "#", icon: BarChart3, disabled: true, tag: "Em breve" },
    { id: "docs", label: "Documentos", href: "#", icon: FileText, disabled: true, tag: "Em breve" },
    { id: "settings", label: "Configurações", href: "/settings", icon: Settings, tag: "Conta" },
];

type SideNavProps = {
    currentPath?: string;
};

export function SideNav({ currentPath }: SideNavProps) {
    const [collapsed, setCollapsed] = useState(() => localStorage.getItem("sidenav-collapsed") === "true");

    const toggle = () =>
        setCollapsed((prev) => {
            localStorage.setItem("sidenav-collapsed", String(!prev));
            return !prev;
        });

    return (
        <aside
            className={cn(
                "flex h-screen shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-in-out",
                collapsed ? "w-[4.25rem]" : "w-72",
            )}
        >
            <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-3">
                <Link href="/home" className="flex items-center gap-2 min-w-0 flex-1">
                    <LogoMark className="h-7 w-7" />
                    {!collapsed && (
                        <span className="min-w-0">
                            <span className="block truncate text-sm font-black tracking-tight text-sidebar-foreground">
                                Sapphire
                            </span>
                            <span className="block truncate text-[11px] font-medium text-sidebar-foreground/45">
                                Operating hub
                            </span>
                        </span>
                    )}
                </Link>
                <button
                    onClick={toggle}
                    title={collapsed ? "Expandir menu" : "Recolher menu"}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                >
                    {collapsed ? (
                        <ChevronRight className="h-3.5 w-3.5" />
                    ) : (
                        <ChevronLeft className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-2 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active =
                        currentPath === item.href ||
                        (item.href !== "/home" &&
                            currentPath?.startsWith(item.href + "/"));
                    const content = (
                        <>
                            <span
                                className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors",
                                    active ? "bg-primary text-primary-foreground" : "bg-sidebar-accent/50",
                                )}
                            >
                                <Icon className="h-4 w-4" />
                            </span>
                            {!collapsed && (
                                <>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate">{item.label}</span>
                                    </span>
                                    {item.tag && (
                                        <span
                                            className={cn(
                                                "rounded-full px-2 py-0.5 text-[10px] font-black",
                                                active
                                                    ? "bg-primary/10 text-primary"
                                                    : "bg-sidebar-accent text-sidebar-foreground/45",
                                            )}
                                        >
                                            {item.tag}
                                        </span>
                                    )}
                                </>
                            )}
                        </>
                    );

                    if (item.disabled) {
                        return (
                            <button
                                key={item.id}
                                type="button"
                                title={collapsed ? `${item.label} em breve` : undefined}
                                disabled
                                className={cn(
                                    "flex w-full cursor-not-allowed items-center gap-3 rounded-2xl px-2 py-2 text-sm font-bold opacity-45",
                                    collapsed && "justify-center",
                                )}
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            className={cn(
                                "relative flex items-center gap-3 rounded-2xl px-2 py-2 text-sm font-bold transition-colors whitespace-nowrap",
                                "text-sidebar-foreground/65 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                                active &&
                                    "bg-sidebar-accent text-sidebar-foreground shadow-sm",
                                collapsed && "justify-center",
                            )}
                        >
                            {active && !collapsed && (
                                <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                            )}
                            {content}
                        </Link>
                    );
                })}
            </nav>

            <div className="shrink-0 border-t border-sidebar-border p-3">
                <div className={cn("rounded-2xl bg-sidebar-accent/60 p-3", collapsed && "px-2")}>
                    <div className="mx-auto h-2 w-2 rounded-full bg-emerald-500" />
                    {!collapsed && (
                        <div className="mt-2 text-center">
                            <p className="text-xs font-black text-sidebar-foreground">Sistema online</p>
                            <p className="text-[11px] text-sidebar-foreground/45">JWT, tema e workspace ativos</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
