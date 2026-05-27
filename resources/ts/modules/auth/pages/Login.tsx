import { Link } from "@inertiajs/react";
import { CheckCircle2 } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import LoginForm from "@/modules/auth/components/LoginForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const DIAGONAL_OFFSET = 110;

const FEATURES = [
    "Sess\u00E3o protegida por JWT e cookies HttpOnly",
    "M\u00F3dulos integrados em uma \u00FAnica plataforma",
    "Dados centralizados para toda sua equipe",
];

export default function Login() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background lg:block">
            <div
                className="login-left-panel absolute inset-y-0 left-0 z-10 hidden w-[57%] select-none flex-col lg:flex"
                style={{
                    clipPath: `polygon(0 0, 100% 0, calc(100% - ${DIAGONAL_OFFSET}px) 100%, 0 100%)`,
                    background:
                        "linear-gradient(150deg, #0d1b35 0%, #152448 35%, #1a3a6e 75%, #0f2040 100%)",
                }}
            >
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
                        backgroundSize: "28px 28px",
                    }}
                />

                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-[55%] rounded-lg"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(91,163,232,0.22) 0%, rgba(40,82,149,0.10) 45%, transparent 70%)",
                    }}
                />

                <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
                    style={{
                        background: "linear-gradient(to top, rgba(13,27,53,0.6) 0%, transparent 100%)",
                    }}
                />

                <div className="relative z-10 flex h-full flex-col px-12 py-10">
                    <Link href="/" className="flex w-fit items-center gap-3">
                        <LogoMark className="h-10 w-10 drop-shadow-lg" />
                        <span className="text-xl font-black tracking-tight text-white">Sapphire</span>
                    </Link>

                    <div className="flex flex-1 flex-col items-center justify-center gap-10">
                        <div className="relative flex items-center justify-center">
                            <div
                                className="absolute h-56 w-56 rounded-lg blur-3xl"
                                style={{
                                    background: "radial-gradient(circle, rgba(91,163,232,0.40) 0%, transparent 70%)",
                                }}
                            />
                            <div
                                className="relative flex h-36 w-36 items-center justify-center rounded-lg"
                                style={{
                                    background:
                                        "linear-gradient(145deg, rgba(91,163,232,0.15) 0%, rgba(40,82,149,0.25) 100%)",
                                    border: "1.5px solid rgba(91,163,232,0.35)",
                                    boxShadow:
                                        "0 0 60px rgba(91,163,232,0.20), inset 0 1px 0 rgba(255,255,255,0.08)",
                                    }}
                                >
                                <LogoMark className="h-24 w-24 drop-shadow-[0_0_28px_rgba(91,163,232,0.85)]" />
                            </div>
                        </div>

                        <div className="max-w-xs space-y-3 text-center">
                            <h1 className="text-[2.6rem] font-black leading-[1.1] tracking-normal text-white">
                                Gerencie.
                                <br />
                                Decida.{" "}
                                <span
                                    style={{
                                        background: "linear-gradient(90deg, #7ecfff, #5ba3e8)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Evolua.
                                </span>
                            </h1>
                            <p className="text-sm leading-relaxed text-blue-200/60">
                                {"Plataforma integrada de opera\u00E7\u00F5es para equipes que exigem mais."}
                            </p>
                        </div>

                        <div className="w-full max-w-xs space-y-2.5">
                            {FEATURES.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-blue-100/80"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }}
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-center text-xs text-blue-200/25">
                        {"\u00A9"} {new Date().getFullYear()} Sapphire {"\u00B7"} Todos os direitos reservados
                    </p>
                </div>
            </div>

            <div className="relative z-0 flex min-h-screen w-full flex-col bg-background lg:ml-[calc(57%-110px)] lg:w-[calc(43%+110px)] lg:pl-8">
                <div className="flex items-center justify-between px-6 py-5 sm:px-10">
                    <Link href="/" className="flex items-center gap-2 lg:invisible">
                        <LogoMark className="h-7 w-7" />
                        <span className="text-sm font-black">Sapphire</span>
                    </Link>
                    <div className="ml-auto">
                        <ThemeToggle />
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center px-6 pb-16 sm:px-10">
                    <div className="w-full max-w-[360px] space-y-8">
                        <div className="space-y-1.5">
                            <h2 className="text-2xl font-black tracking-normal">Entrar na conta</h2>
                            <p className="text-sm text-muted-foreground">
                                Use suas credenciais para acessar o Sapphire.
                            </p>
                        </div>

                        <div className="h-px bg-border/60" />

                        <LoginForm />

                        <p className="text-center text-xs text-muted-foreground">
                            <Link href="/" className="underline underline-offset-4 transition-colors hover:text-foreground">
                                {"\u2190 Voltar ao site"}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
