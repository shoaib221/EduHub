import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface LogoProps {
    href?: string;
    showText?: boolean;
    className?: string;
}

export default function Logo({
    href = "/",
    showText = true,
    className = "",
}: LogoProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-3 ${className}`}
        >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color3) text-(--color1) shadow-md">
                <GraduationCap className="h-6 w-6" />
            </div>

            {showText && (
                <div className="leading-tight">
                    <h1 className="text-xl font-bold tracking-tight text-(--color3)">
                        EduHub
                    </h1>

                    <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                        Learn • Grow • Succeed
                    </p>
                </div>
            )}
        </Link>
    );
}