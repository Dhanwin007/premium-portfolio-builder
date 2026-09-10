"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    Sun, 
    Moon, 
    Download, 
    Menu, 
    X, 
    MapPin,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { PublicPortfolio } from "@/features/public-portfolio/types";

interface PortfolioHeaderProps {
    portfolio: PublicPortfolio;
    currentTheme: "light" | "dark";
    onToggleTheme: () => void;
}

export default function PortfolioHeader({
    portfolio,
    currentTheme,
    onToggleTheme,
}: PortfolioHeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { profile, portfolioSettings, location, skills, projects, experience, education, certificates, achievements } = portfolio;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Overview", href: "#hero", show: true },
        { label: "Tech Stack", href: "#skills", show: skills.length > 0 },
        { label: "Projects", href: "#projects", show: projects.length > 0 },
        { label: "Experience", href: "#experience", show: experience.length > 0 },
        { label: "Education", href: "#education", show: education.length > 0 },
        { label: "Credentials", href: "#certificates", show: certificates.length > 0 },
        { label: "Honors", href: "#achievements", show: achievements.length > 0 },
    ].filter((item) => item.show);

    const showLocation = portfolioSettings?.show_location && location;
    const formattedLocation = showLocation
        ? [location.city, location.state, location.country].filter(Boolean).join(", ")
        : null;

    const mapUrl = showLocation
        ? location.latitude !== null && location.latitude !== undefined && location.longitude !== null && location.longitude !== undefined
            ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
            : formattedLocation
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedLocation)}`
            : null
        : null;

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "dark:bg-[#080706]/90 bg-stone-100/90 backdrop-blur-xl dark:border-red-950/40 border-stone-300/80 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.95)] py-3"
                    : "dark:bg-[#080706]/60 bg-stone-50/80 backdrop-blur-md dark:border-white/5 border-stone-200/60 py-4"
            }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
                {/* Brand Avatar & Display Name */}
                <div className="flex items-center gap-3">
                    <Link
                        href="#hero"
                        onClick={(e) => scrollToSection(e, "#hero")}
                        className="flex items-center gap-3 group"
                    >
                        <Avatar className="h-9 w-9 border border-red-600/60 shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-transform group-hover:scale-105">
                            <AvatarImage src={profile.avatar_url ?? ""} alt={profile.display_name} className="object-cover" />
                            <AvatarFallback className="dark:bg-zinc-950 bg-stone-200 text-red-500 font-cinematic text-xs">
                                {profile.display_name?.charAt(0).toUpperCase() ?? "P"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-cinematic text-base sm:text-lg font-bold tracking-wider dark:text-zinc-100 text-stone-900 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors uppercase">
                                {profile.display_name}
                            </span>
                        </div>
                    </Link>

                    {formattedLocation && (
                        mapUrl ? (
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-tech-mono dark:text-zinc-400 text-stone-600 dark:hover:text-red-400 hover:text-red-600 transition-colors hidden md:flex items-center gap-1 group/hdr-loc pl-2 border-l dark:border-zinc-800 border-stone-300"
                                title="Open location on Google Maps"
                            >
                                <MapPin className="h-3 w-3 text-red-500 group-hover/hdr-loc:scale-110 transition-transform" />
                                <span>{formattedLocation}</span>
                            </a>
                        ) : (
                            <span className="text-[11px] font-tech-mono dark:text-zinc-400 text-stone-600 hidden md:flex items-center gap-1 pl-2 border-l dark:border-zinc-800 border-stone-300">
                                <MapPin className="h-3 w-3 text-red-500" />
                                {formattedLocation}
                            </span>
                        )
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1 rounded-full dark:border-zinc-800/80 border-stone-300/80 dark:bg-[#120f0d]/90 bg-white/90 backdrop-blur-xl px-4 py-1.5 shadow-md dark:shadow-2xl">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="px-3.5 py-1 text-xs font-tech-mono font-medium uppercase tracking-wider dark:text-zinc-300 text-stone-700 dark:hover:text-red-400 hover:text-red-600 dark:hover:bg-zinc-900/80 hover:bg-stone-100 rounded-full transition-all"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Actions: Resume CTA & Theme Toggle */}
                <div className="hidden sm:flex items-center gap-3">
                    {portfolioSettings?.allow_resume_download && portfolioSettings?.resume_url && (
                        <Button asChild size="sm" variant="outline" className="rounded-xl gap-2 text-xs font-tech-mono font-bold uppercase tracking-wider h-9 dark:bg-zinc-950 bg-stone-900 dark:border-red-900/60 border-stone-800 dark:text-red-400 text-red-400 dark:hover:bg-red-950/60 hover:bg-stone-800 hover:border-red-600 hover:text-white shadow-md transition-all">
                            <a
                                href={portfolioSettings.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                <Download className="h-3.5 w-3.5 text-red-400" />
                                <span>DOSSIER</span>
                            </a>
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleTheme}
                        className="rounded-xl h-9 w-9 dark:bg-zinc-950 bg-stone-200/80 border dark:border-zinc-800 border-stone-300 dark:text-zinc-300 text-stone-800 hover:text-amber-500 hover:border-amber-500/50 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {currentTheme === "dark" ? (
                            <Sun className="h-4 w-4 text-amber-400" />
                        ) : (
                            <Moon className="h-4 w-4 text-stone-800" />
                        )}
                    </Button>
                </div>

                {/* Mobile Controls */}
                <div className="flex sm:hidden items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleTheme}
                        className="rounded-xl h-9 w-9 dark:bg-zinc-950 bg-stone-200/80 border dark:border-zinc-800 border-stone-300 dark:text-zinc-300 text-stone-800"
                        aria-label="Toggle theme"
                    >
                        {currentTheme === "dark" ? (
                            <Sun className="h-4 w-4 text-amber-400" />
                        ) : (
                            <Moon className="h-4 w-4 text-stone-800" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-xl h-9 w-9 dark:bg-zinc-950 bg-stone-200/80 border dark:border-zinc-800 border-stone-300 dark:text-zinc-300 text-stone-800"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5 text-red-500" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-b dark:border-red-950/60 border-stone-300 dark:bg-[#0c0a08]/98 bg-stone-50/98 backdrop-blur-2xl px-5 py-5 mt-2 space-y-4 shadow-2xl">
                    {formattedLocation && mapUrl && (
                        <div className="pb-3 border-b dark:border-zinc-800/60 border-stone-300">
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-tech-mono dark:text-zinc-300 text-stone-700 hover:text-red-500 transition-colors flex items-center gap-2"
                            >
                                <MapPin className="h-4 w-4 text-red-500" />
                                <span>{formattedLocation}</span>
                            </a>
                        </div>
                    )}
                    <div className="flex flex-col space-y-1.5">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="px-4 py-2.5 text-xs font-tech-mono font-bold uppercase tracking-wider dark:text-zinc-300 text-stone-700 dark:hover:text-white hover:text-stone-900 dark:hover:bg-zinc-900 hover:bg-stone-200 rounded-xl transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    {portfolioSettings?.allow_resume_download && portfolioSettings?.resume_url && (
                        <div className="pt-3 border-t dark:border-zinc-800/60 border-stone-300">
                            <Button asChild size="sm" className="w-full rounded-xl gap-2 text-xs font-tech-mono font-bold uppercase tracking-wider h-10 bg-gradient-to-r from-red-800 to-red-950 text-white border border-red-600/50 shadow-lg">
                                <a
                                    href={portfolioSettings.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download Dossier</span>
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

