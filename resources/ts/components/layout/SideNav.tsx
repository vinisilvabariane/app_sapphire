import { Link } from "@inertiajs/react";
import {
    BarChart3,
    LayoutGrid,
    Kanban,
    FileText,
} from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { cn } from "@/lib/utils";

type NavItem = {
    disabled?: boolean;
    id: string;
    label: string;
    href: string;
    icon: React.ElementType;
    activeBar: string;
    activeTone: string;
    activeText: string;
    iconTone: string;
    tag?: string;
};

const navItems: NavItem[] = [
    {
        id: "home",
        label: "Hub",
        href: "/home",
        icon: LayoutGrid,
        activeBar: "bg-sky-500",
        activeTone: "border-sky-500/30 bg-sky-500/10 shadow-sky-500/10",
        activeText: "text-sky-700 dark:text-sky-300",
        iconTone: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
        tag: "Base",
    },
    {
        id: "workspaces",
        label: "Workspaces",
        href: "/workspaces",
        icon: Kanban,
        activeBar: "bg-emerald-500",
        activeTone: "border-emerald-500/30 bg-emerald-500/10 shadow-emerald-500/10",
        activeText: "text-emerald-700 dark:text-emerald-300",
        iconTone: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
        tag: "Jira",
    },
    {
        id: "analytics",
        label: "Analytics",
        href: "#",
        icon: BarChart3,
        activeBar: "bg-amber-500",
        activeTone: "border-amber-500/30 bg-amber-500/10 shadow-amber-500/10",
        activeText: "text-amber-700 dark:text-amber-300",
        iconTone: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
        disabled: true,
        tag: "Em breve",
    },
    {
        id: "docs",
        label: "Documentos",
        href: "/documentos",
        icon: FileText,
        activeBar: "bg-violet-500",
        activeTone: "border-violet-500/30 bg-violet-500/10 shadow-violet-500/10",
        activeText: "text-violet-700 dark:text-violet-300",
        iconTone: "bg-violet-500/12 text-violet-700 dark:text-violet-300",
        tag: "Docs",
    },
];

type SideNavProps = {
    currentPath?: string;
};

export function SideNav({ currentPath }: SideNavProps) {
    return (
        <aside className="flex h-screen w-[4.25rem] shrink-0 flex-col overflow-visible border-r border-sidebar-border bg-sidebar">
            <div className="flex h-16 shrink-0 items-center justify-center border-b border-sidebar-border px-2">
                <Link href="/home" className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-sidebar-accent" title="Sapphire">
                    <LogoMark className="h-7 w-7" />
                </Link>
            </div>

            <nav className="flex-1 space-y-2 overflow-visible px-2 py-4">
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
                                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                                    item.iconTone,
                                )}
                            >
                                <Icon className="h-[18px] w-[18px] stroke-[2.15]" />
                            </span>
                            <span className="pointer-events-none absolute left-[calc(100%+0.625rem)] top-1/2 z-50 -translate-y-1/2 rounded-lg border bg-popover px-2.5 py-1.5 text-xs font-bold text-popover-foreground opacity-0 shadow-md transition-all duration-150 group-hover:translate-x-1 group-hover:opacity-100">
                                {item.label}
                            </span>
                        </>
                    );

                    if (item.disabled) {
                        return (
                            <button
                                key={item.id}
                                type="button"
                                title={`${item.label} em breve`}
                                disabled
                                className="group relative flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-transparent px-1 py-1.5 text-sm font-bold opacity-45"
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            title={item.label}
                            className={cn(
                                "group relative flex items-center justify-center rounded-lg border px-1 py-1.5 text-sm font-bold whitespace-nowrap",
                                "text-sidebar-foreground/60 transition-all duration-200 hover:text-sidebar-foreground hover:shadow-sm",
                                active
                                    ? cn(item.activeTone, item.activeText, "shadow-sm")
                                    : "border-transparent hover:border-sidebar-border hover:bg-sidebar-accent/55",
                            )}
                        >
                            {active && (
                                <span className={cn("absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-lg", item.activeBar)} />
                            )}
                            {content}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
