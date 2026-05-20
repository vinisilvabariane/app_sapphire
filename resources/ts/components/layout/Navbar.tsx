import { router, Link } from "@inertiajs/react";
import { Gem, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type NavbarProps = {
    user?: { name?: string; email?: string };
};

export function Navbar({ user }: NavbarProps) {
    const handleLogout = () => router.post("/logout");
    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "U";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 sm:px-6">
                <Link href="/home" className="flex items-center gap-2 mr-6">
                    <Gem className="h-5 w-5 text-primary" />
                    <span className="font-bold text-sm tracking-wide">Sapphire</span>
                </Link>

                <nav className="hidden md:flex items-center gap-1 flex-1">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/home">Dashboard</Link>
                    </Button>
                </nav>

                <div className="flex items-center gap-2 ml-auto">
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {user?.name ?? "Usuário"}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email ?? ""}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                Perfil
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={handleLogout}
                                className="cursor-pointer"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
