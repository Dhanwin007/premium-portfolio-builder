// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/terms",
    "/privacy",
    "/auth/callback",
    "/api/portfolio-chat",
];

const PROTECTED_ROUTES = [
    "/dashboard",
];

export async function proxy(request: NextRequest) {
    const response = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    const isProtectedRoute = PROTECTED_ROUTES.some(
        (route) =>
            pathname === route ||
            pathname.startsWith(`${route}/`)
    );

    const isPortfolioRoute =
        /^\/[^/]+$/.test(pathname) &&
        !PUBLIC_ROUTES.includes(pathname) &&
        !isProtectedRoute;

    if (isPublicRoute || isPortfolioRoute) {
        if (
            user &&
            (pathname === "/login" ||
                pathname === "/register")
        ) {
            return NextResponse.redirect(
                new URL("/dashboard", request.url)
            );
        }

        return response;
    }

    if (!user) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};