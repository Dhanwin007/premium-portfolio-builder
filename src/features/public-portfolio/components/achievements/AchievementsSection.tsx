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
        <section id="achievements" className="w-full space-y-8 pt-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b dark:border-zinc-800/80 border-stone-300 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/60 text-red-400 border border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
                    <Trophy className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wider">
                        HONORS &amp; ACHIEVEMENTS
                    </h2>
                    <p className="text-xs font-tech-mono tracking-widest dark:text-zinc-400 text-stone-600 uppercase">
                        HACKATHONS, AWARDS &amp; ENGINEERING MILESTONES
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
                            className="relative overflow-hidden rounded-2xl border dark:border-zinc-800/80 border-stone-300 dark:bg-[#120f0d]/90 bg-white/95 backdrop-blur-xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.9)] hover:border-red-600/60 hover:shadow-[0_15px_40px_rgba(185,28,28,0.2)] transition-all space-y-4 group noir-card"
                        >
                            {/* Accent Glow */}
                            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-red-900/10 blur-2xl pointer-events-none" />

                            <div className="flex items-start justify-between gap-3 relative z-10">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl dark:bg-black bg-stone-100 border dark:border-zinc-800 border-stone-300 text-amber-500 group-hover:border-amber-500/50 transition-all">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wide group-hover:text-red-500 transition-colors leading-snug pt-1">
                                        {item.title}
                                    </h3>
                                </div>

                                {achDate && (
                                    <div className="flex items-center gap-1.5 text-xs font-tech-mono font-bold uppercase tracking-wider text-red-300 dark:bg-black bg-stone-900 px-3 py-1 rounded-xl border border-red-900/60 shrink-0 shadow-sm">
                                        <Calendar className="h-3.5 w-3.5 text-red-400" />
                                        <span>{achDate}</span>
                                    </div>
                                )}
                            </div>

                            {item.description && (
                                <p className="text-xs sm:text-sm dark:text-zinc-300 text-stone-700 whitespace-pre-line leading-relaxed pt-2 border-t dark:border-zinc-800/80 border-stone-200 font-sans">
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

