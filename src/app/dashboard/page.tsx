"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
    User, 
    Share2, 
    MapPin, 
    Code2, 
    Briefcase, 
    GraduationCap, 
    FolderGit2, 
    Award, 
    Trophy,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    Copy,
    Sparkles,
    Globe,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import { authStore } from "@/stores/auth.store";
import { profileStore } from "@/stores/profile.store";
import { socialLinksStore } from "@/stores/social-links.store";
import { locationStore } from "@/stores/location.store";
import { skillsStore } from "@/stores/skills.store";
import { experienceStore } from "@/stores/experience.store";
import { educationStore } from "@/stores/education.store";
import { projectsStore } from "@/stores/projects.store";
import { certificatesStore } from "@/stores/certificates.store";
import { achievementsStore } from "@/stores/achievements.store";

export default function DashboardPage() {
    const [initialLoading, setInitialLoading] = useState(true);

    const user = authStore((state) => state.user);
    const profile = profileStore((state) => state.profile);
    const socialLinks = socialLinksStore((state) => state.socialLinks);
    const location = locationStore((state) => state.location);
    const skills = skillsStore((state) => state.skills);
    const experiences = experienceStore((state) => state.experiences);
    const educations = educationStore((state) => state.educations);
    const projects = projectsStore((state) => state.projects);
    const certificates = certificatesStore((state) => state.certificates);
    const achievements = achievementsStore((state) => state.achievements);

    const fetchProfile = profileStore((state) => state.fetchProfile);
    const fetchSocialLinks = socialLinksStore((state) => state.fetchSocialLinks);
    const fetchLocation = locationStore((state) => state.fetchLocation);
    const fetchSkills = skillsStore((state) => state.fetchSkills);
    const fetchExperiences = experienceStore((state) => state.fetchExperiences);
    const fetchEducations = educationStore((state) => state.fetchEducations);
    const fetchProjects = projectsStore((state) => state.fetchProjects);
    const fetchCertificates = certificatesStore((state) => state.fetchCertificates);
    const fetchAchievements = achievementsStore((state) => state.fetchAchievements);

    useEffect(() => {
        let isMounted = true;
        async function loadAllDashboardData() {
            setInitialLoading(true);
            await Promise.all([
                fetchProfile(),
                fetchSocialLinks(),
                fetchLocation(),
                fetchSkills(),
                fetchExperiences(),
                fetchEducations(),
                fetchProjects(),
                fetchCertificates(),
                fetchAchievements(),
            ]);
            if (isMounted) {
                setInitialLoading(false);
            }
        }
        loadAllDashboardData();
        return () => {
            isMounted = false;
        };
    }, [
        fetchProfile,
        fetchSocialLinks,
        fetchLocation,
        fetchSkills,
        fetchExperiences,
        fetchEducations,
        fetchProjects,
        fetchCertificates,
        fetchAchievements,
    ]);

    // Section Completion Logic
    const isProfileComplete = Boolean(
        profile && profile.display_name && (profile.headline || profile.bio || profile.avatar_url)
    );

    const activeSocialLinksCount = socialLinks
        ? [
              socialLinks.github,
              socialLinks.linkedin,
              socialLinks.portfolio,
              socialLinks.leetcode,
              socialLinks.codeforces,
              socialLinks.hackerrank,
              socialLinks.youtube,
              socialLinks.twitter,
          ].filter((link) => link && link.trim() !== "").length
        : 0;
    const isSocialLinksComplete = activeSocialLinksCount > 0;

    const isLocationComplete = Boolean(
        location &&
            (location.country ||
                location.state ||
                location.city ||
                (location.latitude !== null && location.latitude !== undefined))
    );

    const isSkillsComplete = skills.length > 0;
    const isExperienceComplete = experiences.length > 0;
    const isEducationComplete = educations.length > 0;
    const isProjectsComplete = projects.length > 0;
    const isCertificatesComplete = certificates.length > 0;
    const isAchievementsComplete = achievements.length > 0;

    const sections = [
        {
            key: "profile",
            title: "Profile",
            description: "Basic info, avatar & bio",
            icon: User,
            href: "/dashboard/profile",
            isComplete: isProfileComplete,
            detail: isProfileComplete ? "Profile configured" : "Not completed",
        },
        {
            key: "social-links",
            title: "Social Links",
            description: "GitHub, LinkedIn & social platforms",
            icon: Share2,
            href: "/dashboard/social-links",
            isComplete: isSocialLinksComplete,
            detail: isSocialLinksComplete
                ? `${activeSocialLinksCount} link(s) added`
                : "Not completed",
        },
        {
            key: "location",
            title: "Location",
            description: "City, state & coordinates",
            icon: MapPin,
            href: "/dashboard/location",
            isComplete: isLocationComplete,
            detail: isLocationComplete
                ? [location?.city, location?.country].filter(Boolean).join(", ") || "Location set"
                : "Not completed",
        },
        {
            key: "skills",
            title: "Skills",
            description: "Technical skills & frameworks",
            icon: Code2,
            href: "/dashboard/skills",
            isComplete: isSkillsComplete,
            detail: isSkillsComplete ? `${skills.length} skill(s) added` : "Not completed",
        },
        {
            key: "experience",
            title: "Experience",
            description: "Work history & internships",
            icon: Briefcase,
            href: "/dashboard/experience",
            isComplete: isExperienceComplete,
            detail: isExperienceComplete
                ? `${experiences.length} experience(s) added`
                : "Not completed",
        },
        {
            key: "education",
            title: "Education",
            description: "Degrees, GPA & academic background",
            icon: GraduationCap,
            href: "/dashboard/education",
            isComplete: isEducationComplete,
            detail: isEducationComplete
                ? `${educations.length} education entry/entries`
                : "Not completed",
        },
        {
            key: "projects",
            title: "Projects",
            description: "Built projects & applications",
            icon: FolderGit2,
            href: "/dashboard/projects",
            isComplete: isProjectsComplete,
            detail: isProjectsComplete ? `${projects.length} project(s) added` : "Not completed",
        },
        {
            key: "certificates",
            title: "Certificates",
            description: "Licenses & verified credentials",
            icon: Award,
            href: "/dashboard/certificates",
            isComplete: isCertificatesComplete,
            detail: isCertificatesComplete
                ? `${certificates.length} certificate(s) added`
                : "Not completed",
        },
        {
            key: "achievements",
            title: "Achievements",
            description: "Awards, honors & milestones",
            icon: Trophy,
            href: "/dashboard/achievements",
            isComplete: isAchievementsComplete,
            detail: isAchievementsComplete
                ? `${achievements.length} achievement(s) added`
                : "Not completed",
        },
    ];

    const completedSectionsCount = sections.filter((s) => s.isComplete).length;
    const completionPercentage = Math.round((completedSectionsCount / sections.length) * 100);

    const publicUrl = profile?.username ? `${typeof window !== "undefined" ? window.location.origin : ""}/${profile.username}` : null;

    const copyPublicLink = () => {
        if (!publicUrl) return;
        navigator.clipboard.writeText(publicUrl);
        toast.success("Portfolio link copied to clipboard!");
    };

    if (initialLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <Skeleton className="h-44 w-full rounded-3xl" />
                <Skeleton className="h-32 w-full rounded-2xl" />
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <Skeleton key={i} className="h-36 w-full rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-fuchsia-600/20 p-8 sm:p-10 shadow-xl">
                <div className="relative z-10 space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Dashboard Overview</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Welcome back, {profile?.display_name || user?.email || "Creator"} 👋
                    </h1>
                    <p className="max-w-2xl text-base text-zinc-300 leading-relaxed">
                        Track your portfolio section completion. Completing every module helps recruiters and viewers get a comprehensive understanding of your technical profile.
                    </p>
                    {profile?.username && (
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                            <Button asChild size="sm" className="rounded-xl gap-2 font-semibold">
                                <Link href={`/${profile.username}`} target="_blank">
                                    <Globe className="h-4 w-4" />
                                    View Public Portfolio
                                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                                </Link>
                            </Button>
                            {publicUrl && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copyPublicLink}
                                    className="rounded-xl gap-2 border-white/20 text-white hover:bg-white/10"
                                >
                                    <Copy className="h-4 w-4" />
                                    Copy Portfolio Link
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Portfolio Completion Progress */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        Portfolio Progress
                    </h2>
                    <span className="text-sm font-semibold text-violet-400">
                        {completedSectionsCount} of {sections.length} Sections Completed
                    </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-md p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-white">
                            {completionPercentage}% <span className="text-sm font-normal text-zinc-400">Completed</span>
                        </span>
                        <span className="text-xs text-zinc-400">
                            {completionPercentage === 100
                                ? "🎉 All sections completed! Your portfolio is 100% complete."
                                : `${sections.length - completedSectionsCount} remaining section(s) to complete`}
                        </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-3.5 w-full overflow-hidden rounded-full bg-zinc-800 p-0.5 border border-white/5">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 transition-all duration-700 ease-out shadow-sm"
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                </div>
            </section>

            {/* Section Completion Cards Grid */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white tracking-tight">
                    Portfolio Sections
                </h2>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {sections.map((sec) => {
                        const Icon = sec.icon;
                        return (
                            <Link
                                key={sec.key}
                                href={sec.href}
                                className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                                    sec.isComplete
                                        ? "border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50 hover:bg-emerald-950/20"
                                        : "border-white/10 bg-zinc-900/60 hover:border-white/20 hover:bg-zinc-900/90"
                                }`}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                                            sec.isComplete
                                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                                : "border-white/10 bg-white/5 text-zinc-400 group-hover:text-white"
                                        }`}>
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        {sec.isComplete ? (
                                            <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 gap-1 text-[11px] font-semibold">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Done
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[11px]">
                                                Incomplete
                                            </Badge>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors flex items-center gap-1.5">
                                            {sec.title}
                                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </h3>
                                        <p className="mt-1 text-xs text-zinc-400">
                                            {sec.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-medium">
                                    <span className={sec.isComplete ? "text-emerald-400" : "text-zinc-500"}>
                                        {sec.detail}
                                    </span>
                                    <span className="text-violet-400 group-hover:underline">
                                        Manage &rarr;
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Publish Status Section */}
            <section
                className={`rounded-2xl border p-6 shadow-md transition-all ${
                    profile?.is_published
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-violet-500/20 bg-violet-500/10"
                }`}
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                Portfolio Publication Status
                            </h2>
                            {profile?.is_published ? (
                                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                    Live & Published
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="border-amber-500/40 text-amber-300 bg-amber-500/10">
                                    Unpublished
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-zinc-300">
                            {profile?.is_published
                                ? `Your portfolio is published and accessible to the public at /${profile.username}.`
                                : "Your portfolio is currently hidden from public view. Edit your Profile section to publish your portfolio when ready."}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {profile?.username && (
                            <Button asChild variant={profile?.is_published ? "default" : "secondary"} className="rounded-xl">
                                <Link href={`/${profile.username}`} target="_blank">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    {profile?.is_published ? "Visit Public Site" : "Preview Site"}
                                </Link>
                            </Button>
                        )}
                        <Button asChild variant="outline" className="rounded-xl border-white/20 text-white hover:bg-white/10">
                            <Link href="/dashboard/profile">
                                Edit Profile & Publish Settings
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}