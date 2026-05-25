import { Bell, TrendingUp } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { Separator } from "@/components/ui/separator";
import { mockupActivity, mockupStats } from "../data/landingData";

const bars = [40, 65, 45, 80, 55, 90, 70];

export function HeroMockup() {
    return (
        <div className="relative mx-auto w-full max-w-md">
            <div
                className="absolute inset-x-6 inset-y-10 -z-10 rounded-[2rem] opacity-45 blur-3xl"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(91,163,232,0.35), rgba(40,82,149,0.5), transparent)",
                }}
            />

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/20 ring-1 ring-primary/10">
                <div className="relative h-64 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=85"
                        alt=""
                        decoding="async"
                        fetchPriority="high"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,33,0.08)_0%,rgba(7,16,33,0.55)_42%,rgba(7,16,33,0.94)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(40,82,149,0.62)_0%,rgba(13,28,58,0.36)_42%,rgba(6,13,28,0.88)_100%)]" />

                    <div className="absolute inset-x-5 bottom-5 space-y-3 text-white">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7ecfff]" />
                            {"Opera\u00E7\u00E3o integrada"}
                        </div>
                        <div className="max-w-xs space-y-1">
                            <div className="text-2xl font-black leading-tight">
                                Controle, dados e equipe no mesmo fluxo.
                            </div>
                            <div className="text-sm leading-relaxed text-white/75">
                                {"Vis\u00E3o executiva sem perder o detalhe operacional."}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <LogoMark className="h-5 w-5" />
                            <span className="text-xs font-bold tracking-wide">Sapphire Dashboard</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                            </span>
                            Ao vivo
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {mockupStats.map((stat) => (
                            <div key={stat.label} className="space-y-0.5 rounded-xl bg-muted/60 p-2.5">
                                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                                <div className="text-sm font-extrabold">{stat.value}</div>
                                <div className="text-[10px] font-semibold text-primary">{stat.delta}</div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1.5">
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Semana
                        </div>
                        <div className="landing-bars flex h-14 items-end gap-1">
                            {bars.map((height, index) => (
                                <div
                                    key={index}
                                    className="landing-bar flex-1 rounded-sm bg-[linear-gradient(to_top,#285295,#5ba3e8)]"
                                    style={{ height: `${height}%` }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between">
                            {["S", "T", "Q", "Q", "S", "S", "D"].map((day, index) => (
                                <span key={`${day}-${index}`} className="flex-1 text-center text-[10px] text-muted-foreground">
                                    {day}
                                </span>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2.5">
                        {mockupActivity.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex min-w-0 items-center gap-2">
                                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                                        {item.name[0]}
                                    </div>
                                    <span className="truncate text-xs text-muted-foreground">
                                        <span className="font-semibold text-foreground">{item.name}</span>{" "}
                                        {item.action}
                                    </span>
                                </div>
                                <span className="ml-2 flex-shrink-0 text-[10px] text-muted-foreground">
                                    {item.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FloatingBadge
                className="landing-floating-badge -right-4 top-8"
                icon={<Bell className="h-4 w-4 text-primary" />}
                title="Novo pedido"
                subtitle="R$ 1.240,00"
            />
            <FloatingBadge
                className="landing-floating-badge landing-floating-badge-delayed -left-4 bottom-8"
                icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
                title={"+24% este m\u00EAs"}
                subtitle={"vs. m\u00EAs anterior"}
                positive
            />
        </div>
    );
}

type FloatingBadgeProps = {
    className: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    positive?: boolean;
};

function FloatingBadge({ className, icon, title, subtitle, positive = false }: FloatingBadgeProps) {
    return (
        <div
            className={`absolute flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/95 p-3 shadow-lg shadow-black/10 backdrop-blur-sm ${className}`}
        >
            <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                    positive ? "bg-emerald-500/15" : "bg-primary/15"
                }`}
            >
                {icon}
            </div>
            <div>
                <div className={`text-xs font-bold ${positive ? "text-emerald-500" : ""}`}>
                    {title}
                </div>
                <div className="text-[10px] text-muted-foreground">{subtitle}</div>
            </div>
        </div>
    );
}
