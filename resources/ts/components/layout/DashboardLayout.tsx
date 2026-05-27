import { usePage } from "@inertiajs/react";
import type { AppNotification } from "@/lib/notifications";
import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";

type DashboardLayoutProps = {
    children: React.ReactNode;
    notifications?: AppNotification[];
    user?: {
        email?: string;
        last_login_at?: string | null;
        name?: string;
        onboarded_at?: string | null;
        show_tutorial?: boolean;
    };
    title?: string;
};

export function DashboardLayout({ children, notifications = [], user, title }: DashboardLayoutProps) {
    const { url } = usePage();

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <SideNav currentPath={url} />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <TopBar notifications={notifications} user={user} title={title} />
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    );
}
