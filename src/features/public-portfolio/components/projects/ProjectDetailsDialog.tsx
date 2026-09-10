"use client";

import { useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Play, ChevronLeft, ChevronRight } from "lucide-react";
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

    if (!project) return null;

    const hasMedia = project.media && project.media.length > 0;
    const currentImage = hasMedia ? project.media[selectedMediaIndex]?.image_url : null;
    const githubHref = project.github_url ? formatExternalUrl(project.github_url) : null;
    const liveDemoHref = project.live_demo_url ? formatExternalUrl(project.live_demo_url) : null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 gap-6 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-amber-600/50 text-white shadow-[0_25px_60px_rgba(0,0,0,0.98)] relative overflow-hidden">
                {/* Aztec Gold Top Bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500/90 to-transparent" />

                <DialogHeader className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        {project.featured && (
                            <Badge className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-amber-100 border border-amber-300/60 gap-1 text-[10px] font-mono font-black uppercase tracking-wider shadow-md">
                                <Star className="h-3 w-3 fill-current text-yellow-200" />
                                FEATURED DOSSIER
                            </Badge>
                        )}
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">[ID: #{project.id.slice(0, 8)}]</span>
                    </div>
                    <DialogTitle className="text-3xl sm:text-4xl font-chicano gold-foil-text tracking-wide uppercase">
                        {project.title}
                    </DialogTitle>
                    {project.short_description && (
                        <DialogDescription className="text-sm text-zinc-300 font-sans leading-relaxed">
                            {project.short_description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {/* Media Section: Main Image & Gallery Selector */}
                {hasMedia && (
                    <div className="space-y-3">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-amber-900/40 shadow-2xl">
                            {currentImage ? (
                                <img
                                    src={currentImage}
                                    alt={project.title}
                                    className="h-full w-full object-cover filter brightness-95 contrast-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-amber-500 text-xs font-mono font-bold uppercase tracking-wider">
                                    No Image Available
                                </div>
                            )}

                            {/* Gallery Navigation Controls */}
                            {project.media.length > 1 && (
                                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none">
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="h-9 w-9 rounded-lg pointer-events-auto bg-black/90 text-amber-300 border border-amber-600/50 backdrop-blur-md shadow-lg hover:bg-amber-950 hover:border-amber-400 transition-all"
                                        onClick={() =>
                                            setSelectedMediaIndex((prev) =>
                                                prev === 0 ? project.media.length - 1 : prev - 1
                                            )
                                        }
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="h-9 w-9 rounded-lg pointer-events-auto bg-black/90 text-amber-300 border border-amber-600/50 backdrop-blur-md shadow-lg hover:bg-amber-950 hover:border-amber-400 transition-all"
                                        onClick={() =>
                                            setSelectedMediaIndex((prev) =>
                                                prev === project.media.length - 1 ? 0 : prev + 1
                                            )
                                        }
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {project.media.length > 1 && (
                            <div className="flex gap-2.5 overflow-x-auto pb-2">
                                {project.media.map((item, idx) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedMediaIndex(idx)}
                                        className={`relative h-14 w-22 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                                            idx === selectedMediaIndex
                                                ? "border-amber-400 ring-2 ring-amber-500/50 scale-105 shadow-md"
                                                : "border-amber-900/40 opacity-60 hover:opacity-100 hover:border-amber-600"
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

                {/* Demo Video if available */}
                {project.demo_video_url && (
                    <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-mono font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                            <Play className="h-4 w-4 text-amber-500 fill-current" />
                            VHS DEMO REEL
                        </h4>
                        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black border border-amber-900/50 shadow-2xl">
                            <video controls preload="metadata" className="h-full w-full object-contain">
                                <source src={project.demo_video_url} type="video/mp4" />
                                Your browser does not support HTML5 video player.
                            </video>
                        </div>
                    </div>
                )}

                {/* Full Description */}
                {project.full_description && (
                    <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-mono font-black uppercase tracking-wider text-amber-400/80">
                            DOSSIER DETAILS &amp; ARCHITECTURE
                        </h4>
                        <p className="text-sm text-zinc-200 whitespace-pre-line leading-relaxed border-l-2 border-amber-600 pl-4 py-1 font-sans">
                            {project.full_description}
                        </p>
                    </div>
                )}

                {/* Technologies Badges */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-mono font-black uppercase tracking-wider text-amber-400/80">
                            SYSTEM STACK &amp; TECH
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <Badge key={tech.id} variant="secondary" className="px-3 py-1.5 text-xs font-mono font-bold gap-2 bg-zinc-900 text-amber-300 border border-amber-900/40 rounded-lg">
                                    {tech.icon && (
                                        <img src={tech.icon} alt={tech.name} className="h-4 w-4 object-contain filter brightness-110" />
                                    )}
                                    {tech.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Action Links */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-amber-900/40">
                    {githubHref && (
                        <Button asChild variant="outline" className="rounded-xl gap-2 text-xs font-mono font-bold uppercase tracking-wider h-11 px-6 bg-zinc-950 border-amber-800/60 text-amber-300 hover:text-amber-100 hover:border-amber-400 hover:bg-amber-950/60 transition-all">
                            <a href={githubHref} target="_blank" rel="noopener noreferrer">
                                <FaGithub className="h-4 w-4 text-amber-300" />
                                REPOSITORY CODE
                            </a>
                        </Button>
                    )}
                    {liveDemoHref && (
                        <Button asChild className="rounded-xl gap-2 text-xs font-mono font-black uppercase tracking-wider h-11 px-6 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-amber-950 border border-amber-300 shadow-lg shadow-amber-950/50 hover:border-amber-200 hover:scale-105 transition-all">
                            <a href={liveDemoHref} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 text-amber-950" />
                                LIVE SYSTEM PREVIEW
                            </a>
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
