"use client";

import { Award, ExternalLink, FileText, Calendar } from "lucide-react";
import type { Certificate } from "@/features/certificates/types";
import { Button } from "@/components/ui/button";

interface CertificatesSectionProps {
    certificates: Certificate[];
}

function formatDate(dateStr: string | null): string {
    if (!dateStr) return "";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
        return dateStr;
    }
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
    if (!certificates || certificates.length === 0) {
        return null;
    }

    const sortedCertificates = [...certificates].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

    return (
        <section id="certificates" className="w-full space-y-8 pt-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b dark:border-zinc-800/80 border-stone-300 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/60 text-red-400 border border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
                    <Award className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wider">
                        LICENSES &amp; CERTIFICATIONS
                    </h2>
                    <p className="text-xs font-tech-mono tracking-widest dark:text-zinc-400 text-stone-600 uppercase">
                        VERIFIED TECHNICAL CREDENTIALS
                    </p>
                </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCertificates.map((item) => {
                    const issueDate = formatDate(item.issue_date);

                    return (
                        <div
                            key={item.id}
                            className="flex flex-col justify-between rounded-2xl border dark:border-zinc-800/80 border-stone-300 dark:bg-[#120f0d]/90 bg-white/95 backdrop-blur-xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.9)] hover:border-red-600/60 hover:shadow-[0_15px_40px_rgba(185,28,28,0.2)] transition-all space-y-4 group noir-card"
                        >
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl dark:bg-black bg-stone-100 border dark:border-zinc-800 border-stone-300 text-red-500 group-hover:border-red-600/50 transition-all">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-cinematic font-bold dark:text-zinc-100 text-stone-900 uppercase tracking-wide group-hover:text-red-500 transition-colors leading-snug">
                                            {item.title}
                                        </h3>
                                        {item.issuer && (
                                            <p className="text-xs font-tech-mono font-bold text-red-500">
                                                {item.issuer}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {issueDate && (
                                    <div className="flex items-center gap-1.5 text-xs font-tech-mono dark:text-zinc-400 text-stone-600 pt-1">
                                        <Calendar className="h-3.5 w-3.5 text-red-500" />
                                        <span>Issued {issueDate}</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2 pt-3 border-t dark:border-zinc-800/80 border-stone-200">
                                {item.credential_url && (
                                    <Button asChild size="sm" variant="outline" className="rounded-xl gap-1.5 text-xs font-tech-mono font-bold uppercase tracking-wider h-9 flex-1 dark:bg-black bg-stone-100 border dark:border-zinc-800 border-stone-300 dark:text-zinc-300 text-stone-800 dark:hover:text-white hover:text-stone-950 hover:bg-stone-200 transition-all">
                                        <a href={item.credential_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-3.5 w-3.5 text-red-500" />
                                            <span>VERIFY LINK</span>
                                        </a>
                                    </Button>
                                )}
                                {item.certificate_file_url && (
                                    <Button asChild size="sm" variant="secondary" className="rounded-xl gap-1.5 text-xs font-tech-mono font-bold uppercase tracking-wider h-9 flex-1 dark:bg-black bg-stone-100 border dark:border-zinc-800 border-stone-300 dark:text-zinc-300 text-stone-800 dark:hover:text-white hover:text-stone-950 hover:bg-stone-200 transition-all">
                                        <a href={item.certificate_file_url} target="_blank" rel="noopener noreferrer" download>
                                            <FileText className="h-3.5 w-3.5 text-red-500" />
                                            <span>DOCUMENT</span>
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

