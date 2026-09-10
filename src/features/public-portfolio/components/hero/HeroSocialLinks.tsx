"use client";

import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaGlobe,
    FaHackerrank,
    FaYoutube,
    FaXTwitter,
} from "react-icons/fa6";
import {
    SiLeetcode,
    SiCodeforces,
} from "react-icons/si";

import type { SocialLinks } from "@/features/social-links/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeroSocialLinksProps {
    socialLinks: SocialLinks | null;
}

function formatExternalUrl(url: string | null | undefined): string {
    if (!url) return "#";
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }
    return `https://${trimmed}`;
}

export default function HeroSocialLinks({
    socialLinks,
}: HeroSocialLinksProps) {
    if (!socialLinks) {
        return null;
    }

    const links = [
        { key: "github", url: socialLinks.github, label: "GitHub", icon: FaGithub, hoverColor: "hover:text-white hover:border-red-500/70 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]" },
        { key: "linkedin", url: socialLinks.linkedin, label: "LinkedIn", icon: FaLinkedin, hoverColor: "hover:text-blue-400 hover:border-blue-500/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]" },
        { key: "portfolio", url: socialLinks.portfolio, label: "Website", icon: FaGlobe, hoverColor: "hover:text-red-400 hover:border-red-500/70 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]" },
        { key: "leetcode", url: socialLinks.leetcode, label: "LeetCode", icon: SiLeetcode, hoverColor: "hover:text-amber-400 hover:border-amber-500/70 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]" },
        { key: "codeforces", url: socialLinks.codeforces, label: "Codeforces", icon: SiCodeforces, hoverColor: "hover:text-blue-400 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]" },
        { key: "hackerrank", url: socialLinks.hackerrank, label: "HackerRank", icon: FaHackerrank, hoverColor: "hover:text-emerald-400 hover:border-emerald-500/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]" },
        { key: "youtube", url: socialLinks.youtube, label: "YouTube", icon: FaYoutube, hoverColor: "hover:text-red-500 hover:border-red-500/70 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]" },
        { key: "twitter", url: socialLinks.twitter, label: "X / Twitter", icon: FaXTwitter, hoverColor: "hover:text-white hover:border-red-500/70 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]" },
    ].filter((item) => item.url && item.url.trim() !== "");

    if (links.length === 0) {
        return null;
    }

    return (
        <TooltipProvider delayDuration={150}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                {links.map((item) => {
                    const Icon = item.icon;
                    const formattedHref = formatExternalUrl(item.url);
                    return (
                        <Tooltip key={item.key}>
                            <TooltipTrigger asChild>
                                <a
                                    href={formattedHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl border dark:border-zinc-800 border-stone-300 dark:bg-[#120f0d]/90 bg-white/95 dark:text-zinc-400 text-stone-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${item.hoverColor}`}
                                    aria-label={item.label}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs font-tech-mono font-bold uppercase tracking-wider bg-black text-red-300 border border-red-900/60 shadow-xl">
                                {item.label}
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
}