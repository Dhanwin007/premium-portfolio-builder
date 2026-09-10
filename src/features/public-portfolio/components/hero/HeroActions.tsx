"use client";

import Link from "next/link";
import { Download, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioSettings } from "@/features/portfolio-settings/types";

interface HeroActionsProps {
    portfolioSettings: PortfolioSettings | null;
}

function getEmbedVideoUrl(url: string): { type: "iframe" | "video"; src: string } {
    if (!url) return { type: "video", src: url };

    // YouTube regex
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
        return {
            type: "iframe",
            src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`,
        };
    }

    // Vimeo regex
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[3]) {
        return {
            type: "iframe",
            src: `https://player.vimeo.com/video/${vimeoMatch[3]}`,
        };
    }

    return { type: "video", src: url };
}

export default function HeroActions({
    portfolioSettings,
}: HeroActionsProps) {
    if (!portfolioSettings) {
        return null;
    }

    const showResume = portfolioSettings.allow_resume_download && portfolioSettings.resume_url;
    const introVideoUrl = portfolioSettings.intro_video_url;

    if (!showResume && !introVideoUrl) {
        return null;
    }

    const videoConfig = introVideoUrl ? getEmbedVideoUrl(introVideoUrl) : null;

    return (
        <div className="flex flex-col items-center gap-6 w-full pt-6">
            {/* Resume / Dossier CTA Button */}
            {showResume && (
                <div className="flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl gap-3 px-8 h-12 bg-gradient-to-r from-red-800 via-red-700 to-zinc-950 text-white font-tech-mono font-bold uppercase tracking-wider text-xs border border-red-600/70 hover:border-red-400 shadow-[0_0_25px_rgba(185,28,28,0.35)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:scale-105 transition-all duration-300"
                    >
                        <a
                            href={portfolioSettings.resume_url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            <Download className="h-4 w-4 text-red-300" />
                            <span>DOWNLOAD DOSSIER / RESUME</span>
                        </a>
                    </Button>
                </div>
            )}

            {/* Intro Video Card */}
            {introVideoUrl && videoConfig && (
                <div className="w-full max-w-3xl rounded-2xl dark:border-red-950/60 border-stone-300 dark:bg-[#120f0d]/90 bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.95)] space-y-4 relative overflow-hidden group noir-card">
                    {/* Crimson Ambient Glow Strip */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-600/80 to-transparent" />
                    
                    <div className="flex items-center justify-between border-b dark:border-zinc-800/80 border-stone-200 pb-3">
                        <div className="flex items-center gap-2 text-xs font-tech-mono uppercase tracking-widest text-red-400">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-950/80 border border-red-800/50 text-red-300">
                                <Video className="h-4 w-4" />
                            </div>
                            <span className="font-bold dark:text-zinc-100 text-stone-900">AUDIO_VISUAL_INTRO</span>
                        </div>
                        <span className="text-[10px] font-tech-mono dark:text-zinc-500 text-stone-500 tracking-wider">MEDIA REEL</span>
                    </div>

                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl border dark:border-zinc-800/80 border-stone-300 group-hover:border-red-900/60 transition-colors">
                        {videoConfig.type === "iframe" ? (
                            <iframe
                                src={videoConfig.src}
                                title="Portfolio Intro Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full border-0"
                            />
                        ) : (
                            <video
                                controls
                                preload="metadata"
                                className="h-full w-full object-contain"
                            >
                                <source src={videoConfig.src} type="video/mp4" />
                                Your browser does not support HTML5 video player.
                            </video>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}