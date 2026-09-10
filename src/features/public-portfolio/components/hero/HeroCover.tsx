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
        <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-600/40 transition-all duration-500 group chicano-border-gold">
            {hasValidCover ? (
                <>
                    <img
                        src={coverUrl}
                        alt={`${displayName}'s portfolio cover banner`}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover object-center sepia-vintage-img transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* 90s Vintage Lowrider Sepia Vignettes & Golden Ambient Glows */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/60 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0806]/80 via-transparent to-[#0a0806]/80 pointer-events-none" />
                    
                    {/* Golden Aztec Ambient Glow */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-amber-600/20 blur-3xl pointer-events-none" />
                </>
            ) : (
                <div className="relative h-full w-full bg-gradient-to-br from-[#0c0906] via-zinc-950 to-black overflow-hidden">
                    {/* Lowrider Gold Nebulae */}
                    <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-amber-600/20 blur-[110px]" />
                    <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-red-900/20 blur-[110px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-amber-700/15 blur-[130px]" />

                    {/* Cybernetic Tech Grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

                    {/* Dramatic Dark Blend Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-black/70 pointer-events-none" />
                </div>
            )}
        </div>
    );
}