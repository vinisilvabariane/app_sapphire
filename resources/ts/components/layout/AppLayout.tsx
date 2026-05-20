import { Navbar } from "@/components/layout/Navbar";

type AppLayoutProps = {
    children: React.ReactNode;
    user?: { name?: string; email?: string };
};

export function AppLayout({ children, user }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar user={user} />
            <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-6">{children}</main>
        </div>
    );
}
