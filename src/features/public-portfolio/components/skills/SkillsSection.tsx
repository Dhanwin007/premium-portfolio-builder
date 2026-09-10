"use client";

import { Code2, ExternalLink, Terminal } from "lucide-react";
import type { Skill } from "@/features/skills/types";

interface SkillsSectionProps {
    skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    if (!skills || skills.length === 0) {
        return null;
    }

    return (
        <section id="skills" className="w-full space-y-8 pt-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b dark:border-zinc-800/80 border-stone-300 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/60 text-red-400 border border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
                    <Terminal className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wider">
                        TECH STACK &amp; CAPABILITIES
                    </h2>
                    <p className="text-xs font-tech-mono tracking-widest dark:text-zinc-400 text-stone-600 uppercase">
                        LANGUAGES, FRAMEWORKS &amp; SYSTEM TOOLKITS
                    </p>
                </div>
            </div>

            {/* Interactive Tech Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {skills.map((skill) => {
                    const cardContent = (
                        <div className="flex items-center gap-3.5 p-3.5 px-4 rounded-2xl border dark:border-zinc-800/80 border-stone-300 dark:bg-[#120f0d]/90 bg-white/95 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-red-600/60 group-hover:shadow-[0_10px_25px_rgba(185,28,28,0.25)] dark:group-hover:bg-[#181411] group-hover:bg-stone-50">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl dark:bg-black bg-stone-100 border dark:border-zinc-800 border-stone-300 group-hover:border-red-600/50 group-hover:bg-red-950/40 group-hover:scale-110 transition-all">
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
                                    <Code2 className="h-4 w-4 text-red-400" />
                                )}
                            </div>
                            
                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="font-tech-mono font-bold text-xs sm:text-sm dark:text-zinc-200 text-stone-800 group-hover:text-red-500 truncate transition-colors">
                                    {skill.name}
                                </span>
                            </div>

                            {skill.website && (
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-red-400 transition-colors shrink-0" />
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