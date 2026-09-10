"use client";

import { useState, useEffect } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Play, ChevronLeft, ChevronRight, X, Code2, Film, Layers, FileCode } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/features/projects/types";

interface ProjectDetailsDialogProps {
    project: Project | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function formatExternalUrl(url: string | null | undefined): string {
    if (!url) return "#";
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }
    return `https://${trimmed}`;
}

export default function ProjectDetailsDialog({
    project,
    open,
    onOpenChange,
}: ProjectDetailsDialogProps) {
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    useEffect(() => {
        if (open) {
            setSelectedMediaIndex(0);
        }
    }, [open, project?.id]);

    if (!project) return null;

    const mediaList = project.media && Array.isArray(project.media) ? project.media : [];
    const hasMedia = mediaList.length > 0;
    const currentMedia = hasMedia ? mediaList[selectedMediaIndex] : null;
    const currentImage = currentMedia?.image_url || null;

    const technologies = project.technologies && Array.isArray(project.technologies) ? project.technologies : [];
    const githubHref = project.github_url ? formatExternalUrl(project.github_url) : null;
    const liveDemoHref = project.live_demo_url ? formatExternalUrl(project.live_demo_url) : null;
    const demoVideoUrl = project.demo_video_url ? formatExternalUrl(project.demo_video_url) : null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl max-h-[88vh] overflow-y-auto p-5 sm:p-8 gap-6 rounded-3xl dark:bg-[#0c0a08]/98 bg-white/98 backdrop-blur-2xl border dark:border-red-900/60 border-stone-300 dark:text-zinc-100 text-stone-900 shadow-xl dark:shadow-[0_30px_80px_rgba(0,0,0,0.98)]">
                {/* Crimson Accent Top Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                {/* Header Section */}
                <DialogHeader className="space-y-3 pt-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            {project.featured && (
                                <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-amber-950 border border-amber-300 gap-1 text-[10px] font-tech-mono font-bold uppercase tracking-wider shadow-md">
                                    <Star className="h-3 w-3 fill-current text-amber-950" />
                                    FEATURED DOSSIER
                                </Badge>
                            )}
                            <span className="text-[10px] font-tech-mono dark:text-zinc-400 text-stone-600 uppercase tracking-widest dark:bg-black bg-stone-100 px-2.5 py-1 rounded-lg border dark:border-zinc-800 border-stone-300">
                                CASE FILE: #{String(project.id || "").slice(0, 8)}
                            </span>
                        </div>
                    </div>

                    <DialogTitle className="text-2xl sm:text-4xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wide leading-tight">
                        {project.title}
                    </DialogTitle>

                    {project.short_description && (
                        <DialogDescription className="text-sm sm:text-base dark:text-zinc-300 text-stone-700 font-sans leading-relaxed pt-1">
                            {project.short_description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {/* Main Media Gallery */}
                {hasMedia && (
                    <div className="space-y-3 pt-2">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border dark:border-zinc-800 border-stone-300 shadow-2xl group">
                            {currentImage ? (
                                <img
                                    src={currentImage}
                                    alt={`${project.title} screenshot ${selectedMediaIndex + 1}`}
                                    className="h-full w-full object-cover filter brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-zinc-500 text-xs font-tech-mono uppercase tracking-wider">
                                    IMAGE UNAVAILABLE
                                </div>
                            )}

                            {/* Image Counter Badge */}
                            {mediaList.length > 1 && (
                                <div className="absolute top-3 right-3 bg-black/90 text-red-400 text-[10px] font-tech-mono font-bold px-2.5 py-1 rounded-lg border border-red-900/60 backdrop-blur-md">
                                    {String(selectedMediaIndex + 1).padStart(2, "0")} / {String(mediaList.length).padStart(2, "0")}
                                </div>
                            )}

                            {/* Gallery Navigation Buttons */}
                            {mediaList.length > 1 && (
                                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none">
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl pointer-events-auto bg-black/90 text-zinc-200 border border-zinc-800 backdrop-blur-md shadow-xl hover:bg-red-950 hover:border-red-600 hover:text-white hover:scale-110 transition-all"
                                        onClick={() =>
                                            setSelectedMediaIndex((prev) =>
                                                prev === 0 ? mediaList.length - 1 : prev - 1
                                            )
                                        }
                                        aria-label="Previous Image"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl pointer-events-auto bg-black/90 text-zinc-200 border border-zinc-800 backdrop-blur-md shadow-xl hover:bg-red-950 hover:border-red-600 hover:text-white hover:scale-110 transition-all"
                                        onClick={() =>
                                            setSelectedMediaIndex((prev) =>
                                                prev === mediaList.length - 1 ? 0 : prev + 1
                                            )
                                        }
                                        aria-label="Next Image"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {mediaList.length > 1 && (
                            <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-red-900">
                                {mediaList.map((item, idx) => (
                                    <button
                                        key={item.id || idx}
                                        onClick={() => setSelectedMediaIndex(idx)}
                                        className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border transition-all ${
                                            idx === selectedMediaIndex
                                                ? "border-red-500 ring-2 ring-red-600/50 scale-105 shadow-lg opacity-100"
                                                : "border-zinc-800 opacity-50 hover:opacity-90 hover:border-zinc-700"
                                        }`}
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Demo Video Reel */}
                {demoVideoUrl && (
                    <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-tech-mono font-bold uppercase tracking-wider text-red-500 flex items-center gap-2">
                            <Film className="h-4 w-4 text-red-500" />
                            DEMO VIDEO REEL
                        </h4>
                        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black border dark:border-zinc-800 border-stone-300 shadow-2xl">
                            <video controls preload="metadata" className="h-full w-full object-contain">
                                <source src={demoVideoUrl} type="video/mp4" />
                                Your browser does not support HTML5 video playback.
                            </video>
                        </div>
                    </div>
                )}

                {/* Full Architecture Description */}
                {project.full_description && (
                    <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-tech-mono font-bold uppercase tracking-wider text-red-500 flex items-center gap-2">
                            <FileCode className="h-4 w-4 text-red-500" />
                            ARCHITECTURE &amp; OVERVIEW
                        </h4>
                        <div className="text-sm sm:text-base dark:text-zinc-200 text-stone-800 whitespace-pre-line leading-relaxed border-l-2 border-red-600 pl-4 py-2 font-sans dark:bg-black/40 bg-stone-100 rounded-r-xl border-y border-r dark:border-zinc-800/60 border-stone-200">
                            {project.full_description}
                        </div>
                    </div>
                )}

                {/* Technologies Badges */}
                {technologies.length > 0 && (
                    <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-tech-mono font-bold uppercase tracking-wider text-red-500 flex items-center gap-2">
                            <Layers className="h-4 w-4 text-red-500" />
                            SYSTEM STACK
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech) => (
                                <Badge key={tech.id} variant="secondary" className="px-3 py-1.5 text-xs font-tech-mono font-medium gap-2 dark:bg-black bg-stone-100 dark:text-zinc-200 text-stone-800 border dark:border-zinc-800 border-stone-300 rounded-xl shadow-sm">
                                    {tech.icon && (
                                        <img src={tech.icon} alt={tech.name} className="h-4 w-4 object-contain filter brightness-110" />
                                    )}
                                    {tech.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t dark:border-zinc-800/80 border-stone-300">
                    <div className="flex flex-wrap items-center gap-3">
                        {githubHref && (
                            <Button asChild variant="outline" className="rounded-xl gap-2 text-xs font-tech-mono font-bold uppercase tracking-wider h-11 px-5 dark:bg-black bg-stone-100 border dark:border-zinc-800 border-stone-300 dark:text-zinc-200 text-stone-800 hover:text-red-500 dark:hover:border-zinc-600 hover:border-stone-400 dark:hover:bg-zinc-900 hover:bg-stone-200 transition-all">
                                <a href={githubHref} target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="h-4 w-4 text-zinc-400" />
                                    <span>REPOSITORY</span>
                                </a>
                            </Button>
                        )}
                        {liveDemoHref && (
                            <Button asChild className="rounded-xl gap-2 text-xs font-tech-mono font-bold uppercase tracking-wider h-11 px-6 bg-gradient-to-r from-red-800 to-red-950 text-white border border-red-600/60 shadow-lg hover:border-red-500 hover:scale-105 transition-all">
                                <a href={liveDemoHref} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 text-white" />
                                    <span>LIVE SYSTEM PREVIEW</span>
                                </a>
                            </Button>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl gap-2 text-xs font-tech-mono font-bold uppercase tracking-wider h-11 px-5 dark:text-zinc-400 text-stone-600 dark:hover:text-white hover:text-stone-900 dark:hover:bg-zinc-900 hover:bg-stone-200 border dark:border-zinc-800 border-stone-300 transition-all"
                    >
                        <X className="h-4 w-4" />
                        <span>CLOSE</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

