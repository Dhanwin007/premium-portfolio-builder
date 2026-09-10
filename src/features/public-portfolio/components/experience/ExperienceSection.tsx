"use client";

import { Briefcase, Calendar, MapPin, Building2 } from "lucide-react";
import type { Experience, EmploymentType } from "@/features/experience/types";
import { Badge } from "@/components/ui/badge";

interface ExperienceSectionProps {
    experience: Experience[];
}

const employmentTypeLabels: Record<EmploymentType, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    internship: "Internship",
    contract: "Contract",
    freelance: "Freelance",
    self_employed: "Self-employed",
    temporary: "Temporary",
    volunteer: "Volunteer",
    other: "Other",
};

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

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
    if (!experience || experience.length === 0) {
        return null;
    }

    // Sort by display_order or start_date descending
    const sortedExperience = [...experience].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    return (
        <section id="experience" className="w-full space-y-8 pt-6">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-amber-900/40 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/80 text-amber-400 border border-amber-600/50 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                    <Briefcase className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-3xl sm:text-4xl font-chicano gold-foil-text tracking-wide uppercase">
                        CAREER // WORK_CHRONICLES
                    </h2>
                    <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
                        [PROFESSIONAL ROLES &amp; LOWRIDER SYSTEM ARCHITECTURE // EST. 1990]
                    </p>
                </div>
            </div>

            {/* Timeline List */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-amber-800 before:to-zinc-900">
                {sortedExperience.map((item) => {
                    const startDate = formatDate(item.start_date);
                    const endDate = item.currently_working ? "Present" : formatDate(item.end_date);
                    const dateRange = [startDate, endDate].filter(Boolean).join(" - ");

                    return (
                        <div key={item.id} className="relative group">
                            {/* Timeline Node Icon */}
                            <div className="absolute -left-6 sm:-left-8 top-1.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 border-black bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-amber-950 shadow-[0_0_15px_rgba(217,119,6,0.6)] group-hover:scale-125 transition-transform duration-300">
                                <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            </div>

                            {/* Experience Content Card */}
                            <div className="rounded-2xl border border-amber-900/30 bg-zinc-950/90 backdrop-blur-xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:border-amber-500/50 hover:shadow-[0_12px_35px_rgba(217,119,6,0.2)] transition-all space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <h3 className="text-2xl font-chicano gold-foil-text tracking-wide group-hover:text-amber-300 transition-colors">
                                            {item.position}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-mono font-bold text-amber-400">
                                            <span className="text-amber-300 font-extrabold uppercase">{item.company}</span>
                                            {item.employment_type && (
                                                <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 bg-black text-amber-400/80 border-amber-900/50">
                                                    {employmentTypeLabels[item.employment_type] ?? item.employment_type}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Date Range Badge */}
                                    {dateRange && (
                                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 border border-amber-700/50 w-fit shrink-0 shadow-sm">
                                            <Calendar className="h-3.5 w-3.5 text-amber-500" />
                                            <span>{dateRange}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Location */}
                                {item.location && (
                                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                                        <span>{item.location}</span>
                                    </div>
                                )}

                                {/* Description */}
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
