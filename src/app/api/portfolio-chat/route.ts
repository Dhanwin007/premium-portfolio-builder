import { NextResponse } from "next/server";
import { publicPortfolioService } from "@/services/public-portfolio/public-portfolio.service";
import { buildPortfolioContext } from "@/features/public-portfolio/utils/portfolio-context";
import { groqChatService, type ChatMessage } from "@/services/chatbot/groq-chat.service";

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => null);

        if (!body) {
            return NextResponse.json(
                { error: "Invalid JSON request body." },
                { status: 400 }
            );
        }

        const { username, message, history } = body;

        if (!username || typeof username !== "string" || !username.trim()) {
            return NextResponse.json(
                { error: "Username is required." },
                { status: 400 }
            );
        }

        if (!message || typeof message !== "string" || !message.trim()) {
            return NextResponse.json(
                { error: "Message cannot be empty." },
                { status: 400 }
            );
        }

        const validHistory: ChatMessage[] = Array.isArray(history)
            ? history.filter(
                  (msg): msg is ChatMessage =>
                      Boolean(msg) &&
                      (msg.role === "user" || msg.role === "assistant") &&
                      typeof msg.content === "string" &&
                      Boolean(msg.content.trim())
              )
            : [];

        // 1. Fetch public portfolio on backend using existing service
        const portfolioResult = await publicPortfolioService.getPublicPortfolio(
            username.trim()
        );

        if (portfolioResult.error || !portfolioResult.data) {
            return NextResponse.json(
                { error: "Portfolio not found." },
                { status: 404 }
            );
        }

        const portfolio = portfolioResult.data;

        // Check if portfolio is published
        if (portfolio.profile && portfolio.profile.is_published === false) {
            return NextResponse.json(
                { error: "This portfolio is currently private or unpublished." },
                { status: 403 }
            );
        }

        // 2. Build clean public-only portfolio context
        const context = buildPortfolioContext(portfolio);

        // 3. Generate response using Groq Chat Service
        const chatResult = await groqChatService.generateResponse(
            context,
            message.trim(),
            validHistory
        );

        if (chatResult.error || !chatResult.answer) {
            return NextResponse.json(
                { error: chatResult.error || "Failed to generate answer from AI service." },
                { status: 500 }
            );
        }

        return NextResponse.json({ answer: chatResult.answer });
    } catch (err: unknown) {
        console.error("Error in /api/portfolio-chat route:", err);
        const errMsg = err instanceof Error ? err.message : "An unexpected server error occurred.";
        return NextResponse.json({ error: errMsg }, { status: 500 });
    }
}
