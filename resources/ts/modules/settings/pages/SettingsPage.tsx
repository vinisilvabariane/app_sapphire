import { router, useForm } from "@inertiajs/react";
import { useState, type FormEvent } from "react";
import {
    Bell,
    CheckCircle2,
    MonitorCog,
    RotateCcw,
    Save,
    ShieldCheck,
    Sparkles,
    UserRound,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AppUser = {
    created_at?: string | null;
    email?: string;
    last_login_at?: string | null;
    name?: string;
    onboarded_at?: string | null;
};

type SettingsPageProps = {
    session?: {
        auth_method?: string;
        created_at?: string | null;
        last_login_at?: string | null;
        onboarded_at?: string | null;
    };
    user?: AppUser | null;
};

type ProfileForm = {
    email: string;
    name: string;
};

function formatDate(value?: string | null) {
    if (!value) {
        return "Não registrado";
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

export default function SettingsPage({ session, user }: SettingsPageProps) {
    const [compactBoard, setCompactBoard] = useState(() => loadPreference("sapphire-compact-board", false));
    const [denseNavigation, setDenseNavigation] = useState(() => loadPreference("sapphire-dense-navigation", false));
    const [dailyDigest, setDailyDigest] = useState(() => loadPreference("sapphire-daily-digest", true));

    const { data, errors, post, processing, setData } = useForm<ProfileForm>({
        email: user?.email ?? "",
        name: user?.name ?? "",
    });

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
            key: "sapphire-compact-board",
            title: "Board compacto",
            description: "Reduz densidade visual nos cards do Workspaces quando for implementado no módulo.",
            enabled: compactBoard,
            icon: MonitorCog,
            setter: setCompactBoard,
        },
        {
            key: "sapphire-dense-navigation",
            title: "Navegação densa",
            description: "Guarda uma preferência local para versões compactas da navegação.",
            enabled: denseNavigation,
            icon: ShieldCheck,
            setter: setDenseNavigation,
        },
        {
            key: "sapphire-daily-digest",
            title: "Resumo diário",
            description: "Preferência local para receber um resumo do sprint e pendências.",
            enabled: dailyDigest,
            icon: Bell,
            setter: setDailyDigest,
        },
    ];

    return (
        <DashboardLayout user={user ?? undefined} title="Configurações">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <Badge variant="secondary" className="w-fit rounded-full bg-primary/10 px-3 py-1 text-primary">
                                Conta Sapphire
                            </Badge>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight">Configurações úteis do sistema</h1>
                                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                    Atualize perfil, acompanhe a sessão ativa e controle preferências locais do app.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border/60 bg-background p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <UserRound className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-black">{user?.name ?? "Usuário"}</p>
                                    <p className="text-xs text-muted-foreground">{user?.email ?? "Sem e-mail"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <section id="profile" className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <UserRound className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-base font-black">Perfil</h2>
                                <p className="text-sm text-muted-foreground">Essas informações aparecem no topo do app.</p>
                            </div>
                        </div>

                        <form className="space-y-5" onSubmit={handleProfileSubmit}>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(event) => setData("name", event.target.value)}
                                        placeholder="Seu nome"
                                    />
                                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
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
                    </section>

                    <aside className="space-y-6">
                        <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <h2 className="text-sm font-black">Sessão e segurança</h2>
                            </div>
                            <div className="space-y-3 text-sm">
                                {[
                                    ["Método", session?.auth_method ?? "E-mail e senha"],
                                    ["Último login", formatDate(session?.last_login_at)],
                                    ["Conta criada", formatDate(session?.created_at)],
                                    ["Tutorial", session?.onboarded_at ? "Concluído" : "Pendente"],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex items-center justify-between gap-4 rounded-2xl bg-muted/40 p-3">
                                        <span className="text-muted-foreground">{label}</span>
                                        <span className="text-right font-bold">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="tutorial" className="rounded-3xl border border-primary/20 bg-primary/5 p-5">
                            <Sparkles className="mb-3 h-5 w-5 text-primary" />
                            <h2 className="text-sm font-black">Tutorial do sistema</h2>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Reabra o guia de boas-vindas no próximo retorno ao hub.
                            </p>
                            <Button type="button" variant="outline" className="mt-4 w-full bg-background" onClick={resetTutorial}>
                                <RotateCcw className="h-4 w-4" />
                                Rever tutorial
                            </Button>
                        </section>
                    </aside>
                </div>

                <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <MonitorCog className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-black">Preferências locais</h2>
                            <p className="text-sm text-muted-foreground">
                                Preferências salvas no navegador atual para preparar comportamento futuro do app.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {preferences.map((preference) => {
                            const Icon = preference.icon;

                            return (
                                <button
                                    key={preference.key}
                                    type="button"
                                    onClick={() => savePreference(preference.key, !preference.enabled, preference.setter)}
                                    className={cn(
                                        "rounded-3xl border p-5 text-left transition-all",
                                        preference.enabled
                                            ? "border-primary/40 bg-primary/10"
                                            : "border-border/70 bg-background hover:border-primary/25",
                                    )}
                                >
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-foreground">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        {preference.enabled && <CheckCircle2 className="h-5 w-5 text-primary" />}
                                    </div>
                                    <h3 className="text-sm font-black">{preference.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{preference.description}</p>
                                    <span className="mt-4 inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                                        {preference.enabled ? "Ativo" : "Inativo"}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
