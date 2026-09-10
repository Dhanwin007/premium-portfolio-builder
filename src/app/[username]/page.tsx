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
            <main className="min-h-screen bg-[#080706] text-foreground py-10">
                <PortfolioSkeleton />
            </main>
        );
    }

    if (error || !portfolio) {
        return <PortfolioNotFound username={typeof username === "string" ? username : undefined} />;
    }

    return (
        <div className={currentTheme === "dark" ? "dark bg-[#080706] text-foreground transition-colors duration-300" : "light bg-[#f6f3ee] text-foreground transition-colors duration-300"}>
            <div className="relative min-h-screen bg-[#f6f3ee] dark:bg-[#080706] text-stone-900 dark:text-zinc-100 antialiased cinematic-noise-bg overflow-x-hidden transition-colors duration-300">
                {/* Atmospheric Crimson Light Overlays */}
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[750px] bg-[radial-gradient(ellipse_at_top,rgba(185,28,28,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(185,28,28,0.18),transparent_70%)]" />
                <div className="pointer-events-none absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full bg-red-900/10 dark:bg-red-950/25 blur-[150px]" />
                <div className="pointer-events-none absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-amber-600/10 dark:bg-amber-950/20 blur-[150px]" />
                <div className="pointer-events-none absolute bottom-1/4 left-1/3 w-[550px] h-[550px] rounded-full bg-red-900/10 blur-[160px]" />

                {/* Header Navigation */}
                <PortfolioHeader
                    portfolio={portfolio}
                    currentTheme={currentTheme}
                    onToggleTheme={handleToggleTheme}
                />

                {/* Main Visual Flow */}
                <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-4 sm:px-6 py-6 md:py-10">
                    <HeroSection portfolio={portfolio} />
                    <SkillsSection skills={portfolio.skills} />
                    <ProjectsSection projects={portfolio.projects} />
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