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
        <footer className="w-full border-t dark:border-zinc-800/80 border-stone-300 dark:bg-[#080706] bg-stone-100 py-12 mt-20 text-center relative overflow-hidden">
            {/* Crimson Ambient Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-600/70 to-transparent" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto px-4 sm:px-6">
                <p className="text-xs font-tech-mono dark:text-zinc-400 text-stone-600 tracking-wider">
                    © {new Date().getFullYear()} <span className="font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-widest px-1">{profile.display_name}</span>. ALL RIGHTS RESERVED.
                </p>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={scrollToTop}
                    className="rounded-xl gap-2 text-xs font-tech-mono font-bold uppercase tracking-wider dark:text-zinc-300 text-stone-800 dark:hover:text-white hover:text-stone-950 dark:bg-black bg-stone-200/80 border dark:border-zinc-800 border-stone-300 hover:border-red-900/60 dark:hover:bg-red-950/40 hover:bg-stone-300 transition-all shadow-md"
                >
                    <span>BACK TO TOP</span>
                    <ArrowUp className="h-3.5 w-3.5 text-red-500" />
                </Button>
            </div>
        </footer>
    );
}

