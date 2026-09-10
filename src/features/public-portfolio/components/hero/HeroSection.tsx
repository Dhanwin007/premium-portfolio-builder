"use client";

import type { PublicPortfolio } from "@/features/public-portfolio/types";
import HeroCover from "./HeroCover";
import HeroProfile from "./HeroProfile";
import HeroSocialLinks from "./HeroSocialLinks";
import HeroActions from "./HeroActions";

interface HeroSectionProps {
    portfolio: PublicPortfolio;
}

export default function HeroSection({ portfolio }: HeroSectionProps) {
    const { profile, portfolioSettings, socialLinks, location } = portfolio;

    return (
        <section id="hero" className="w-full space-y-4 pt-2">
            <HeroCover
                coverUrl={profile.cover_url}
                displayName={profile.display_name}
            />

            <HeroProfile
                profile={profile}
                location={location}
                portfolioSettings={portfolioSettings}
            />

            <HeroSocialLinks
                socialLinks={socialLinks}
            />

            <HeroActions
                portfolioSettings={portfolioSettings}
            />
        </section>
    );
}