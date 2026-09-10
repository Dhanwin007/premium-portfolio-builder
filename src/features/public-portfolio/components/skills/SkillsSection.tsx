"use client";

import { Code2, ExternalLink } from "lucide-react";
import type { Skill } from "@/features/skills/types";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
    skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    if (!skills || skills.length === 0) {
        return null;
    }

    return (
        <section id="skills" className="w-full space-y-6 pt-6">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-amber-900/40 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/80 text-amber-400 border border-amber-600/50 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                    <Code2 className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-3xl sm:text-4xl font-chicano gold-foil-text tracking-wide uppercase">
                        TECH_STACK // SYSTEM_EXPERTISE
                    </h2>
                    <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
                        [LANGUAGES, FRAMEWORKS &amp; CYBERNETIC TOOLKITS // EST. 1990]
                    </p>
                </div>
            </div>

            {/* Skills Interactive Tech Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {skills.map((skill) => {
                    const cardContent = (
                        <div className="flex items-center gap-3 p-3.5 px-4 rounded-xl border border-amber-900/30 bg-zinc-950/90 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-amber-500/60 group-hover:shadow-[0_8px_25px_rgba(217,119,6,0.25)] group-hover:bg-zinc-900">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black border border-amber-900/40 group-hover:border-amber-500/60 group-hover:bg-amber-950/60 group-hover:scale-110 transition-all">
                                {skill.icon ? (
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="h-5 w-5 object-contain filter brightness-110"
                                        onError={(e) => {
                                            (e.target as HTMLElement).style.display = "none";
                                        }}
                                    />
                                ) : (
                                    <Code2 className="h-4 w-4 text-amber-400" />
                                )}
                            </div>
                            
                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="font-mono font-bold text-xs sm:text-sm text-zinc-200 group-hover:text-amber-300 truncate transition-colors">
                                    {skill.name}
                                </span>
                            </div>

                            {skill.website && (
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors shrink-0" />
                            )}
                        </div>
                    );

                    return skill.website ? (
                        <a
                            key={skill.technology_id}
                            href={skill.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            {cardContent}
                        </a>
                    ) : (
                        <div key={skill.technology_id} className="group block">
                            {cardContent}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}