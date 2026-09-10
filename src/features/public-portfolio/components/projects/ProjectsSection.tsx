"use client";

import { useState } from "react";
import { FolderGit2, Star, Layers } from "lucide-react";
import type { Project } from "@/features/projects/types";
import PublicProjectCard from "./PublicProjectCard";
import ProjectDetailsDialog from "./ProjectDetailsDialog";

interface ProjectsSectionProps {
    projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    if (!projects || projects.length === 0) {
        return null;
    }

    const featuredProjects = projects.filter((p) => p.featured);
    const otherProjects = projects.filter((p) => !p.featured);

    // Sort by display_order
    const sortedFeatured = [...featuredProjects].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    const sortedOther = [...otherProjects].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    const hasFeatured = sortedFeatured.length > 0;

    return (
        <section id="projects" className="w-full space-y-10 pt-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b dark:border-zinc-800/80 border-stone-300 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/60 text-red-400 border border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
                    <FolderGit2 className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wider">
                        FEATURED PROJECTS &amp; DOSSIERS
                    </h2>
                    <p className="text-xs font-tech-mono tracking-widest dark:text-zinc-400 text-stone-600 uppercase">
                        ARCHITECTURAL CODEBASES &amp; PRODUCTION SYSTEMS
                    </p>
                </div>
            </div>

            {/* Featured Projects Section */}
            {hasFeatured && (
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-tech-mono uppercase tracking-wider text-amber-400">
                        <Star className="h-4 w-4 fill-current text-amber-400" />
                        <span>HIGHLIGHTED SYSTEM DOSSIERS</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {sortedFeatured.map((project) => (
                            <PublicProjectCard
                                key={project.id}
                                project={project}
                                onSelectProject={(proj) => setSelectedProject(proj)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Other Projects Section */}
            {sortedOther.length > 0 && (
                <div className="space-y-6 pt-4">
                    {hasFeatured && (
                        <div className="flex items-center gap-2 text-xs font-tech-mono uppercase tracking-wider dark:text-zinc-400 text-stone-600 border-t dark:border-zinc-800/60 border-stone-300 pt-6">
                            <Layers className="h-4 w-4 text-zinc-500" />
                            <span>ADDITIONAL CODEBASES &amp; REPOSITORIES</span>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedOther.map((project) => (
                            <PublicProjectCard
                                key={project.id}
                                project={project}
                                onSelectProject={(proj) => setSelectedProject(proj)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Project Details Modal */}
            <ProjectDetailsDialog
                project={selectedProject}
                open={!!selectedProject}
                onOpenChange={(open) => {
                    if (!open) setSelectedProject(null);
                }}
            />
        </section>
    );
}

