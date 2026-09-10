"use client";

import { useState } from "react";
import { FolderGit2 } from "lucide-react";
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

    // Sort projects: featured first, then by display_order or created_at
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.display_order ?? 0) - (b.display_order ?? 0);
    });

    return (
        <section id="projects" className="w-full space-y-8 pt-6">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-amber-900/40 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/80 text-amber-400 border border-amber-600/50 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                    <FolderGit2 className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-3xl sm:text-4xl font-chicano gold-foil-text tracking-wide uppercase">
                        DOSSIER // FEATURED_WORKS
                    </h2>
                    <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
                        [CLASSIFIED CODEBASE ARCHITECTURE &amp; LOWRIDER SYSTEMS // EST. 1990]
                    </p>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {sortedProjects.map((project) => (
                    <PublicProjectCard
                        key={project.id}
                        project={project}
                        onSelectProject={(proj) => setSelectedProject(proj)}
                    />
                ))}
            </div>

            {/* Project Details Dialog */}
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
