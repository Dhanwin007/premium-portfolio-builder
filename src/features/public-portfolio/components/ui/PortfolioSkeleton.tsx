"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioSkeleton() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12 animate-pulse">
            {/* Cover Skeleton */}
            <Skeleton className="h-44 sm:h-60 md:h-72 w-full rounded-2xl" />

            {/* Profile Skeleton */}
            <div className="flex flex-col items-center gap-4 -mt-20 sm:-mt-24">
                <Skeleton className="h-28 w-28 sm:h-36 sm:w-36 rounded-full border-4 border-background" />
                <Skeleton className="h-8 w-48 rounded-lg" />
                <Skeleton className="h-4 w-64 rounded-md" />
                <Skeleton className="h-12 w-full max-w-lg rounded-xl" />
                <div className="flex gap-3 pt-2">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
            </div>

            {/* Skills Skeleton */}
            <div className="space-y-4 pt-6">
                <Skeleton className="h-8 w-40 rounded-lg" />
                <div className="flex flex-wrap gap-3">
                    <Skeleton className="h-9 w-24 rounded-xl" />
                    <Skeleton className="h-9 w-32 rounded-xl" />
                    <Skeleton className="h-9 w-28 rounded-xl" />
                    <Skeleton className="h-9 w-20 rounded-xl" />
                    <Skeleton className="h-9 w-36 rounded-xl" />
                </div>
            </div>

            {/* Projects Skeleton */}
            <div className="space-y-6 pt-6">
                <Skeleton className="h-8 w-36 rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-64 w-full rounded-2xl" />
                    <Skeleton className="h-64 w-full rounded-2xl" />
                    <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
}

export function PortfolioNotFound({ username }: { username?: string }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-zinc-950 text-foreground cinematic-noise-bg">
            <div className="max-w-md w-full space-y-6 rounded-3xl border border-red-900/30 bg-zinc-900/80 backdrop-blur-xl p-8 shadow-2xl crimson-glow">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-950/80 text-red-500 border border-red-800/40 text-2xl font-black tracking-widest shadow-inner">
                    404
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-black tracking-tight crimson-gradient-text uppercase">Portfolio Not Found</h1>
                    <p className="text-sm text-zinc-400">
                        {username ? `No public portfolio located for "@${username}".` : "The requested portfolio does not exist or is unavailable."}
                    </p>
                </div>
                <a
                    href="/"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-red-700 to-red-900 px-6 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-red-950/50 border border-red-600/40 transition-all hover:scale-105 hover:border-red-500"
                >
                    Return to Home
                </a>
            </div>
        </main>
    );
}
