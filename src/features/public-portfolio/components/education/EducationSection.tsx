"use client";

import { GraduationCap, Calendar, Award } from "lucide-react";
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
        <section id="education" className="w-full space-y-8 pt-6">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-amber-900/40 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/80 text-amber-400 border border-amber-600/50 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                    <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-3xl sm:text-4xl font-chicano gold-foil-text tracking-wide uppercase">
                        ACADEMIA // DEGREES_&amp;_HONORS
                    </h2>
                    <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
                        [UNIVERSITIES, DEGREES &amp; DIPLOMA RECORDS // EST. 1990]
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
                            className="flex flex-col justify-between rounded-2xl border border-amber-900/30 bg-zinc-950/90 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:border-amber-500/50 hover:shadow-[0_10px_30px_rgba(217,119,6,0.2)] transition-all space-y-4 group"
                        >
                            <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-chicano gold-foil-text tracking-wide group-hover:text-amber-300 transition-colors">
                                            {item.institution}
                                        </h3>
                                        <p className="text-xs font-mono font-bold text-amber-400">
                                            {item.degree} {item.field ? `in ${item.field}` : ""}
                                        </p>
                                    </div>
                                    {item.grade && (
                                        <Badge variant="secondary" className="bg-amber-950/80 text-amber-300 font-mono font-bold text-xs border border-amber-600/50 uppercase tracking-wider shrink-0 px-3 py-1 rounded-lg">
                                            Grade: {item.grade}
                                        </Badge>
                                    )}
                                </div>

                                {dateRange && (
                                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                                        <Calendar className="h-3.5 w-3.5 text-amber-500" />
                                        <span>{dateRange}</span>
                                    </div>
                                )}

                                {item.description && (
                                    <p className="text-xs sm:text-sm text-zinc-300 whitespace-pre-line leading-relaxed border-t border-amber-900/30 pt-3 font-sans">
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
