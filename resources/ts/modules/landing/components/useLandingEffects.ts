import { useEffect } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function useLandingEffects() {
    useEffect(() => {
        const root = document.querySelector<HTMLElement>("[data-landing-page]");

        if (!root || typeof window === "undefined") {
            return;
        }

        const reducedMotion = window.matchMedia(reducedMotionQuery);
        const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-landing-reveal]"));
        root.dataset.revealReady = "true";

        if (reducedMotion.matches || !("IntersectionObserver" in window)) {
            revealItems.forEach((item) => {
                item.dataset.visible = "true";
            });
            return () => {
                delete root.dataset.revealReady;
            };
        }

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target as HTMLElement;
                    element.dataset.visible = "true";
                    observer.unobserve(element);
                });
            },
            {
                rootMargin: "0px 0px -12% 0px",
                threshold: 0.08,
            },
        );

        revealItems.forEach((item) => revealObserver.observe(item));

        return () => {
            revealObserver.disconnect();
            delete root.dataset.revealReady;
        };
    }, []);
}
