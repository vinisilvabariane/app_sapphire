import logoMark from "../../../img/logo-sem-fundo.png";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
    className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
    return (
        <img
            src={logoMark}
            alt=""
            aria-hidden="true"
            className={cn("shrink-0 object-contain", className)}
            draggable={false}
        />
    );
}
