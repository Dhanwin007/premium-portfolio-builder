"use client";

import { useState } from "react";
import { Star, ExternalLink, Info, Play, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/features/projects/types";

interface PublicProjectCardProps {
    project: Project;
    onSelectProject: (project: Project) => void;
}

function formatExternalUrl(url: string | null | undefined): string {
    if (!url) return "#";
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }
    return `https://${trimmed}`;
}

export default function PublicProjectCard({
    project,
    onSelectProject,
}: PublicProjectCardProps) {
    const [imgError, setImgError] = useState(false);

    const coverImage = project.media && project.media.length > 0 ? project.media[0].image_url : null;
    const maxVisibleTech = 4;
    const visibleTech = project.technologies?.slice(0, maxVisibleTech) ?? [];
    const remainingTechCount = (project.technologies?.length ?? 0) - maxVisibleTech;

    const githubHref = project.github_url ? formatExternalUrl(project.github_url) : null;
    const liveDemoHref = project.live_demo_url ? formatExternalUrl(project.live_demo_url) : null;

    return (
        <div 
            onClick={() => onSelectProject(project)}
            className={`group flex flex-col overflow-hidden rounded-2xl border dark:bg-[#120f0d]/90 bg-white/95 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer noir-card ${
                project.featured
                    ? "border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-400"
                    : "dark:border-zinc-800/80 border-stone-300 hover:border-red-600/60"
            }`}
        >
            {/* Image Thumbnail Header */}
            <div className="relative aspect-video w-full overflow-hidden bg-black group">
                {coverImage && !imgError ? (
                    <img
                        src={coverImage}
                        alt={project.title}
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover cinematic-img transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full dark:bg-gradient-to-br dark:from-black dark:via-[#18120e] dark:to-black bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 dark:text-zinc-400 text-stone-600 p-6 text-center">
                        <FolderGit2 className="h-8 w-8 text-red-500/70 mb-2" />
                        <span className="text-xs font-tech-mono font-bold uppercase tracking-widest dark:text-zinc-300 text-stone-700">
                            {project.title}
                        </span>
                    </div>
                )}

                {/* Vignette Overlay */}
                <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-[#120f0d] dark:via-black/30 dark:to-transparent bg-gradient-to-t from-white via-white/30 to-transparent pointer-events-none" />

                {/* Hover Trigger */}
                <div className="absolute inset-0 bg-red-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    <span className="text-[11px] font-tech-mono font-bold uppercase tracking-wider text-red-300 flex items-center gap-1.5 bg-black/90 px-3 py-1.5 rounded-xl border border-red-600/50 shadow-lg">
                        <Info className="h-3.5 w-3.5 text-red-400" />
                        INSPECT DOSSIER
                    </span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap z-10">
                    {project.featured && (
                        <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-amber-950 border border-amber-300/80 gap-1 text-[10px] font-tech-mono font-bold uppercase tracking-wider shadow-lg">
                            <Star className="h-3 w-3 fill-current text-amber-950" />
                            FEATURED
                        </Badge>
                    )}
                    {project.demo_video_url && (
                        <Badge variant="secondary" className="bg-black/90 text-red-400 border border-red-800/60 gap-1 text-[10px] font-tech-mono font-bold uppercase tracking-wider shadow-md">
                            <Play className="h-3 w-3 fill-current" />
                            DEMO REEL
                        </Badge>
                    )}
                </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wide group-hover:text-red-500 transition-colors line-clamp-1">
                        {project.title}
                    </h3>

                    {project.short_description && (
                        <p className="text-xs sm:text-sm dark:text-zinc-400 text-stone-600 line-clamp-2 leading-relaxed font-sans">
                            {project.short_description}
                        </p>
                    )}
                </div>

                {/* Technologies List */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {visibleTech.map((tech) => (
                            <span
                                key={tech.id}
                                className="inline-flex items-center rounded-md dark:bg-black bg-stone-100 px-2.5 py-1 text-[10px] font-tech-mono font-medium dark:text-zinc-300 text-stone-800 border dark:border-zinc-800 border-stone-300"
                            >
                                {tech.name}
                            </span>
                        ))}
                        {remainingTechCount > 0 && (
                            <span className="inline-flex items-center rounded-md bg-red-950/70 px-2 py-1 text-[10px] font-tech-mono font-bold text-red-300 border border-red-800/50">
                                +{remainingTechCount}
                            </span>
                        )}
                    </div>
                )}

                {/* Footer Links & Actions */}
                <div className="flex items-center justify-between pt-4 border-t dark:border-zinc-800/60 border-stone-200">
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {githubHref && (
                            <a
                                href={githubHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dark:text-zinc-400 text-stone-600 dark:hover:text-white hover:text-stone-900 transition-colors p-2 dark:hover:bg-zinc-900 hover:bg-stone-100 rounded-lg border border-transparent dark:hover:border-zinc-800 hover:border-stone-300"
                                aria-label="GitHub Repository"
                            >
                                <FaGithub className="h-4 w-4" />
                            </a>
                        )}
                        {liveDemoHref && (
                            <a
                                href={liveDemoHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dark:text-zinc-400 text-stone-600 dark:hover:text-white hover:text-stone-900 transition-colors p-2 dark:hover:bg-zinc-900 hover:bg-stone-100 rounded-lg border border-transparent dark:hover:border-zinc-800 hover:border-stone-300"
                                aria-label="Live Demo"
                            >
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                        }}
                        className="text-xs font-tech-mono font-bold uppercase tracking-wider text-red-500 hover:text-white dark:hover:bg-red-950/80 hover:bg-red-600 border border-red-900/60 rounded-xl h-9 px-4 transition-all"
                    >
                        DOSSIER &rarr;
                    </Button>
                </div>
            </div>
        </div>
    );
}

