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
        <section id="experience" className="w-full space-y-8 pt-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b dark:border-zinc-800/80 border-stone-300 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/60 text-red-400 border border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
                    <Briefcase className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wider">
                        WORK CHRONICLES &amp; EXPERIENCE
                    </h2>
                    <p className="text-xs font-tech-mono tracking-widest dark:text-zinc-400 text-stone-600 uppercase">
                        PROFESSIONAL ROLES &amp; ENGINEERING LEADERSHIP
                    </p>
                </div>
            </div>

            {/* Timeline List */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-red-600 before:via-red-950 before:to-zinc-900">
                {sortedExperience.map((item) => {
                    const startDate = formatDate(item.start_date);
                    const endDate = item.currently_working ? "Present" : formatDate(item.end_date);
                    const dateRange = [startDate, endDate].filter(Boolean).join(" - ");

                    return (
                        <div key={item.id} className="relative group">
                            {/* Timeline Node Icon */}
                            <div className="absolute -left-6 sm:-left-8 top-1.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br from-red-700 to-red-950 text-white shadow-[0_0_15px_rgba(220,38,38,0.6)] group-hover:scale-125 transition-transform duration-300">
                                <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            </div>

                            {/* Experience Content Card */}
                            <div className="rounded-2xl border dark:border-zinc-800/80 border-stone-300 dark:bg-[#120f0d]/90 bg-white/95 backdrop-blur-xl p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.9)] hover:border-red-600/60 hover:shadow-[0_15px_40px_rgba(185,28,28,0.2)] transition-all space-y-4 noir-card">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="space-y-1">
                                        <h3 className="text-xl sm:text-2xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wide group-hover:text-red-500 transition-colors">
                                            {item.position}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2 text-xs font-tech-mono font-semibold text-red-500">
                                            <span className="dark:text-zinc-200 text-stone-800 font-bold uppercase">{item.company}</span>
                                            {item.employment_type && (
                                                <Badge variant="outline" className="text-[10px] font-tech-mono font-bold uppercase tracking-wider py-0.5 px-2 dark:bg-black bg-stone-100 dark:text-zinc-400 text-stone-600 border dark:border-zinc-800 border-stone-300">
                                                    {employmentTypeLabels[item.employment_type] ?? item.employment_type}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Date Range Badge */}
                                    {dateRange && (
                                        <div className="inline-flex items-center gap-1.5 rounded-xl dark:bg-black bg-stone-900 px-3.5 py-1.5 text-xs font-tech-mono font-bold uppercase tracking-wider text-red-300 border border-red-900/50 w-fit shrink-0 shadow-sm">
                                            <Calendar className="h-3.5 w-3.5 text-red-400" />
                                            <span>{dateRange}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Location */}
                                {item.location && (
                                    <div className="flex items-center gap-1.5 text-xs font-tech-mono dark:text-zinc-400 text-stone-600">
                                        <MapPin className="h-3.5 w-3.5 text-red-500" />
                                        <span>{item.location}</span>
                                    </div>
                                )}

                                {/* Description */}
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

