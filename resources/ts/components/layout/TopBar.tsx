import { Link, router } from "@inertiajs/react";
import { Bell, CheckCircle2, HelpCircle, LogOut, Search, Settings, ShieldCheck, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type TopBarProps = {
    user?: {
        email?: string;
        last_login_at?: string | null;
        name?: string;
        onboarded_at?: string | null;
    };
    title?: string;
};

function formatDate(value?: string | null) {
    if (!value) {
        return "Ainda não registrado";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

export function TopBar({ user, title }: TopBarProps) {
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
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-border/40 bg-background/90 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 sm:px-6">
            <div className="min-w-0">
                {title && <span className="block text-sm font-black tracking-tight">{title}</span>}
                <span className="hidden text-xs text-muted-foreground sm:block">
                    Sessão protegida por JWT HttpOnly
                </span>
            </div>

            <div className="relative ml-auto hidden w-full max-w-md lg:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="h-9 rounded-full bg-muted/40 pl-9" placeholder="Buscar módulos, issues e configurações" />
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                </Button>
                <ThemeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 rounded-full px-1.5 pr-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-xs font-black text-primary">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <span className="hidden max-w-28 truncate text-sm font-bold md:inline">
                                {user?.name ?? "Usuário"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 rounded-2xl p-2" align="end">
                        <DropdownMenuLabel className="rounded-xl bg-muted/50 p-3 font-normal">
                            <div className="flex items-start gap-3">
                                <Avatar className="h-11 w-11">
                                    <AvatarFallback className="bg-primary text-sm font-black text-primary-foreground">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-black leading-none">{user?.name ?? "Usuário"}</p>
                                    <p className="mt-1 truncate text-xs text-muted-foreground">{user?.email ?? ""}</p>
                                    <div className="mt-3 flex items-center gap-2 rounded-full bg-background px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                        Conta ativa
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <div className="grid grid-cols-2 gap-2 px-1 py-2 text-xs">
                            <div className="rounded-xl border border-border/60 p-2">
                                <span className="block text-muted-foreground">Último login</span>
                                <strong className="mt-1 block text-[11px]">{formatDate(user?.last_login_at)}</strong>
                            </div>
                            <div className="rounded-xl border border-border/60 p-2">
                                <span className="block text-muted-foreground">Tutorial</span>
                                <strong className="mt-1 flex items-center gap-1 text-[11px]">
                                    <CheckCircle2 className="h-3 w-3 text-primary" />
                                    {user?.onboarded_at ? "Concluído" : "Pendente"}
                                </strong>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/settings" className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                Configurações
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings#profile" className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                Perfil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings#tutorial" className="cursor-pointer">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Rever tutorial
                            </Link>
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
        </header>
    );
}
