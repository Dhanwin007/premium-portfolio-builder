"use client";

import { GraduationCap, Calendar } from "lucide-react";
import type { Education } from "@/features/education/types";
import { Badge } from "@/components/ui/badge";

interface EducationSectionProps {
    education: Education[];
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

export default function EducationSection({ education }: EducationSectionProps) {
    if (!education || education.length === 0) {
        return null;
    }

    const sortedEducation = [...education].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    return (
        <section id="education" className="w-full space-y-8 pt-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b dark:border-zinc-800/80 border-stone-300 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/60 text-red-400 border border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
                    <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wider">
                        ACADEMIC DEGREES &amp; EDUCATION
                    </h2>
                    <p className="text-xs font-tech-mono tracking-widest dark:text-zinc-400 text-stone-600 uppercase">
                        UNIVERSITIES &amp; ACADEMIC RECORD
                    </p>
                </div>
            </div>

            {/* Education Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedEducation.map((item) => {
                    const startDate = formatDate(item.start_date);
                    const endDate = formatDate(item.end_date);
                    const dateRange = [startDate, endDate].filter(Boolean).join(" - ");

                    return (
                        <div
                            key={item.id}
                            className="flex flex-col justify-between rounded-2xl border dark:border-zinc-800/80 border-stone-300 dark:bg-[#120f0d]/90 bg-white/95 backdrop-blur-xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.9)] hover:border-red-600/60 hover:shadow-[0_15px_40px_rgba(185,28,28,0.2)] transition-all space-y-4 group noir-card"
                        >
                            <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <h3 className="text-xl sm:text-2xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wide group-hover:text-red-500 transition-colors">
                                            {item.institution}
                                        </h3>
                                        <p className="text-xs font-tech-mono font-bold text-red-500">
                                            {item.degree} {item.field ? `in ${item.field}` : ""}
                                        </p>
                                    </div>
                                    {item.grade && (
                                        <Badge variant="secondary" className="bg-red-950/80 text-red-300 font-tech-mono font-bold text-xs border border-red-800/60 uppercase tracking-wider shrink-0 px-3 py-1 rounded-xl">
                                            Grade: {item.grade}
                                        </Badge>
                                    )}
                                </div>

                                {dateRange && (
                                    <div className="flex items-center gap-1.5 text-xs font-tech-mono dark:text-zinc-400 text-stone-600">
                                        <Calendar className="h-3.5 w-3.5 text-red-500" />
                                        <span>{dateRange}</span>
                                    </div>
                                )}

                                {item.description && (
                                    <p className="text-xs sm:text-sm dark:text-zinc-300 text-stone-700 whitespace-pre-line leading-relaxed border-t dark:border-zinc-800/80 border-stone-200 pt-3 font-sans">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

