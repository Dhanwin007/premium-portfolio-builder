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
        <section id="certificates" className="w-full space-y-8 pt-6">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-amber-900/40 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/80 text-amber-400 border border-amber-600/50 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                    <Award className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-3xl sm:text-4xl font-chicano gold-foil-text tracking-wide uppercase">
                        CREDENTIALS // CERTIFICATES
                    </h2>
                    <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
                        [VERIFIED TECHNICAL LICENSES &amp; CERTIFICATIONS // EST. 1990]
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
                            className="flex flex-col justify-between rounded-2xl border border-amber-900/30 bg-zinc-950/90 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:border-amber-500/50 hover:shadow-[0_10px_30px_rgba(217,119,6,0.2)] transition-all space-y-4 group"
                        >
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-950/80 border border-amber-600/50 text-amber-300 shadow-sm group-hover:scale-110 transition-transform">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-chicano gold-foil-text tracking-wide group-hover:text-amber-300 transition-colors leading-snug">
                                            {item.title}
                                        </h3>
                                        {item.issuer && (
                                            <p className="text-xs font-mono font-bold text-amber-400">
                                                {item.issuer}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {issueDate && (
                                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 pt-1">
                                        <Calendar className="h-3.5 w-3.5 text-amber-500" />
                                        <span>Issued {issueDate}</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-amber-900/30">
                                {item.credential_url && (
                                    <Button asChild size="sm" variant="outline" className="rounded-lg gap-1.5 text-xs font-mono font-bold uppercase tracking-wider h-9 flex-1 bg-zinc-950 border-amber-800/60 text-amber-300 hover:text-amber-100 hover:border-amber-400 hover:bg-amber-950/60 transition-all">
                                        <a href={item.credential_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                                            VERIFY LINK
                                        </a>
                                    </Button>
                                )}
                                {item.certificate_file_url && (
                                    <Button asChild size="sm" variant="secondary" className="rounded-lg gap-1.5 text-xs font-mono font-bold uppercase tracking-wider h-9 flex-1 bg-zinc-950 border-amber-800/60 text-amber-300 hover:text-amber-100 hover:border-amber-400 hover:bg-amber-950/60 transition-all">
                                        <a href={item.certificate_file_url} target="_blank" rel="noopener noreferrer" download>
                                            <FileText className="h-3.5 w-3.5 text-amber-400" />
                                            DOC FILE
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
