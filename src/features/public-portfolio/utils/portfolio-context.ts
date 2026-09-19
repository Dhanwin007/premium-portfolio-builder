import type { PublicPortfolio } from "@/features/public-portfolio/types";

/**
 * Builds a clean, public-only context text string from a PublicPortfolio object.
 * Excludes internal database IDs, user_id, timestamps, and private metadata.
 */
export function buildPortfolioContext(portfolio: PublicPortfolio): string {
    const {
        profile,
        location,
        socialLinks,
        skills = [],
        projects = [],
        experience = [],
        education = [],
        certificates = [],
        achievements = [],
    } = portfolio;

    const parts: string[] = [];

    // --- Profile Section ---
    parts.push(`=== ABOUT THE PORTFOLIO OWNER ===`);
    parts.push(`Name: ${profile.display_name || "Not specified"}`);
    parts.push(`Username: ${profile.username}`);
    if (profile.headline) {
        parts.push(`Headline: ${profile.headline}`);
    }
    if (profile.bio) {
        parts.push(`Bio: ${profile.bio}`);
    }
    if (profile.current_status) {
        const formattedStatus = profile.current_status.replace(/_/g, " ");
        parts.push(`Current Status: ${formattedStatus}`);
    }

    // --- Location ---
    if (location) {
        const locParts = [location.city, location.state, location.country].filter(Boolean);
        if (locParts.length > 0) {
            parts.push(`Location: ${locParts.join(", ")}`);
        }
    }

    // --- Social Links ---
    if (socialLinks) {
        const links: string[] = [];
        if (socialLinks.github) links.push(`GitHub: ${socialLinks.github}`);
        if (socialLinks.linkedin) links.push(`LinkedIn: ${socialLinks.linkedin}`);
        if (socialLinks.portfolio) links.push(`Portfolio: ${socialLinks.portfolio}`);
        if (socialLinks.leetcode) links.push(`LeetCode: ${socialLinks.leetcode}`);
        if (socialLinks.codeforces) links.push(`Codeforces: ${socialLinks.codeforces}`);
        if (socialLinks.hackerrank) links.push(`HackerRank: ${socialLinks.hackerrank}`);
        if (socialLinks.youtube) links.push(`YouTube: ${socialLinks.youtube}`);
        if (socialLinks.twitter) links.push(`Twitter: ${socialLinks.twitter}`);
        if (links.length > 0) {
            parts.push(`\n=== SOCIAL LINKS ===`);
            parts.push(links.join("\n"));
        }
    }

    // --- Skills ---
    if (skills.length > 0) {
        parts.push(`\n=== SKILLS & TECHNOLOGIES ===`);
        const skillNames = skills.map((s) => s.name).filter(Boolean);
        parts.push(skillNames.join(", "));
    }

    // --- Projects ---
    if (projects.length > 0) {
        parts.push(`\n=== PROJECTS (${projects.length}) ===`);
        projects.forEach((proj, idx) => {
            parts.push(`Project #${idx + 1}: ${proj.title}`);
            if (proj.short_description) {
                parts.push(`  Summary: ${proj.short_description}`);
            }
            if (proj.full_description) {
                parts.push(`  Description: ${proj.full_description}`);
            }
            if (proj.technologies && proj.technologies.length > 0) {
                const techList = proj.technologies.map((t) => t.name).join(", ");
                parts.push(`  Technologies Used: ${techList}`);
            }
            if (proj.github_url) {
                parts.push(`  GitHub Repository: ${proj.github_url}`);
            }
            if (proj.live_demo_url) {
                parts.push(`  Live Demo: ${proj.live_demo_url}`);
            }
            if (proj.demo_video_url) {
                parts.push(`  Demo Video: ${proj.demo_video_url}`);
            }
        });
    }

    // --- Work Experience ---
    if (experience.length > 0) {
        parts.push(`\n=== WORK EXPERIENCE (${experience.length}) ===`);
        experience.forEach((exp, idx) => {
            const formattedType = exp.employment_type ? exp.employment_type.replace(/_/g, " ") : "";
            const dates = [
                exp.start_date || "Unknown",
                exp.currently_working ? "Present" : exp.end_date || "Unknown",
            ].join(" to ");
            parts.push(`Experience #${idx + 1}: ${exp.position} at ${exp.company}`);
            if (formattedType) parts.push(`  Employment Type: ${formattedType}`);
            parts.push(`  Duration: ${dates}`);
            if (exp.location) parts.push(`  Location: ${exp.location}`);
            if (exp.description) parts.push(`  Description: ${exp.description}`);
        });
    }

    // --- Education ---
    if (education.length > 0) {
        parts.push(`\n=== EDUCATION (${education.length}) ===`);
        education.forEach((edu, idx) => {
            parts.push(`Education #${idx + 1}: ${edu.degree} at ${edu.institution}`);
            if (edu.field) parts.push(`  Field of Study: ${edu.field}`);
            if (edu.grade) parts.push(`  Grade/GPA: ${edu.grade}`);
            const dates = [edu.start_date || "Unknown", edu.end_date || "Unknown"].join(" to ");
            parts.push(`  Duration: ${dates}`);
            if (edu.description) parts.push(`  Details: ${edu.description}`);
        });
    }

    // --- Certificates ---
    if (certificates.length > 0) {
        parts.push(`\n=== CERTIFICATES (${certificates.length}) ===`);
        certificates.forEach((cert, idx) => {
            parts.push(`Certificate #${idx + 1}: ${cert.title}`);
            if (cert.issuer) parts.push(`  Issuer: ${cert.issuer}`);
            if (cert.issue_date) parts.push(`  Issued Date: ${cert.issue_date}`);
            if (cert.credential_url) parts.push(`  Credential Link: ${cert.credential_url}`);
        });
    }

    // --- Achievements ---
    if (achievements.length > 0) {
        parts.push(`\n=== ACHIEVEMENTS (${achievements.length}) ===`);
        achievements.forEach((ach, idx) => {
            parts.push(`Achievement #${idx + 1}: ${ach.title}`);
            if (ach.achievement_date) parts.push(`  Date: ${ach.achievement_date}`);
            if (ach.description) parts.push(`  Details: ${ach.description}`);
        });
    }

    return parts.join("\n");
}
