"use client";

import { MapPin, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile, PortfolioStatus } from "@/features/profile/types";
import type { Location } from "@/features/location/types";
import type { PortfolioSettings } from "@/features/portfolio-settings/types";

interface HeroProfileProps {
    profile: Profile;
    location: Location | null;
    portfolioSettings: PortfolioSettings | null;
}

const statusConfig: Record<PortfolioStatus, { label: string; dot: string; style: string }> = {
    available: {
        label: "Available for Hire",
        dot: "bg-emerald-500 animate-pulse",
        style: "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
    },
    open_to_work: {
        label: "Open to Work",
        dot: "bg-emerald-500 animate-pulse",
        style: "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
    },
    open_to_internship: {
        label: "Open to Internship",
        dot: "bg-blue-500 animate-pulse",
        style: "bg-blue-950/60 text-blue-300 border-blue-800/50",
    },
    freelancing: {
        label: "Available for Freelance",
        dot: "bg-amber-500 animate-pulse",
        style: "bg-amber-950/60 text-amber-300 border-amber-800/50",
    },
    busy: {
        label: "Currently Busy",
        dot: "bg-red-500",
        style: "bg-red-950/60 text-red-300 border-red-800/50",
    },
};

export default function HeroProfile({
    profile,
    location,
    portfolioSettings,
}: HeroProfileProps) {
    const statusInfo = statusConfig[profile.current_status] ?? {
        label: profile.current_status,
        dot: "bg-red-500 animate-pulse",
        style: "bg-red-950/80 text-red-300 border-red-800/60",
    };

    const showLocation = portfolioSettings?.show_location && location;
    const formattedLocation = showLocation
        ? [location.city, location.state, location.country].filter(Boolean).join(", ")
        : null;

    const mapUrl = showLocation
        ? location.latitude !== null && location.latitude !== undefined && location.longitude !== null && location.longitude !== undefined
            ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
            : formattedLocation
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedLocation)}`
            : null
        : null;

    return (
        <div className="relative -mt-24 sm:-mt-32 md:-mt-36 flex flex-col items-center text-center px-3 sm:px-6 z-20">
            {/* Charcoal & Crimson Smoked Profile Stage Card */}
            <div className="w-full max-w-4xl rounded-3xl dark:bg-[#120f0d]/90 bg-white/95 backdrop-blur-2xl border dark:border-red-950/50 border-stone-300 shadow-xl dark:shadow-[0_30px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 md:p-10 flex flex-col items-center relative overflow-hidden group noir-card">
                
                {/* Tech Status Pill Header */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-6 flex items-center gap-2 font-tech-mono text-[10px] sm:text-xs dark:text-red-500/80 text-red-700/90 tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>DEV_DOSSIER // ARCHITECTURE</span>
                </div>

                {/* Subtle Crimson Radial Glow Background */}
                <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[550px] h-60 dark:bg-red-950/20 bg-red-100/30 blur-3xl pointer-events-none" />

                {/* Integrated Avatar Portrait */}
                <div className="relative group/avatar mb-4 mt-3 sm:mt-1">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-red-800 opacity-60 blur-md group-hover/avatar:opacity-100 transition duration-700 animate-pulse" />
                    <Avatar className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 border-2 border-red-600/70 shadow-[0_0_35px_rgba(185,28,28,0.4)] transition-transform duration-500 group-hover/avatar:scale-105">
                        <AvatarImage
                            src={profile.avatar_url ?? ""}
                            alt={profile.display_name}
                            className="object-cover cinematic-img"
                        />
                        <AvatarFallback className="text-4xl font-cinematic bg-gradient-to-br from-red-950 to-zinc-950 text-zinc-100">
                            {profile.display_name?.charAt(0).toUpperCase() ?? "P"}
                        </AvatarFallback>
                    </Avatar>

                    {/* Active Status Indicator Medallion */}
                    <div className="absolute bottom-1 right-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full dark:bg-[#080706] bg-white p-1 shadow-2xl border border-red-600/80">
                        <div className={`h-full w-full rounded-full ${statusInfo.dot}`} />
                    </div>
                </div>

                {/* Profile Detail Content */}
                <div className="max-w-3xl space-y-4 w-full">
                    
                    {/* Status Badge */}
                    <div>
                        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-tech-mono font-semibold uppercase tracking-wider backdrop-blur-md shadow-md ${statusInfo.style}`}>
                            <span className={`inline-block h-2 w-2 rounded-full ${statusInfo.dot}`} />
                            <span>{statusInfo.label}</span>
                        </div>
                    </div>

                    {/* Bold Cinematic Display Name */}
                    <h1 className="font-cinematic text-4xl sm:text-6xl md:text-7xl dark:text-zinc-100 text-stone-900 font-extrabold uppercase tracking-tight leading-none py-1 drop-shadow-2xl">
                        {profile.display_name}
                    </h1>

                    {/* Username & Headline */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 dark:text-zinc-300 text-stone-700 text-sm sm:text-base font-medium tracking-wide">
                        <span className="dark:text-red-400 text-red-600 font-tech-mono font-bold">@{profile.username}</span>
                        {profile.headline && (
                            <>
                                <span className="text-red-600">•</span>
                                <span className="dark:text-zinc-300 text-stone-700 font-normal">{profile.headline}</span>
                            </>
                        )}
                    </div>

                    {/* Location Badge */}
                    {formattedLocation && (
                        mapUrl ? (
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm dark:text-zinc-400 text-stone-600 dark:hover:text-red-400 hover:text-red-600 transition-colors hover:underline cursor-pointer group/loc pt-1 font-tech-mono"
                                title="Open location on Google Maps"
                            >
                                <MapPin className="h-4 w-4 text-red-500 group-hover/loc:scale-110 transition-transform" />
                                <span>{formattedLocation}</span>
                            </a>
                        ) : (
                            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm dark:text-zinc-400 text-stone-600 pt-1 font-tech-mono">
                                <MapPin className="h-4 w-4 text-red-500" />
                                <span>{formattedLocation}</span>
                            </div>
                        )
                    )}

                    {/* Bio */}
                    {profile.bio && (
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base dark:text-zinc-300 text-stone-700 leading-relaxed font-normal border-t dark:border-zinc-800/80 border-stone-200 pt-4 italic">
                            "{profile.bio}"
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}