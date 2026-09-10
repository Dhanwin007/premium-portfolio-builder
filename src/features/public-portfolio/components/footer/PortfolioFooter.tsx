"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/features/profile/types";

interface PortfolioFooterProps {
    profile: Profile;
}

export default function PortfolioFooter({ profile }: PortfolioFooterProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full border-t border-amber-900/40 bg-zinc-950/95 py-12 mt-20 text-center relative overflow-hidden">
            {/* Ambient Aztec Gold Glow Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto px-4 sm:px-6">
                <p className="text-xs font-mono text-zinc-400 tracking-wider">
                    © {new Date().getFullYear()} <span className="font-chicano gold-foil-text text-lg uppercase tracking-wide px-1">{profile.display_name}</span>. ALL RIGHTS RESERVED // EST. 1990.
                </p>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={scrollToTop}
                    className="rounded-lg gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-200 bg-zinc-950 border border-amber-900/40 hover:border-amber-500/60 hover:bg-amber-950/60 transition-all shadow-md"
                >
                    <span>BACK TO TOP</span>
                    <ArrowUp className="h-3.5 w-3.5 text-amber-400" />
                </Button>
            </div>
        </footer>
    );
}
