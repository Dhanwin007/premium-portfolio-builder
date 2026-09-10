"use client";

import { useState } from "react";
import { Star, ExternalLink, Info, Play } from "lucide-react";
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
        <div className={`group flex flex-col overflow-hidden rounded-2xl border bg-zinc-950/90 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(217,119,6,0.2)] ${
            project.featured
                ? "border-amber-500/70 shadow-[0_0_25px_rgba(217,119,6,0.2)] hover:border-amber-400"
                : "border-amber-900/30 hover:border-amber-500/50"
        }`}>
            {/* Image Thumbnail Header */}
            <div 
                className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer group"
                onClick={() => onSelectProject(project)}
            >
                {coverImage && !imgError ? (
                    <img
                        src={coverImage}
                        alt={project.title}
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover sepia-vintage-img transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-black via-amber-950/30 to-black text-amber-500 p-6 text-center">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                            [DOSSIER_FILE // {project.title}]
                        </span>
                    </div>
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                {/* Hover Info Trigger */}
                <div className="absolute inset-0 bg-amber-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 bg-black/90 px-3 py-1.5 rounded-lg border border-amber-500/50 shadow-lg">
                        <Info className="h-3.5 w-3.5 text-amber-400" />
                        INSPECT DOSSIER
                    </span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap z-10">
                    {project.featured && (
                        <Badge className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-amber-100 border border-amber-300/60 gap-1 text-[10px] font-mono font-black uppercase tracking-wider shadow-lg">
                            <Star className="h-3 w-3 fill-current text-yellow-200" />
                            GOLD REEL
                        </Badge>
                    )}
                    {project.demo_video_url && (
                        <Badge variant="secondary" className="bg-black/90 text-amber-400 border border-amber-700/50 gap-1 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                            <Play className="h-3 w-3 fill-current" />
                            VHS_PLAY
                        </Badge>
                    )}
                </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                <div className="space-y-2">
                    <h3 
                        className="text-2xl font-chicano gold-foil-text tracking-wide group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                        onClick={() => onSelectProject(project)}
                    >
                        {project.title}
                    </h3>

                    {project.short_description && (
                        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed font-sans">
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
                                className="inline-flex items-center rounded-md bg-zinc-900 px-2 py-0.5 text-[10px] font-mono font-semibold text-amber-300/90 border border-amber-900/40"
                            >
                                {tech.name}
                            </span>
                        ))}
                        {remainingTechCount > 0 && (
                            <span className="inline-flex items-center rounded-md bg-amber-950/70 px-2 py-0.5 text-[10px] font-mono font-semibold text-amber-400 border border-amber-600/40">
                                +{remainingTechCount}
                            </span>
                        )}
                    </div>
                )}

                {/* Footer Links & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-amber-900/30">
                    <div className="flex items-center gap-1.5">
                        {githubHref && (
                            <a
                                href={githubHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-400/70 hover:text-amber-200 transition-colors p-2 hover:bg-amber-950/40 rounded-lg border border-transparent hover:border-amber-700/40"
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
                                className="text-amber-400/70 hover:text-amber-200 transition-colors p-2 hover:bg-amber-950/40 rounded-lg border border-transparent hover:border-amber-700/40"
                                aria-label="Live Demo"
                            >
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSelectProject(project)}
                        className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-100 hover:bg-amber-950/80 border border-amber-600/40 rounded-lg h-9 px-4 transition-all"
                    >
                        DOSSIER &rarr;
                    </Button>
                </div>
            </div>
        </div>
    );
}
