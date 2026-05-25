import { gradientText } from "./landingStyles";

type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    accent: string;
    description?: string;
    inverted?: boolean;
};

export function SectionHeading({
    eyebrow,
    title,
    accent,
    description,
    inverted = false,
}: SectionHeadingProps) {
    return (
        <div data-landing-reveal className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
                {eyebrow}
            </p>
            <h2
                className={`text-3xl font-black tracking-tight sm:text-5xl ${
                    inverted ? "text-white" : ""
                }`}
            >
                {title} <span style={gradientText}>{accent}</span>
            </h2>
            {description && (
                <p className={`text-lg leading-relaxed ${inverted ? "text-white/60" : "text-muted-foreground"}`}>
                    {description}
                </p>
            )}
        </div>
    );
}
