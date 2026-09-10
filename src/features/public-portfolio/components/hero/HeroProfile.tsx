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
        style: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    open_to_work: {
        label: "Open to Work",
        dot: "bg-emerald-500 animate-pulse",
        style: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    open_to_internship: {
        label: "Open to Internship",
        dot: "bg-blue-500 animate-pulse",
        style: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    freelancing: {
        label: "Available for Freelance",
        dot: "bg-purple-500 animate-pulse",
        style: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    },
    busy: {
        label: "Currently Busy",
        dot: "bg-amber-500",
        style: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
};

export default function HeroProfile({
    profile,
    location,
    portfolioSettings,
}: HeroProfileProps) {
    const statusInfo = statusConfig[profile.current_status] ?? {
        label: profile.current_status,
        dot: "bg-amber-500 animate-pulse",
        style: "bg-amber-950/80 text-amber-300 border-amber-600/60",
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
        <div className="relative -mt-24 sm:-mt-32 md:-mt-36 flex flex-col items-center text-center px-2 sm:px-4 z-20">
            {/* Main Layered Vintage Leather & Gold Smoked Card */}
            <div className="w-full max-w-4xl rounded-3xl bg-[#0f0c09]/90 backdrop-blur-2xl border-2 border-amber-600/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 md:p-10 flex flex-col items-center relative overflow-hidden group chicano-border-gold">
                
                {/* California Tech Cyber Badge Header */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-6 flex items-center gap-2 font-tech-mono text-[10px] sm:text-xs text-amber-500/80 tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                    <span>CA_TECH // EST. 1990</span>
                </div>

                {/* Background Aztec Gold Spotlight Light */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-56 bg-amber-600/15 blur-3xl pointer-events-none" />

                {/* Avatar with Lowrider Gold Medallion Frame */}
                <div className="relative group/avatar mb-4 mt-2 sm:mt-0">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 via-red-600 to-amber-600 opacity-70 blur-md group-hover/avatar:opacity-100 transition duration-700 animate-pulse" />
                    <Avatar className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 border-4 border-amber-500/80 shadow-[0_0_35px_rgba(217,119,6,0.4)] transition-transform duration-500 group-hover/avatar:scale-105">
                        <AvatarImage
                            src={profile.avatar_url ?? ""}
                            alt={profile.display_name}
                            className="object-cover sepia-vintage-img"
                        />
                        <AvatarFallback className="text-4xl font-chicano bg-gradient-to-br from-amber-950 to-zinc-950 text-amber-400">
                            {profile.display_name?.charAt(0).toUpperCase() ?? "P"}
                        </AvatarFallback>
                    </Avatar>

                    {/* Active Status Medallion Indicator */}
                    <div className="absolute bottom-1 right-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-zinc-950 p-1 shadow-2xl border-2 border-amber-500">
                        <div className={`h-full w-full rounded-full ${statusInfo.dot}`} />
                    </div>
                </div>

                {/* Profile Information Block */}
                <div className="max-w-3xl space-y-4 w-full">
                    
                    {/* Lowrider Status Badge */}
                    <div>
                        <div className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg ${statusInfo.style}`}>
                            <span className={`inline-block h-2 w-2 rounded-full ${statusInfo.dot}`} />
                            <span className="font-tech-mono">{statusInfo.label}</span>
                        </div>
                    </div>

                    {/* 90s Chicano Lowrider Gothic Display Name */}
                    <h1 className="font-chicano text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-amber-400 gold-foil-text leading-none py-1">
                        {profile.display_name}
                    </h1>

                    {/* Headline & Username */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-zinc-300 text-sm sm:text-base font-semibold tracking-wide">
                        <span className="text-amber-400 font-tech-mono font-bold">@{profile.username}</span>
                        {profile.headline && (
                            <>
                                <span className="text-red-600">•</span>
                                <span className="text-amber-100/90 font-medium">{profile.headline}</span>
                            </>
                        )}
                    </div>

                    {/* Location with Google Maps link */}
                    {formattedLocation && (
                        mapUrl ? (
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-amber-400 transition-colors hover:underline cursor-pointer group/loc pt-1 font-tech-mono"
                                title="Open location on Google Maps"
                            >
                                <MapPin className="h-4 w-4 text-amber-500 group-hover/loc:scale-110 transition-transform" />
                                <span>{formattedLocation}</span>
                            </a>
                        ) : (
                            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-zinc-400 pt-1 font-tech-mono">
                                <MapPin className="h-4 w-4 text-amber-500" />
                                <span>{formattedLocation}</span>
                            </div>
                        )
                    )}

                    {/* Bio */}
                    {profile.bio && (
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 leading-relaxed font-normal border-t border-amber-900/40 pt-4 italic">
                            "{profile.bio}"
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}