"use client";

import { Trophy, Calendar, Sparkles } from "lucide-react";
import type { Achievement } from "@/features/achievements/types";

interface AchievementsSectionProps {
    achievements: Achievement[];
}

function formatDate(dateStr: string | null): string {
    if (!dateStr) return "";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
        return dateStr;
    }
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
    if (!achievements || achievements.length === 0) {
        return null;
    }

    const sortedAchievements = [...achievements].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    return (
        <section id="achievements" className="w-full space-y-8 pt-6">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-amber-900/40 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-950 to-yellow-950 text-amber-400 border border-amber-600/50 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                    <Trophy className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-3xl sm:text-4xl font-chicano gold-foil-text tracking-wide uppercase">
                        HONORS // GOLD_MEDALLIONS
                    </h2>
                    <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
                        [HACKATHON WINS, RECOGNITIONS &amp; MAJOR MILESTONES // EST. 1990]
                    </p>
                </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sortedAchievements.map((item) => {
                    const achDate = formatDate(item.achievement_date);

                    return (
                        <div
                            key={item.id}
                            className="relative overflow-hidden rounded-2xl border border-amber-600/40 bg-zinc-950/90 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:border-amber-400 hover:shadow-[0_12px_35px_rgba(217,119,6,0.25)] transition-all space-y-4 group"
                        >
                            {/* Background Radial Glow */}
                            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

                            <div className="flex items-start justify-between gap-3 relative z-10">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-300 shadow-sm group-hover:scale-110 transition-transform">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-chicano gold-foil-text tracking-wide group-hover:text-amber-300 transition-colors leading-snug pt-1">
                                        {item.title}
                                    </h3>
                                </div>

                                {achDate && (
                                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-300 bg-black px-3 py-1 rounded-lg border border-amber-600/50 shrink-0 shadow-sm">
                                        <Calendar className="h-3.5 w-3.5 text-amber-400" />
                                        <span>{achDate}</span>
                                    </div>
                                )}
                            </div>

                            {item.description && (
                                <p className="text-xs sm:text-sm text-zinc-300 whitespace-pre-line leading-relaxed pl-13 pt-1 border-t border-amber-900/30 font-sans">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
