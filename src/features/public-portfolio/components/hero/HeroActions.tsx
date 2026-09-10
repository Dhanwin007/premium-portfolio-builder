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
            {/* Resume Button */}
            {showResume && (
                <div className="flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl gap-3 px-8 h-12 bg-gradient-to-r from-amber-700 via-amber-600 to-red-950 text-amber-100 font-mono font-black uppercase tracking-widest text-xs border border-amber-500/70 hover:border-amber-300 shadow-[0_0_25px_rgba(217,119,6,0.35)] hover:shadow-[0_0_40px_rgba(217,119,6,0.6)] hover:scale-105 transition-all duration-300"
                    >
                        <a
                            href={portfolioSettings.resume_url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            <Download className="h-4 w-4 text-amber-300" />
                            <span>Download Dossier / Resume</span>
                        </a>
                    </Button>
                </div>
            )}

            {/* Intro Video Card */}
            {introVideoUrl && videoConfig && (
                <div className="w-full max-w-3xl rounded-2xl border border-amber-600/40 bg-zinc-950/90 backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.9)] space-y-4 relative overflow-hidden group">
                    {/* Aztec Filigree Top Strip */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent" />
                    
                    <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-950/80 border border-amber-600/50 text-amber-300">
                                <Video className="h-4 w-4" />
                            </div>
                            <span className="gold-foil-text font-black">VHS_REEL // EST. 1990</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 tracking-wider">AUDIO_VISUAL_DECK</span>
                    </div>

                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl border border-amber-900/40 group-hover:border-amber-500/50 transition-colors">
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