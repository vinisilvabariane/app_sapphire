import { usePage } from "@inertiajs/react";
import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";

type DashboardLayoutProps = {
    children: React.ReactNode;
    user?: {
        email?: string;
        last_login_at?: string | null;
        name?: string;
        onboarded_at?: string | null;
    };
    title?: string;
};

export function DashboardLayout({ children, user, title }: DashboardLayoutProps) {
    const { url } = usePage();

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <SideNav currentPath={url} />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <TopBar user={user} title={title} />
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    );
}
