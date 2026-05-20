import { useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/login", {
            onSuccess: () => {
                window.location.href = "/home";
            },
        });
    };

    return (
        <Card className="relative overflow-hidden rounded-2xl border-border/60 bg-card/90 shadow-2xl shadow-black/5 backdrop-blur-xl dark:shadow-black/30">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            <CardContent className="p-6 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <LockKeyhole className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <div className="text-sm font-bold">Acesso seguro</div>
                        <div className="text-xs text-muted-foreground">Entre para continuar sua sessao</div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            aria-invalid={!!errors.email}
                            autoComplete="email"
                            className="h-12 rounded-xl bg-background/70"
                            required
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2.5">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                aria-invalid={!!errors.password}
                                autoComplete="current-password"
                                className="h-12 rounded-xl bg-background/70 pr-11"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="h-12 w-full rounded-xl font-black shadow-lg shadow-primary/25"
                        style={{ background: "linear-gradient(135deg, #3a6cbd 0%, #285295 60%, #1a3a6e 100%)" }}
                        disabled={processing}
                    >
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Entrar
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
