import { useEffect, useRef } from "react";

type Particle = {
    alpha: number;
    phase: number;
    radius: number;
    vx: number;
    vy: number;
    x: number;
    y: number;
};

const MAX_DPR = 1.5;
const BUBBLE_DISTANCE = 170;
const BUBBLE_SCALE = 3.2;
const CLICK_DISTANCE = 240;
const CLICK_DURATION = 620;
const CLICK_FORCE = 1.05;
const DESKTOP_PARTICLES = 118;
const MAX_SPEED = 1.35;
const MOBILE_PARTICLES = 54;
const WRAP_PADDING = 64;

function createParticles(width: number, height: number, count: number) {
    return Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.18 + Math.random() * 0.26;

        return {
            alpha: 0.38 + Math.random() * 0.34,
            phase: Math.random() * Math.PI * 2,
            radius: 1.8 + Math.random() * 2.2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            x: Math.random() * width,
            y: Math.random() * height,
        };
    });
}

function wrapParticle(particle: Particle, width: number, height: number) {
    if (particle.x < -WRAP_PADDING) {
        particle.x = width + WRAP_PADDING;
    } else if (particle.x > width + WRAP_PADDING) {
        particle.x = -WRAP_PADDING;
    }

    if (particle.y < -WRAP_PADDING) {
        particle.y = height + WRAP_PADDING;
    } else if (particle.y > height + WRAP_PADDING) {
        particle.y = -WRAP_PADDING;
    }
}

export function LandingParticles() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d", { alpha: true });

        if (!canvas || !context) {
            return;
        }

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const viewportQuery = window.matchMedia("(max-width: 767px)");
        let animationFrame = 0;
        let clickUntil = 0;
        let clickX = 0;
        let clickY = 0;
        let height = 0;
        let mouseActive = false;
        let mouseX = 0;
        let mouseY = 0;
        let particles: Particle[] = [];
        let running = false;
        let width = 0;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const nextWidth = Math.max(1, Math.floor(rect.width));
            const nextHeight = Math.max(1, Math.floor(rect.height));
            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

            width = nextWidth;
            height = nextHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            particles = createParticles(width, height, viewportQuery.matches ? MOBILE_PARTICLES : DESKTOP_PARTICLES);
        };

        const draw = () => {
            context.clearRect(0, 0, width, height);

            particles.forEach((particle) => {
                const pulse = 0.74 + Math.sin(particle.phase) * 0.18;
                let bubbleStrength = 0;

                if (mouseActive) {
                    const dx = particle.x - mouseX;
                    const dy = particle.y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < BUBBLE_DISTANCE) {
                        bubbleStrength = 1 - distance / BUBBLE_DISTANCE;
                    }
                }

                const radius = particle.radius * pulse * (1 + bubbleStrength * BUBBLE_SCALE);
                const alpha = Math.min(0.96, particle.alpha + bubbleStrength * 0.42);

                context.beginPath();
                context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
                context.fillStyle = `rgba(91, 163, 232, ${alpha})`;
                context.fill();
            });
        };

        const tick = () => {
            if (!running) {
                return;
            }

            const now = performance.now();
            const clickStrength = clickUntil > now ? (clickUntil - now) / CLICK_DURATION : 0;

            particles.forEach((particle) => {
                if (clickStrength > 0) {
                    const dx = particle.x - clickX;
                    const dy = particle.y - clickY;
                    const distance = Math.max(12, Math.sqrt(dx * dx + dy * dy));

                    if (distance < CLICK_DISTANCE) {
                        const force = (1 - distance / CLICK_DISTANCE) * CLICK_FORCE * clickStrength;

                        particle.vx += (dx / distance) * force;
                        particle.vy += (dy / distance) * force;
                    }
                }

                const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);

                if (speed > MAX_SPEED) {
                    const scale = MAX_SPEED / speed;

                    particle.vx *= scale;
                    particle.vy *= scale;
                }

                particle.phase += 0.018;
                particle.x += particle.vx;
                particle.y += particle.vy;
                wrapParticle(particle, width, height);
            });

            draw();
            animationFrame = window.requestAnimationFrame(tick);
        };

        const stop = () => {
            running = false;

            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = 0;
            }
        };

        const start = () => {
            if (running || motionQuery.matches || document.hidden) {
                draw();
                return;
            }

            running = true;
            animationFrame = window.requestAnimationFrame(tick);
        };

        const handleVisibility = () => {
            if (document.hidden) {
                stop();
                return;
            }

            start();
        };

        const handleMotionChange = () => {
            stop();
            draw();
            start();
        };

        const handleViewportChange = () => {
            resize();
            draw();
        };

        const handlePointerMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            const nextMouseX = event.clientX - rect.left;
            const nextMouseY = event.clientY - rect.top;
            const isInside = nextMouseX >= 0 && nextMouseX <= width && nextMouseY >= 0 && nextMouseY <= height;

            mouseActive = isInside;
            mouseX = nextMouseX;
            mouseY = nextMouseY;
        };

        const handlePointerDown = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            const nextClickX = event.clientX - rect.left;
            const nextClickY = event.clientY - rect.top;
            const isInside = nextClickX >= 0 && nextClickX <= width && nextClickY >= 0 && nextClickY <= height;

            if (!isInside) {
                return;
            }

            clickX = nextClickX;
            clickY = nextClickY;
            clickUntil = performance.now() + CLICK_DURATION;
        };

        const handlePointerLeave = () => {
            mouseActive = false;
        };

        const resizeObserver = new ResizeObserver(() => {
            resize();
            draw();
        });

        resize();
        draw();
        start();
        resizeObserver.observe(canvas);
        document.addEventListener("visibilitychange", handleVisibility);
        window.addEventListener("pointerdown", handlePointerDown, { passive: true });
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerleave", handlePointerLeave);
        motionQuery.addEventListener("change", handleMotionChange);
        viewportQuery.addEventListener("change", handleViewportChange);

        return () => {
            stop();
            resizeObserver.disconnect();
            document.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerleave", handlePointerLeave);
            motionQuery.removeEventListener("change", handleMotionChange);
            viewportQuery.removeEventListener("change", handleViewportChange);
        };
    }, []);

    return <canvas ref={canvasRef} className="landing-particles pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />;
}
