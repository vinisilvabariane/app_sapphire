import { Link } from "@inertiajs/react";
import { CheckCircle2, Gem } from "lucide-react";
import { motion } from "framer-motion";
import LoginForm from "@/modules/auth/components/LoginForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const FEATURES = [
    "Sessão protegida por JWT e cookies HttpOnly",
    "Módulos integrados em uma única plataforma",
    "Dados centralizados para toda sua equipe",
];

export default function Login() {
    return (
        <div className="min-h-screen flex bg-background overflow-hidden">
            {/* ── Left panel ─────────────────────────────────────────── */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden lg:flex lg:w-[57%] flex-shrink-0 flex-col relative select-none"
                style={{
                    background:
                        "linear-gradient(150deg, #0d1b35 0%, #152448 35%, #1a3a6e 75%, #0f2040 100%)",
                    clipPath: "polygon(0 0, 100% 0, calc(100% - 110px) 100%, 0 100%)",
                }}
            >
                {/* dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* ambient glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[520px] h-[520px] rounded-full pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(91,163,232,0.22) 0%, rgba(40,82,149,0.10) 45%, transparent 70%)",
                    }}
                />

                {/* bottom fade */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(13,27,53,0.6) 0%, transparent 100%)",
                    }}
                />

                <div className="relative z-10 flex flex-col h-full px-12 py-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 w-fit">
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg shadow-black/40"
                            style={{
                                background:
                                    "linear-gradient(135deg, #5ba3e8 0%, #3a6cbd 55%, #285295 100%)",
                            }}
                        >
                            <Gem className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight">
                            Sapphire
                        </span>
                    </Link>

                    {/* Center */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-10">
                        {/* Gem icon with glow */}
                        <div className="relative flex items-center justify-center">
                            <div
                                className="absolute w-56 h-56 rounded-full blur-3xl"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(91,163,232,0.40) 0%, transparent 70%)",
                                }}
                            />
                            <div
                                className="relative flex h-36 w-36 items-center justify-center rounded-[2.5rem]"
                                style={{
                                    background:
                                        "linear-gradient(145deg, rgba(91,163,232,0.15) 0%, rgba(40,82,149,0.25) 100%)",
                                    border: "1.5px solid rgba(91,163,232,0.35)",
                                    boxShadow:
                                        "0 0 60px rgba(91,163,232,0.20), inset 0 1px 0 rgba(255,255,255,0.08)",
                                }}
                            >
                                <Gem
                                    className="h-20 w-20 text-blue-300"
                                    style={{
                                        filter: "drop-shadow(0 0 28px rgba(91,163,232,0.85))",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Copy */}
                        <div className="space-y-3 text-center max-w-xs">
                            <h1 className="text-[2.6rem] font-black text-white leading-[1.1] tracking-tight">
                                Gerencie.
                                <br />
                                Decida.{" "}
                                <span
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #7ecfff, #5ba3e8)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Evolua.
                                </span>
                            </h1>
                            <p className="text-sm text-blue-200/60 leading-relaxed">
                                Plataforma integrada de operações para equipes que exigem mais.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="w-full max-w-xs space-y-2.5">
                            {FEATURES.map((f) => (
                                <div
                                    key={f}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-blue-100/80"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }}
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400" />
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-blue-200/25">
                        © {new Date().getFullYear()} Sapphire · Todos os direitos reservados
                    </p>
                </div>
            </motion.div>

            {/* ── Right panel ────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                className="flex flex-1 flex-col bg-background relative z-10 lg:-ml-[110px]"
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 sm:px-10 py-5">
                    <Link
                        href="/"
                        className="flex items-center gap-2 lg:invisible"
                    >
                        <div
                            className="flex h-7 w-7 items-center justify-center rounded-lg"
                            style={{
                                background:
                                    "linear-gradient(135deg, #3a6cbd, #285295)",
                            }}
                        >
                            <Gem className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="font-black text-sm">Sapphire</span>
                    </Link>
                    <div className="ml-auto">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Form area */}
                <div className="flex flex-1 items-center justify-center px-6 sm:px-10 pb-16">
                    <div className="w-full max-w-[360px] space-y-8">
                        <div className="space-y-1.5">
                            <h2 className="text-2xl font-black tracking-tight">
                                Entrar na conta
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Use suas credenciais para acessar o Sapphire.
                            </p>
                        </div>

                        <div className="h-px bg-border/60" />

                        <LoginForm />

                        <p className="text-center text-xs text-muted-foreground">
                            <Link
                                href="/"
                                className="hover:text-foreground transition-colors underline underline-offset-4"
                            >
                                ← Voltar ao site
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
