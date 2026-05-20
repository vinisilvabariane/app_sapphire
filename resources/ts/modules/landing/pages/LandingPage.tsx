import { Link } from "@inertiajs/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
    ArrowRight, Bell, Check, ChevronRight, Gem,
    LayoutDashboard, Shield, Star, TrendingUp, Users, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

// ─── Animation presets ────────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
};

// Gradient text — blue ramp matching brand
const gt: React.CSSProperties = {
    background: "linear-gradient(135deg, #5ba3e8 0%, #285295 55%, #1a3a6e 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
};

const showcaseBlendBg = "#050506";

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
    {
        name: "Fernanda Castro",
        role: "CTO",
        company: "TechCorp",
        quote: "O Sapphire reduziu em 60% o tempo da nossa equipe de operações. Interface limpa, performance absurda.",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    },
    {
        name: "Rafael Mendes",
        role: "CEO",
        company: "StartupXP",
        quote: "Finalmente um sistema que não parece anos 2000. Onboarding em minutos, retorno na primeira semana.",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    },
    {
        name: "Camila Nunes",
        role: "Head of Ops",
        company: "LogisTech",
        quote: "Segurança com JWT, dashboards em tempo real e suporte impecável. Vale cada centavo.",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
    },
];

const steps = [
    { n: "01", title: "Crie sua conta", desc: "Cadastro em menos de 60 segundos. Sem cartão de crédito, sem burocracia." },
    { n: "02", title: "Configure o ambiente", desc: "Defina usuários, permissões e módulos em poucos cliques com o painel visual." },
    { n: "03", title: "Opere com confiança", desc: "Dashboards, relatórios e gestão completa prontos para o dia a dia da sua empresa." },
];

const useCases = [
    "Sistema de Chamados", "Dashboards em Tempo Real", "Metodologias Ágeis",
    "Gestão de Projetos", "Kanban & Sprints", "Controle de Acesso",
    "Relatórios Automatizados", "KPIs & Metas", "Gestão de Equipes",
    "Indicadores de Performance", "Fluxos de Aprovação", "Base de Conhecimento",
];

// ─── Hero mockup ──────────────────────────────────────────────────────────────

function HeroMockup() {
    const bars = [40, 65, 45, 80, 55, 90, 70];

    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Ambient glow */}
            <div
                className="absolute inset-x-6 inset-y-10 -z-10 rounded-[2rem] blur-3xl opacity-45"
                style={{ background: "linear-gradient(135deg, rgba(91,163,232,0.35), rgba(40,82,149,0.5), transparent)" }}
            />

            {/* Dashboard card */}
            <motion.div
                className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/20 ring-1 ring-primary/10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="relative h-64 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=85"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(7,16,33,0.08) 0%, rgba(7,16,33,0.55) 42%, rgba(7,16,33,0.94) 100%)",
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(115deg, rgba(40,82,149,0.62) 0%, rgba(13,28,58,0.36) 42%, rgba(6,13,28,0.88) 100%)",
                        }}
                    />

                    <div className="absolute inset-x-5 bottom-5 space-y-3 text-white">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7ecfff]" />
                            Operacao integrada
                        </div>
                        <div className="max-w-xs space-y-1">
                            <div className="text-2xl font-black leading-tight">Controle, dados e equipe no mesmo fluxo.</div>
                            <div className="text-sm leading-relaxed text-white/72">Visao executiva sem perder o detalhe operacional.</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 p-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Gem className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold tracking-wide">Sapphire Dashboard</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                        Ao vivo
                    </span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: "Receita", value: "R$48.2k", delta: "+12%" },
                        { label: "Usuários", value: "2.4k", delta: "+8%" },
                        { label: "Conversão", value: "3.6%", delta: "+2%" },
                    ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-muted/60 p-2.5 space-y-0.5">
                            <div className="text-[10px] text-muted-foreground">{s.label}</div>
                            <div className="text-sm font-extrabold">{s.value}</div>
                            <div className="text-[10px] text-primary font-semibold">{s.delta}</div>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Semana</div>
                    <div className="flex items-end gap-1 h-14">
                        {bars.map((h, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 rounded-sm"
                                style={{ background: "linear-gradient(to top, #285295, #5ba3e8)" }}
                                initial={{ scaleY: 0, originY: 1 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.9 + i * 0.07, duration: 0.45, ease: "easeOut" }}
                                custom={h}
                            >
                                <div style={{ height: `${h}%` }} />
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                            <span key={i} className="flex-1 text-center text-[10px] text-muted-foreground">{d}</span>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Activity */}
                <div className="space-y-2.5">
                    {[
                        { name: "Ana Lima", action: "fez login", time: "agora" },
                        { name: "Carlos B.", action: "exportou relatório", time: "2min" },
                        { name: "Mariana S.", action: "criou pedido #482", time: "5min" },
                    ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                    {item.name[0]}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    <span className="font-semibold text-foreground">{item.name}</span>{" "}
                                    {item.action}
                                </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground ml-2 flex-shrink-0">{item.time}</span>
                        </div>
                    ))}
                </div>
                </div>
            </motion.div>

            {/* Floating: notification */}
            <motion.div
                className="absolute -right-4 top-8 flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/95 shadow-lg shadow-black/10 backdrop-blur-sm p-3"
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.4, type: "spring", stiffness: 200 }}
            >
                <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <div className="text-xs font-bold">Novo pedido</div>
                    <div className="text-[10px] text-muted-foreground">R$ 1.240,00</div>
                </div>
            </motion.div>

            {/* Floating: growth */}
            <motion.div
                className="absolute -left-4 bottom-8 flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/95 shadow-lg shadow-black/10 backdrop-blur-sm p-3"
                initial={{ opacity: 0, scale: 0.7, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.4, type: "spring", stiffness: 200 }}
            >
                <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                    <div className="text-xs font-bold text-emerald-500">+24% este mês</div>
                    <div className="text-[10px] text-muted-foreground">vs. mês anterior</div>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Showcase with parallax ───────────────────────────────────────────────────

function ShowcaseSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

    return (
        <section ref={ref} className="relative h-[600px] md:h-[700px] overflow-hidden bg-black">
            {/* Parallax image — oversized so movement stays in bounds */}
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-125 will-change-transform">
                <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80"
                    alt=""
                    className="w-full h-full object-cover object-left brightness-95 contrast-110 saturate-105"
                />
            </motion.div>

            {/* Horizontal gradient: image visible left → pitch dark right */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(100deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.32) 34%, rgba(0,0,0,0.78) 60%, #000 86%, #000 100%)",
                }}
            />
            <div
                className="absolute inset-x-0 top-0 h-64"
                style={{
                    background:
                        `linear-gradient(180deg, ${showcaseBlendBg} 0%, rgba(0,0,0,0.82) 24%, rgba(0,0,0,0.36) 62%, transparent 100%)`,
                }}
            />
            <div
                className="absolute inset-x-0 bottom-0 h-72"
                style={{
                    background:
                        `linear-gradient(0deg, ${showcaseBlendBg} 0%, rgba(0,0,0,0.86) 24%, rgba(0,0,0,0.38) 64%, transparent 100%)`,
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 20% 45%, transparent 0%, rgba(0,0,0,0.14) 48%, rgba(0,0,0,0.82) 100%)",
                }}
            />

            {/* Text — right side, in the dark area */}
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-screen-xl mx-auto w-full px-8 md:px-14 flex justify-end">
                    <motion.div
                        className="w-full max-w-xl text-white space-y-7"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-px w-10 bg-primary" />
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                                Sapphire em ação
                            </span>
                        </div>

                        <h3 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.08] tracking-normal">
                            Times{" "}
                            <span style={{ background: "linear-gradient(135deg,#7ecfff,#5ba3e8,#285295)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                produtivos.
                            </span>
                            <br />
                            Resultados{" "}
                            <span style={{ background: "linear-gradient(135deg,#7ecfff,#5ba3e8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                reais.
                            </span>
                        </h3>

                        <p className="text-white/60 text-lg leading-relaxed">
                            Mais de 200 empresas brasileiras transformaram sua operação com o Sapphire.
                            Da gestão de chamados aos dashboards executivos — tudo integrado.
                        </p>

                        <div className="flex items-center gap-3 pt-1">
                            <Button
                                size="lg"
                                className="h-12 px-8 bg-white text-primary hover:bg-white/92 font-bold shadow-2xl shadow-black/30"
                                asChild
                            >
                                <Link href="/login">
                                    Começar agora <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/8 backdrop-blur-sm border border-white/12 px-4 py-2.5 text-xs font-medium text-white/70">
                                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                                </span>
                                +200 empresas ativas
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

            {/* ── Nav ── */}
            <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl">
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                <div className="mx-auto grid h-16 max-w-screen-xl grid-cols-[1fr_auto_1fr] items-center px-6">
                    {/* Logo — left */}
                    <Link href="/" className="flex items-center gap-2.5 w-fit">
                        <div
                            className="flex h-8 w-8 items-center justify-center rounded-xl shadow-md shadow-primary/40 flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #3a6cbd 0%, #285295 60%, #1a3a6e 100%)" }}
                        >
                            <Gem className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-black tracking-tight text-lg" style={gt}>Sapphire</span>
                    </Link>

                    {/* Nav — center */}
                    <nav className="hidden md:flex items-center justify-center gap-0.5 rounded-full border border-border/50 bg-muted/30 px-2 py-1.5 mx-auto">
                        {(["Recursos", "Planos", "Como funciona", "Depoimentos"] as const).map((l, i) => (
                            <a
                                key={l}
                                href={["#features", "#pricing", "#how", "#testimonials"][i]}
                                className="rounded-full px-3.5 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-background/70 transition-all whitespace-nowrap"
                            >
                                {l}
                            </a>
                        ))}
                    </nav>

                    {/* Actions — right */}
                    <div className="flex min-w-0 items-center justify-end gap-2">
                        <ThemeToggle />
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex px-3" asChild>
                            <Link href="/login">Entrar</Link>
                        </Button>
                        <Button
                            size="sm"
                            asChild
                            className="h-9 rounded-full px-3.5 text-xs font-bold shadow-md shadow-primary/25 sm:px-4 sm:text-sm"
                            style={{ background: "linear-gradient(135deg, #3a6cbd, #285295)" }}
                        >
                            <Link href="/login" className="inline-flex items-center gap-1.5 whitespace-nowrap">
                                Começar grátis <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* ── Hero ── */}
            <section
                className="relative min-h-screen flex items-center pt-16 px-6 overflow-hidden bg-background"
                style={{
                    background:
                        "radial-gradient(circle at 78% 30%, rgba(91,163,232,0.14) 0%, rgba(91,163,232,0.06) 28%, transparent 48%), radial-gradient(circle at 18% 22%, rgba(40,82,149,0.10) 0%, rgba(40,82,149,0.04) 30%, transparent 52%), var(--background)",
                }}
            >

                {/* Dot grid pattern */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, #285295 1px, transparent 0)",
                        backgroundSize: "42px 42px",
                    }}
                />

                <div className="relative max-w-screen-2xl mx-auto w-full py-24 grid lg:grid-cols-[56fr_44fr] gap-14 xl:gap-16 items-center">

                    {/* Text */}
                    <motion.div className="max-w-3xl -translate-y-8 lg:translate-x-12 xl:translate-x-20 space-y-9" variants={stagger} initial="hidden" animate="show">

                        {/* Announcement bar */}
                        <motion.a
                            variants={fadeUp}
                            href="#features"
                            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/6 px-4 py-1.5 text-xs font-medium hover:bg-primary/10 transition-colors cursor-pointer group"
                        >
                            <span className="rounded-full bg-primary px-2 py-0.5 text-white text-[10px] font-black tracking-wide">
                                NOVO
                            </span>
                            <span className="text-muted-foreground">Sapphire 1.0 chegou — veja os recursos</span>
                            <ChevronRight className="h-3 w-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                        </motion.a>

                        {/* Headline */}
                        <motion.div variants={fadeUp} className="space-y-2">
                            <h1 className="text-5xl sm:text-6xl xl:text-[5.15rem] font-black tracking-normal leading-[1.08]">
                                Menos esforço.
                            </h1>
                            <h1
                                className="text-5xl sm:text-6xl xl:text-[5.15rem] font-black tracking-normal leading-[1.08]"
                                style={gt}
                            >
                                Mais resultado.
                            </h1>
                        </motion.div>

                        <motion.p variants={fadeUp} className="max-w-xl text-xl text-muted-foreground leading-relaxed">
                            Sapphire centraliza sua operação em uma plataforma moderna, segura e rápida.
                            Do controle de acesso aos relatórios — tudo em um único lugar.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
                            <Button
                                size="lg"
                                asChild
                                className="h-13 px-9 text-base font-black shadow-xl shadow-primary/35 tracking-wide"
                                style={{ background: "linear-gradient(135deg, #3a6cbd 0%, #285295 55%, #1a3a6e 100%)" }}
                            >
                                <Link href="/login">
                                    Começar agora — grátis
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            {/* Outline with glow on hover */}
                            <div className="relative group">
                                <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"
                                    style={{ background: "linear-gradient(135deg, #5ba3e8, #285295)" }}
                                />
                                <Button size="lg" variant="outline" className="relative h-13 px-8 text-base font-semibold">
                                    Ver demonstração
                                </Button>
                            </div>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div variants={fadeUp} className="flex items-center gap-5 pt-1">
                            <div className="flex -space-x-2.5">
                                {["F", "R", "C", "M", "J"].map((l, i) => (
                                    <div
                                        key={i}
                                        className="h-9 w-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-black text-primary"
                                        style={{ background: `rgba(40,82,149,${0.1 + i * 0.04})` }}
                                    >
                                        {l}
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                                    ))}
                                    <span className="ml-1.5 text-sm font-black">4.9</span>
                                    <span className="text-xs text-muted-foreground ml-0.5">/5</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Confiado por <span className="text-foreground font-semibold">+200 empresas</span> brasileiras
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Mockup */}
                    <div className="hidden lg:block">
                        <HeroMockup />
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <div className="w-5 h-8 rounded-full border-2 border-border/50 flex items-start justify-center pt-1.5">
                        <div className="w-1 h-2 rounded-full bg-primary/60" />
                    </div>
                </motion.div>
            </section>

            {/* ── Use cases marquee ── */}
            <section className="border-y border-border/40 py-4 bg-muted/15 overflow-hidden">
                <div className="flex items-center gap-4 mb-3 px-6 max-w-screen-xl mx-auto">
                    <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground whitespace-nowrap">
                        O que você resolve com Sapphire
                    </span>
                    <div className="flex-1 h-px bg-border/40" />
                </div>
                <div className="relative">
                    <motion.div
                        className="flex gap-3 w-max px-6"
                        animate={{ x: ["0px", "-50%"] }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    >
                        {[...useCases, ...useCases].map((uc, i) => (
                            <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs font-semibold whitespace-nowrap px-3 py-1.5 border border-primary/15 bg-primary/5 text-foreground"
                            >
                                {uc}
                            </Badge>
                        ))}
                    </motion.div>
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-screen-xl mx-auto">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {[
                            { v: "99.9%", l: "Uptime SLA" },
                            { v: "<50ms", l: "Latência média" },
                            { v: "+200", l: "Empresas ativas" },
                            { v: "4.9★", l: "Avaliação média" },
                        ].map((s) => (
                            <motion.div
                                key={s.l}
                                variants={fadeUp}
                                className="rounded-2xl border border-border/50 bg-card p-6 text-center space-y-1
                                           hover:border-primary/30 transition-colors"
                            >
                                <div className="text-4xl font-black" style={gt}>{s.v}</div>
                                <div className="text-sm text-muted-foreground font-medium">{s.l}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <ShowcaseSection />

            {/* ── Features bento ── */}
            <section id="features" className="py-20 px-6 bg-black">
                <div className="max-w-screen-xl mx-auto space-y-14">

                    <motion.div
                        className="text-center space-y-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <motion.p variants={fadeUp} className="text-[11px] font-black text-primary uppercase tracking-[0.22em]">
                            Recursos
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                            Uma plataforma.{" "}
                            <span style={gt}>Possibilidades infinitas.</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
                            Cada detalhe foi pensado para a sua equipe trabalhar melhor — sem fricção, sem complexidade.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {/* Wide card */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="md:col-span-2 group rounded-2xl border border-border/60 bg-card p-8 space-y-4
                                       hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/8 transition-all"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <LayoutDashboard className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Dashboard em tempo real</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                KPIs personalizáveis, gráficos interativos e filtros avançados. Visualize o que importa,
                                na hora que importa, com dados sempre atualizados.
                            </p>
                            <div className="flex items-center gap-1.5 text-primary text-sm font-semibold pt-2 group-hover:gap-3 transition-all">
                                Saiba mais <ArrowRight className="h-4 w-4" />
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="group rounded-2xl border border-border/60 bg-card p-8 space-y-4
                                       hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/8 transition-all"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Segurança nativa</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                JWT com HttpOnly cookies. Rotas protegidas por middleware. Seus dados seguros por padrão.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="group rounded-2xl border border-border/60 bg-card p-8 space-y-4
                                       hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/8 transition-all"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Zap className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Performance extrema</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                React 19 + Vite. Navegação instantânea sem recarregar página. Latência abaixo de 50ms.
                            </p>
                        </motion.div>

                        {/* Wide card */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="md:col-span-2 group rounded-2xl border border-border/60 bg-card p-8 space-y-4
                                       hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/8 transition-all"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Gestão multi-usuário</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Permissões granulares, papéis e níveis de acesso. Cada colaborador vê exatamente o que
                                precisa. Auditoria completa de todas as ações no sistema.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {["Administrador", "Gestor", "Analista", "Operador"].map((r) => (
                                    <Badge key={r} variant="secondary" className="text-xs font-medium">{r}</Badge>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── How it works ── */}
            <section id="how" className="py-24 px-6 border-y border-border/40 bg-muted/15">
                <div className="max-w-screen-xl mx-auto space-y-16">

                    <motion.div
                        className="text-center space-y-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <motion.p variants={fadeUp} className="text-[11px] font-black text-primary uppercase tracking-[0.22em]">
                            Como funciona
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black tracking-tight">
                            Do zero ao operacional{" "}
                            <span style={gt}>em minutos</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-10"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {steps.map((s, i) => (
                            <motion.div key={s.n} variants={fadeUp} className="relative space-y-5">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-primary/30 bg-primary/8"
                                        style={{ background: "linear-gradient(135deg, rgba(40,82,149,0.12), rgba(40,82,149,0.04))" }}
                                    >
                                        <span className="text-lg font-black" style={gt}>{s.n}</span>
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold">{s.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section id="testimonials" className="py-24 px-6">
                <div className="max-w-screen-xl mx-auto space-y-14">

                    <motion.div
                        className="text-center space-y-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <motion.p variants={fadeUp} className="text-[11px] font-black text-primary uppercase tracking-[0.22em]">
                            Depoimentos
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black tracking-tight">
                            Quem usa,{" "}
                            <span style={gt}>recomenda</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-5"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {testimonials.map((t) => (
                            <motion.div
                                key={t.name}
                                variants={fadeUp}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="rounded-2xl border border-border/60 bg-card p-7 space-y-5
                                           hover:border-primary/30 hover:shadow-xl hover:shadow-primary/6 transition-all"
                            >
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed text-muted-foreground italic">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-1">
                                    <img
                                        src={t.photo}
                                        alt={t.name}
                                        className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/20"
                                    />
                                    <div>
                                        <div className="text-sm font-bold">{t.name}</div>
                                        <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Pricing ── */}
            <section id="pricing" className="py-24 px-6 border-t border-border/40 bg-muted/15">
                <div className="max-w-screen-xl mx-auto space-y-14">

                    <motion.div
                        className="text-center space-y-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <motion.p variants={fadeUp} className="text-[11px] font-black text-primary uppercase tracking-[0.22em]">
                            Planos
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black tracking-tight">
                            Simples e{" "}
                            <span style={gt}>transparente</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-lg mx-auto">
                            Comece grátis. Escale quando precisar. Sem surpresas na fatura.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-5 items-stretch"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {/* Free */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="rounded-2xl border border-border/60 bg-card p-8 flex flex-col gap-6
                                       hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all"
                        >
                            <div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Free</div>
                                <div className="flex items-end gap-1">
                                    <span className="text-5xl font-black">Grátis</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">Para experimentar sem compromisso.</p>
                            </div>
                            <Separator />
                            <ul className="space-y-3 flex-1">
                                {[
                                    "1 usuário",
                                    "Dashboard básico",
                                    "100 registros",
                                    "Suporte por email",
                                ].map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" className="w-full" size="lg" asChild>
                                <Link href="/login">Começar grátis</Link>
                            </Button>
                        </motion.div>

                        {/* Pro — highlighted */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="relative rounded-2xl border-2 border-primary bg-card p-8 flex flex-col gap-6
                                       shadow-2xl shadow-primary/15"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-lg shadow-primary/30">
                                    ✦ Mais popular
                                </span>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Plus</div>
                                <div className="flex items-end gap-1">
                                    <span className="text-5xl font-black" style={gt}>R$29</span>
                                    <span className="text-2xl font-black" style={gt}>,90</span>
                                    <span className="text-muted-foreground mb-1.5 ml-0.5">/mês</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">Para equipes que precisam de mais.</p>
                            </div>
                            <Separator />
                            <ul className="space-y-3 flex-1">
                                {[
                                    "Até 10 usuários",
                                    "Dashboard completo",
                                    "Registros ilimitados",
                                    "Relatórios exportáveis",
                                    "Suporte prioritário",
                                ].map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm">
                                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full shadow-lg shadow-primary/25" size="lg" asChild>
                                <Link href="/login">
                                    Assinar Plus <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Business */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="rounded-2xl border border-border/60 bg-card p-8 flex flex-col gap-6
                                       hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all"
                        >
                            <div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Premium</div>
                                <div className="flex items-end gap-1">
                                    <span className="text-5xl font-black">R$99</span>
                                    <span className="text-2xl font-black">,90</span>
                                    <span className="text-muted-foreground mb-1.5 ml-0.5">/mês</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">Para operações que não param.</p>
                            </div>
                            <Separator />
                            <ul className="space-y-3 flex-1">
                                {[
                                    "Usuários ilimitados",
                                    "Tudo do plano Plus",
                                    "API access completo",
                                    "Auditoria avançada",
                                    "SLA 99.9% garantido",
                                    "Suporte 24/7",
                                ].map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" className="w-full" size="lg" asChild>
                                <Link href="/login">Assinar Premium</Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-center text-sm text-muted-foreground"
                    >
                        Todos os planos incluem 14 dias de teste grátis. Cancele a qualquer momento.
                    </motion.p>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="border-y border-border/40 bg-muted/20 px-6 py-16">
                <div className="max-w-screen-xl mx-auto">
                    <motion.div
                        className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="max-w-2xl space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/25">
                                    <Gem className="h-5 w-5" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
                                    Sapphire
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                                Pronto para operar com
                                <span style={gt}> mais clareza?</span>
                            </h2>

                            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                                Comece hoje. Sem burocracia, sem contrato longo.
                                Veja o resultado na primeira semana.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 md:items-end">
                                <Button
                                    size="lg"
                                    className="h-13 px-9 text-base font-black shadow-xl shadow-primary/25"
                                    style={{ background: "linear-gradient(135deg, #3a6cbd 0%, #285295 55%, #1a3a6e 100%)" }}
                                    asChild
                                >
                                    <Link href="/login">
                                        Começar agora
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>

                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground md:justify-end">
                                {["Sem cartão de crédito", "Suporte incluído", "Cancele quando quiser"].map((l) => (
                                    <div key={l} className="flex items-center gap-1.5">
                                        <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                        {l}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-border/40 py-14 px-6">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
                        {/* Brand */}
                        <div className="space-y-4 max-w-xs">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
                                    <Gem className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-extrabold tracking-tight text-lg">Sapphire</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Gestão empresarial moderna. Rápida, segura e pronta para o crescimento do seu negócio.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-12 text-sm">
                            <div className="space-y-3">
                                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Produto</div>
                                {["Recursos", "Segurança", "Performance", "Integrações"].map((l) => (
                                    <div key={l}>
                                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Empresa</div>
                                {["Sobre nós", "Blog", "Carreiras", "Contato"].map((l) => (
                                    <div key={l}>
                                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Legal</div>
                                {["Privacidade", "Termos de uso", "Cookies"].map((l) => (
                                    <div key={l}>
                                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted-foreground">
                        <p>© {new Date().getFullYear()} Sapphire. Todos os direitos reservados.</p>
                        <p>Feito com ♦ no Brasil</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}
