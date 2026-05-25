import { LogoMark } from "@/components/brand/LogoMark";

type BrandMarkProps = {
    compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
    return (
        <div className="flex items-center gap-2.5">
            <LogoMark className={compact ? "h-8 w-8" : "h-9 w-9"} />
            {!compact && <span className="text-lg font-black tracking-tight">Sapphire</span>}
        </div>
    );
}
