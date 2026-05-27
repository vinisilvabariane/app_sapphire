import { Link, router, useForm } from "@inertiajs/react";
import { useState, type FormEvent } from "react";
import {
    Bell,
    CheckCircle2,
    HelpCircle,
    LogOut,
    MonitorCog,
    RotateCcw,
    Save,
    Search,
    Settings,
    ShieldCheck,
    User,
    X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NotificationBuilder, type AppNotification } from "@/lib/notifications";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AppUser = {
    email?: string;
    last_login_at?: string | null;
    name?: string;
    onboarded_at?: string | null;
    show_tutorial?: boolean;
};

type ProfileForm = {
    email: string;
    name: string;
};

type AccountModalTab = "profile" | "settings" | null;

type TopBarProps = {
    notifications?: AppNotification[];
    user?: AppUser;
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

function loadPreference(key: string, fallback: boolean) {
    if (typeof window === "undefined") {
        return fallback;
    }

    return window.localStorage.getItem(key) === null ? fallback : window.localStorage.getItem(key) === "true";
}

export function TopBar({ notifications = [], user, title }: TopBarProps) {
    const [accountModal, setAccountModal] = useState<AccountModalTab>(null);
    const [compactBoard, setCompactBoard] = useState(() => loadPreference("sapphire-compact-board", false));
    const [denseNavigation, setDenseNavigation] = useState(() => loadPreference("sapphire-dense-navigation", false));
    const [dailyDigest, setDailyDigest] = useState(() => loadPreference("sapphire-daily-digest", true));

    const { data, errors, post, processing, setData } = useForm<ProfileForm>({
        email: user?.email ?? "",
        name: user?.name ?? "",
    });

    const handleLogout = () => router.post("/logout");
    const unreadCount = NotificationBuilder.unreadCount(notifications);

    const initials = user?.name
        ? user.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "U";

    const savePreference = (key: string, value: boolean, setter: (value: boolean) => void) => {
        setter(value);
        window.localStorage.setItem(key, String(value));
    };

    const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post("/settings/profile", {
            preserveScroll: true,
        });
    };

    const resetTutorial = () => {
        router.post("/settings/onboarding/reset");
    };

    const preferences = [
        {
            description: "Reduz densidade visual em áreas de trabalho quando houver suporte no módulo.",
            enabled: compactBoard,
            key: "sapphire-compact-board",
            setter: setCompactBoard,
            title: "Board compacto",
        },
        {
            description: "Guarda preferência local para versões mais compactas da navegação.",
            enabled: denseNavigation,
            key: "sapphire-dense-navigation",
            setter: setDenseNavigation,
            title: "Navegação densa",
        },
        {
            description: "Preferência local para receber resumos e avisos importantes.",
            enabled: dailyDigest,
            key: "sapphire-daily-digest",
            setter: setDailyDigest,
            title: "Resumo diário",
        },
    ];

    return (
        <>
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-border/40 bg-background/90 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 sm:px-6">
                <div className="min-w-0">
                    {title && <span className="block text-sm font-black tracking-tight">{title}</span>}
                </div>

                <div className="relative ml-auto hidden w-full max-w-md lg:block">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="h-9 rounded-lg bg-muted/40 pl-9" placeholder="Buscar módulos, issues e configurações" />
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative rounded-lg" aria-label="Notificações">
                                <Bell className="h-4 w-4" />
                                {unreadCount > 0 && (
                                    <span className="absolute right-1.5 top-1.5 min-w-4 rounded-lg bg-primary px-1 text-[10px] font-bold leading-4 text-primary-foreground">
                                        {unreadCount > 9 ? "9+" : unreadCount}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 rounded-lg p-2" align="end">
                            <DropdownMenuLabel className="px-3 py-2">Notificações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {notifications.length === 0 ? (
                                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                                    Nenhuma notificação no momento.
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {notifications.map((notification) => {
                                        const content = (
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    {!notification.read && (
                                                        <span className="h-2 w-2 shrink-0 rounded-lg bg-primary" />
                                                    )}
                                                    <p className="truncate text-sm font-bold">{notification.title}</p>
                                                </div>
                                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                                    {notification.message}
                                                </p>
                                            </div>
                                        );

                                        if (notification.actionHref) {
                                            return (
                                                <DropdownMenuItem key={notification.id} asChild>
                                                    <Link href={notification.actionHref} className="cursor-pointer rounded-lg p-3">
                                                        {content}
                                                    </Link>
                                                </DropdownMenuItem>
                                            );
                                        }

                                        return (
                                            <DropdownMenuItem key={notification.id} className="cursor-default rounded-lg p-3">
                                                {content}
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </div>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ThemeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 rounded-lg px-1.5 pr-3">
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
                        <DropdownMenuContent className="w-80 rounded-lg p-2" align="end">
                            <DropdownMenuLabel className="rounded-lg bg-muted/50 p-3 font-normal">
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-11 w-11">
                                        <AvatarFallback className="bg-primary text-sm font-black text-primary-foreground">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-black leading-none">{user?.name ?? "Usuário"}</p>
                                        <p className="mt-1 truncate text-xs text-muted-foreground">{user?.email ?? ""}</p>
                                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-background px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                                            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                            Conta ativa
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuLabel>

                            <div className="grid grid-cols-2 gap-2 px-1 py-2 text-xs">
                                <div className="rounded-lg border border-border/60 p-2">
                                    <span className="block text-muted-foreground">Último login</span>
                                    <strong className="mt-1 block text-[11px]">{formatDate(user?.last_login_at)}</strong>
                                </div>
                                <div className="rounded-lg border border-border/60 p-2">
                                    <span className="block text-muted-foreground">Tutorial</span>
                                    <strong className="mt-1 flex items-center gap-1 text-[11px]">
                                        <CheckCircle2 className="h-3 w-3 text-primary" />
                                        {user?.show_tutorial ? "Pendente" : "Concluído"}
                                    </strong>
                                </div>
                            </div>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onSelect={(event) => {
                                    event.preventDefault();
                                    setAccountModal("settings");
                                }}
                                className="cursor-pointer"
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                Configurações
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(event) => {
                                    event.preventDefault();
                                    setAccountModal("profile");
                                }}
                                className="cursor-pointer"
                            >
                                <User className="mr-2 h-4 w-4" />
                                Perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(event) => {
                                    event.preventDefault();
                                    setAccountModal("settings");
                                }}
                                className="cursor-pointer"
                            >
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Rever tutorial
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {accountModal && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
                    <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-auto rounded-lg border bg-background shadow-xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-5 py-4">
                            <div>
                                <p className="text-sm font-black">
                                    {accountModal === "profile" ? "Perfil" : "Configurações"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {accountModal === "profile"
                                        ? "Atualize os dados exibidos na conta."
                                        : "Ajustes rápidos sem sair da página atual."}
                                </p>
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => setAccountModal(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 border-b p-2">
                            <button
                                type="button"
                                onClick={() => setAccountModal("profile")}
                                className={cn(
                                    "rounded-lg px-3 py-2 text-sm font-bold transition-colors",
                                    accountModal === "profile" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                                )}
                            >
                                Perfil
                            </button>
                            <button
                                type="button"
                                onClick={() => setAccountModal("settings")}
                                className={cn(
                                    "rounded-lg px-3 py-2 text-sm font-bold transition-colors",
                                    accountModal === "settings" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                                )}
                            >
                                Configurações
                            </button>
                        </div>

                        {accountModal === "profile" ? (
                            <form className="space-y-5 p-5" onSubmit={handleProfileSubmit}>
                                <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-primary text-sm font-black text-primary-foreground">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-black">{user?.name ?? "Usuário"}</p>
                                        <p className="truncate text-xs text-muted-foreground">{user?.email ?? "Sem e-mail"}</p>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="topbar-profile-name">Nome</Label>
                                        <Input
                                            id="topbar-profile-name"
                                            value={data.name}
                                            onChange={(event) => setData("name", event.target.value)}
                                            placeholder="Seu nome"
                                        />
                                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="topbar-profile-email">E-mail</Label>
                                        <Input
                                            id="topbar-profile-email"
                                            type="email"
                                            value={data.email}
                                            onChange={(event) => setData("email", event.target.value)}
                                            placeholder="seu@email.com"
                                        />
                                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                                    </div>
                                </div>

                                <Button type="submit" disabled={processing}>
                                    <Save className="h-4 w-4" />
                                    Salvar perfil
                                </Button>
                            </form>
                        ) : (
                            <div className="space-y-5 p-5">
                                <section className="rounded-lg border p-4">
                                    <div className="mb-4 flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-primary" />
                                        <h2 className="text-sm font-black">Sessão</h2>
                                    </div>
                                    <div className="grid gap-3 text-sm sm:grid-cols-2">
                                        <div className="rounded-lg bg-muted/40 p-3">
                                            <span className="text-muted-foreground">Último login</span>
                                            <p className="mt-1 font-bold">{formatDate(user?.last_login_at)}</p>
                                        </div>
                                        <div className="rounded-lg bg-muted/40 p-3">
                                            <span className="text-muted-foreground">Tutorial</span>
                                            <p className="mt-1 font-bold">{user?.show_tutorial ? "Pendente" : "Concluído"}</p>
                                        </div>
                                    </div>
                                </section>

                                <section className="rounded-lg border p-4">
                                    <div className="mb-4 flex items-center gap-2">
                                        <MonitorCog className="h-4 w-4 text-primary" />
                                        <h2 className="text-sm font-black">Preferências locais</h2>
                                    </div>
                                    <div className="grid gap-3">
                                        {preferences.map((preference) => (
                                            <button
                                                key={preference.key}
                                                type="button"
                                                onClick={() => savePreference(preference.key, !preference.enabled, preference.setter)}
                                                className={cn(
                                                    "flex items-start justify-between gap-4 rounded-lg border p-3 text-left transition-colors",
                                                    preference.enabled ? "border-primary/40 bg-primary/10" : "hover:bg-muted/40",
                                                )}
                                            >
                                                <span>
                                                    <span className="block text-sm font-black">{preference.title}</span>
                                                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                                        {preference.description}
                                                    </span>
                                                </span>
                                                <span className="rounded-lg bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                                                    {preference.enabled ? "Ativo" : "Inativo"}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                                    <HelpCircle className="mb-3 h-5 w-5 text-primary" />
                                    <h2 className="text-sm font-black">Tutorial do sistema</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        Reabra o guia de boas-vindas no próximo retorno ao Hub.
                                    </p>
                                    <Button type="button" variant="outline" className="mt-4 bg-background" onClick={resetTutorial}>
                                        <RotateCcw className="h-4 w-4" />
                                        Rever tutorial
                                    </Button>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
