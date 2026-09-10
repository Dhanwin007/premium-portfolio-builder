"use client";

import { useState } from "react";

interface HeroCoverProps {
    coverUrl: string | null;
    displayName: string;
}

export default function HeroCover({
    coverUrl,
    displayName,
}: HeroCoverProps) {
    const [imageError, setImageError] = useState(false);

    const hasValidCover = coverUrl && !imageError;

    return (
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl dark:border-red-950/40 border-stone-300/80 border group">
            {hasValidCover ? (
                <>
                    <img
                        src={coverUrl}
                        alt={`${displayName}'s portfolio cover`}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover object-center cinematic-img group-hover:scale-105"
                    />
                    {/* Deep Vignette Fade Gradients */}
                    <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-[#080706] dark:via-[#080706]/50 dark:to-black/40 bg-gradient-to-t from-[#f6f3ee] via-[#f6f3ee]/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-[#080706]/80 dark:via-transparent dark:to-[#080706]/80 bg-gradient-to-r from-[#f6f3ee]/50 via-transparent to-[#f6f3ee]/50 pointer-events-none" />
                    
                    {/* Atmospheric Crimson Glow Spill */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-red-900/20 blur-3xl pointer-events-none" />
                </>
            ) : (
                <div className="relative h-full w-full dark:bg-gradient-to-br dark:from-[#0c0a08] dark:via-[#140f0c] dark:to-black bg-gradient-to-br from-amber-100/60 via-stone-200 to-amber-50 overflow-hidden">
                    {/* Crimson & Gold Ambient Light Wells */}
                    <div className="absolute -top-24 left-1/4 h-[400px] w-[400px] rounded-full dark:bg-red-950/30 bg-red-200/40 blur-[130px]" />
                    <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full dark:bg-amber-950/20 bg-amber-200/40 blur-[130px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full dark:bg-red-900/15 bg-rose-200/30 blur-[150px]" />

                    {/* Cybernetic Subtle Tech Grid */}
                    <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

                    {/* Dark Blend Gradient */}
                    <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-[#080706] dark:via-transparent dark:to-black/80 bg-gradient-to-t from-[#f6f3ee] via-transparent to-stone-300/40 pointer-events-none" />
                </div>
            )}
        </div>
    );
}