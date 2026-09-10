"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import HeroSection from "@/features/public-portfolio/components/hero/HeroSection";
import SkillsSection from "@/features/public-portfolio/components/skills/SkillsSection";
import ProjectsSection from "@/features/public-portfolio/components/projects/ProjectsSection";
import ExperienceSection from "@/features/public-portfolio/components/experience/ExperienceSection";
import EducationSection from "@/features/public-portfolio/components/education/EducationSection";
import CertificatesSection from "@/features/public-portfolio/components/certificates/CertificatesSection";
import AchievementsSection from "@/features/public-portfolio/components/achievements/AchievementsSection";
import PortfolioHeader from "@/features/public-portfolio/components/nav/PortfolioHeader";
import PortfolioFooter from "@/features/public-portfolio/components/footer/PortfolioFooter";
import { PortfolioSkeleton, PortfolioNotFound } from "@/features/public-portfolio/components/ui/PortfolioSkeleton";

import { usePublicPortfolioStore } from "@/stores/public-portfolio.store";

export default function PublicPortfolioPage() {
    const { username } = useParams<{
        username: string;
    }>();

    const {
        portfolio,
        loading,
        error,
        fetchPublicPortfolio,
    } = usePublicPortfolioStore();

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        if (typeof username === "string") {
            fetchPublicPortfolio(username);
        }
    }, [username, fetchPublicPortfolio]);

    useEffect(() => {
        if (portfolio?.portfolioSettings?.theme) {
            const prefTheme = portfolio.portfolioSettings.theme;
            if (prefTheme === "dark") {
                setCurrentTheme("dark");
            } else if (prefTheme === "light") {
                setCurrentTheme("light");
            } else if (prefTheme === "system") {
                const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                setCurrentTheme(systemDark ? "dark" : "light");
            }
        }
    }, [portfolio]);

    const handleToggleTheme = () => {
        setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground py-10">
                <PortfolioSkeleton />
            </main>
        );
    }

    if (error || !portfolio) {
        return <PortfolioNotFound username={typeof username === "string" ? username : undefined} />;
    }

    return (
        <div className={currentTheme === "dark" ? "dark bg-[#0a0806] text-foreground transition-colors duration-300" : "bg-background text-foreground transition-colors duration-300"}>
            <div className="relative min-h-screen bg-[#0a0806] text-zinc-100 antialiased selection:bg-amber-500/30 selection:text-amber-200 cinematic-noise-bg overflow-x-hidden">
                {/* Ambient 90s Lowrider Gold & Crimson Spotlight Overlays */}
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.2),transparent_70%)]" />
                <div className="pointer-events-none absolute top-1/4 -left-48 w-[450px] h-[450px] rounded-full bg-red-950/20 blur-[140px]" />
                <div className="pointer-events-none absolute top-1/2 -right-48 w-[450px] h-[450px] rounded-full bg-amber-600/15 blur-[140px]" />
                <div className="pointer-events-none absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-900/10 blur-[150px]" />

                {/* Navigation Header */}
                <PortfolioHeader
                    portfolio={portfolio}
                    currentTheme={currentTheme}
                    onToggleTheme={handleToggleTheme}
                />

                {/* Main Content Layout */}
                <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-4 sm:px-6 py-6 md:py-10">
                    <HeroSection portfolio={portfolio} />
                    <ProjectsSection projects={portfolio.projects} />
                    <SkillsSection skills={portfolio.skills} />
                    <ExperienceSection experience={portfolio.experience} />
                    <EducationSection education={portfolio.education} />
                    <CertificatesSection certificates={portfolio.certificates} />
                    <AchievementsSection achievements={portfolio.achievements} />
                </main>

                {/* Footer */}
                <PortfolioFooter profile={portfolio.profile} />
            </div>
        </div>
    );
}