import { Gem } from "lucide-react";
import { primaryGradient } from "./landingStyles";

type BrandMarkProps = {
    compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
    return (
        <div className="flex items-center gap-2.5">
            <div
                className="flex h-8 w-8 items-center justify-center rounded-lg shadow-md shadow-primary/30"
                style={{ background: primaryGradient }}
            >
                <Gem className="h-4 w-4 text-white" />
            </div>
            {!compact && <span className="text-lg font-black tracking-tight">Sapphire</span>}
        </div>
    );
}
