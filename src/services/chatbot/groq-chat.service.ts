export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export class GroqChatService {
    private apiKey: string | undefined;

    constructor() {
        this.apiKey = process.env.GROQ_API_KEY;
    }

    async generateResponse(
        portfolioContext: string,
        userMessage: string,
        chatHistory: ChatMessage[] = []
    ): Promise<{ answer: string; error?: string }> {
        if (!this.apiKey) {
            return {
                answer: "",
                error: "GROQ_API_KEY is not configured on the server.",
            };
        }

        const systemInstruction = `You are the AI assistant for this portfolio.

Answer the user's question using ONLY the supplied public portfolio context below. Return only the concise final answer. Do not reveal chain-of-thought, internal reasoning, hidden analysis, step-by-step lookup steps, or reasoning process.

PUBLIC PORTFOLIO CONTEXT:
${portfolioContext}

INSTRUCTIONS:
- Answer the user's question directly and concisely based strictly on the portfolio context.
- Do NOT output internal analysis, step-by-step reasoning steps, lookup procedures, or headers like "Reasoning process:" or "Answer (with full reasoning)". Provide only the final answer.
- You can discuss the person's background, skills, projects, work experience, education, certificates, achievements, and professional links.
- Do not invent facts or extrapolate beyond the provided portfolio context.
- If the requested information is not present in the supplied portfolio context, clearly say that the information is not available in this portfolio.
- Do not reveal private, internal, or administrative information.
- If a visitor asks unrelated general questions (e.g. general science, math, general trivia, coding help unrelated to the portfolio), politely explain that you are here specifically to answer questions about this portfolio.
- Keep responses clear, helpful, professional, concise, and structured with markdown formatting where helpful.`;

        const messages: ChatMessage[] = [
            { role: "system", content: systemInstruction },
            ...chatHistory.slice(-6), // Keep up to last 6 messages for conversation context
            { role: "user", content: userMessage },
        ];

        // Active models on Groq in priority order
        const models = [
            "groq/compound",
            "groq/compound-mini",
            "qwen/qwen3.8-27b",
            "openai/gpt-oss-120b",
            "openai/gpt-oss-20b",
        ];

        let lastError = "";

        for (const model of models) {
            try {
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.apiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model,
                        messages,
                        temperature: 0.3,
                        max_tokens: 1000,
                    }),
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    const msg = errData?.error?.message || `Groq API responded with status ${response.status}`;
                    lastError = msg;
                    console.warn(`Groq model ${model} failed: ${msg}`);
                    continue; // try fallback model
                }

                const data = await response.json();
                const messageObj = data?.choices?.[0]?.message;
                // Ignore any explicit reasoning_content / reasoning fields if present in response
                const content = messageObj?.content;

                if (content && typeof content === "string") {
                    const cleanAnswer = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
                    if (cleanAnswer) {
                        return { answer: cleanAnswer };
                    }
                }
            } catch (err: unknown) {
                const errMsg = err instanceof Error ? err.message : String(err);
                lastError = errMsg;
                console.warn(`Groq request error for ${model}: ${errMsg}`);
            }
        }

        return {
            answer: "",
            error: lastError || "Failed to communicate with Groq AI service. Please try again.",
        };
    }
}

export const groqChatService = new GroqChatService();
