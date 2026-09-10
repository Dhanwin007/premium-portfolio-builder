"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    Sun, 
    Moon, 
    Download, 
    Menu, 
    X, 
    User, 
    Code2, 
    FolderGit2, 
    Briefcase, 
    GraduationCap, 
    Award, 
    Trophy,
    MapPin
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
        { label: "About", href: "#hero", show: true },
        { label: "Skills", href: "#skills", show: skills.length > 0 },
        { label: "Projects", href: "#projects", show: projects.length > 0 },
        { label: "Experience", href: "#experience", show: experience.length > 0 },
        { label: "Education", href: "#education", show: education.length > 0 },
        { label: "Certificates", href: "#certificates", show: certificates.length > 0 },
        { label: "Achievements", href: "#achievements", show: achievements.length > 0 },
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
                    ? "bg-zinc-950/90 backdrop-blur-xl border-b border-amber-600/40 shadow-[0_10px_35px_rgba(0,0,0,0.95)] py-3"
                    : "bg-zinc-950/50 backdrop-blur-md py-4"
            }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
                {/* Brand / Profile Avatar & Name */}
                <div className="flex items-center gap-3">
                    <Link
                        href="#hero"
                        onClick={(e) => scrollToSection(e, "#hero")}
                        className="flex items-center gap-3 group"
                    >
                        <Avatar className="h-9 w-9 border-2 border-amber-500/80 shadow-[0_0_15px_rgba(217,119,6,0.4)] transition-transform group-hover:scale-105">
                            <AvatarImage src={profile.avatar_url ?? ""} alt={profile.display_name} />
                            <AvatarFallback className="bg-amber-950 text-amber-300 font-chicano text-sm">
                                {profile.display_name?.charAt(0).toUpperCase() ?? "P"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-chicano text-lg gold-foil-text tracking-wide group-hover:text-amber-200 transition-colors">
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
                                className="text-[11px] font-mono text-zinc-400 hover:text-amber-300 transition-colors hidden sm:flex items-center gap-1 group/hdr-loc"
                                title="Open location on Google Maps"
                            >
                                <MapPin className="h-3 w-3 text-amber-500 group-hover/hdr-loc:scale-110 transition-transform" />
                                <span>{formattedLocation}</span>
                            </a>
                        ) : (
                            <span className="text-[11px] font-mono text-zinc-400 hidden sm:flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-amber-500" />
                                {formattedLocation}
                            </span>
                        )
                    )}
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-1 rounded-xl border border-amber-900/40 bg-zinc-950/90 backdrop-blur-xl px-4 py-1.5 shadow-2xl">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-amber-400/80 hover:text-amber-200 hover:bg-amber-950/60 rounded-lg transition-all"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Header Actions: Resume CTA & Theme Switcher */}
                <div className="hidden sm:flex items-center gap-3">
                    {portfolioSettings?.allow_resume_download && portfolioSettings?.resume_url && (
                        <Button asChild size="sm" variant="outline" className="rounded-lg gap-2 text-xs font-mono font-black uppercase tracking-wider h-9 bg-zinc-950 border-amber-600/50 text-amber-300 hover:bg-amber-950 hover:border-amber-400 shadow-md">
                            <a
                                href={portfolioSettings.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                <Download className="h-3.5 w-3.5 text-amber-400" />
                                DOSSIER
                            </a>
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleTheme}
                        className="rounded-lg h-9 w-9 bg-zinc-950 border border-amber-900/40 text-amber-400 hover:text-amber-200 hover:border-amber-600/60"
                        aria-label="Toggle theme"
                    >
                        {currentTheme === "dark" ? (
                            <Sun className="h-4 w-4 text-amber-400" />
                        ) : (
                            <Moon className="h-4 w-4 text-slate-300" />
                        )}
                    </Button>
                </div>

                {/* Mobile Controls */}
                <div className="flex sm:hidden items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleTheme}
                        className="rounded-lg h-9 w-9 bg-zinc-950 border border-amber-900/40 text-amber-400"
                        aria-label="Toggle theme"
                    >
                        {currentTheme === "dark" ? (
                            <Sun className="h-4 w-4 text-amber-400" />
                        ) : (
                            <Moon className="h-4 w-4 text-slate-300" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg h-9 w-9 bg-zinc-950 border border-amber-900/40 text-amber-400"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5 text-amber-400" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="sm:hidden border-b border-amber-600/40 bg-zinc-950/98 backdrop-blur-2xl px-5 py-5 mt-2 space-y-4 shadow-2xl">
                    {formattedLocation && mapUrl && (
                        <div className="pb-3 border-b border-amber-900/40">
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-amber-400 hover:text-amber-200 transition-colors flex items-center gap-2"
                            >
                                <MapPin className="h-4 w-4 text-amber-500" />
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
                                className="px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-300 hover:text-white hover:bg-amber-950/60 rounded-lg transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    {portfolioSettings?.allow_resume_download && portfolioSettings?.resume_url && (
                        <div className="pt-3 border-t border-amber-900/40">
                            <Button asChild size="sm" className="w-full rounded-lg gap-2 text-xs font-mono font-black uppercase tracking-wider h-10 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-amber-950 border border-amber-400">
                                <a
                                    href={portfolioSettings.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                >
                                    <Download className="h-4 w-4" />
                                    Download Dossier
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
