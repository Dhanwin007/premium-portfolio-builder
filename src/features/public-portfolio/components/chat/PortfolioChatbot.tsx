"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, User, Loader2, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { PublicPortfolio } from "@/features/public-portfolio/types";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    isError?: boolean;
}

interface PortfolioChatbotProps {
    portfolio: PublicPortfolio;
}

export default function PortfolioChatbot({ portfolio }: PortfolioChatbotProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConfirmClear, setShowConfirmClear] = useState(false);

    const displayName = portfolio.profile?.display_name || portfolio.profile?.username || "this creator";
    const username = portfolio.profile?.username;

    const initialWelcomeMessage: Message = {
        id: "welcome-1",
        role: "assistant",
        content: `Hi! I'm the AI Assistant for **${displayName}**'s portfolio.\n\nAsk me anything about their projects, skills, experience, education, or achievements!`,
        timestamp: new Date(),
    };

    const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen, messages, loading]);

    const handleClearChat = () => {
        setMessages([
            {
                id: `welcome-${Date.now()}`,
                role: "assistant",
                content: `Hi! I'm the AI Assistant for **${displayName}**'s portfolio.\n\nAsk me anything about their projects, skills, experience, education, or achievements!`,
                timestamp: new Date(),
            },
        ]);
        setShowConfirmClear(false);
    };

    const handleSendMessage = async (textToSend?: string) => {
        const queryText = (textToSend || input).trim();
        if (!queryText || loading || !username) return;

        const userMsgId = `user-${Date.now()}`;
        const newUserMsg: Message = {
            id: userMsgId,
            role: "user",
            content: queryText,
            timestamp: new Date(),
        };

        // Prepare history before updating state
        const historyForApi = messages
            .filter((m) => !m.isError)
            .map((m) => ({ role: m.role, content: m.content }));

        setMessages((prev) => [...prev, newUserMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/portfolio-chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    message: queryText,
                    history: historyForApi,
                }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                const errorMsg = data.error || "Failed to reach AI service. Please try again.";
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `err-${Date.now()}`,
                        role: "assistant",
                        content: `⚠️ ${errorMsg}`,
                        timestamp: new Date(),
                        isError: true,
                    },
                ]);
            } else if (data.answer) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `assistant-${Date.now()}`,
                        role: "assistant",
                        content: data.answer,
                        timestamp: new Date(),
                    },
                ]);
            }
        } catch (err: unknown) {
            console.error("Chat request error:", err);
            setMessages((prev) => [
                ...prev,
                {
                    id: `err-${Date.now()}`,
                    role: "assistant",
                    content: "⚠️ Network error. Please check your connection and try again.",
                    timestamp: new Date(),
                    isError: true,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const suggestedPrompts = [
        "What projects has this person built?",
        "What are their key skills & tech stack?",
        "Tell me about their work experience.",
    ];

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto select-none">
            {/* Expanded Chat Panel */}
            {isOpen && (
                <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[410px] h-[560px] max-h-[82vh] rounded-2xl bg-[#0b0908]/95 border border-red-900/30 dark:border-red-950/40 backdrop-blur-xl shadow-2xl shadow-red-950/20 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="relative px-4 py-3.5 bg-gradient-to-r from-red-950/40 via-stone-900/60 to-stone-900/80 border-b border-red-900/20 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-amber-700 text-white shadow-md shadow-red-900/40">
                                <Sparkles className="w-4 h-4" />
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0b0908]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-stone-100 flex items-center gap-1.5 leading-tight">
                                    {displayName}&apos;s AI Assistant
                                </h3>
                                <p className="text-[11px] text-amber-500/80 font-medium">
                                    Ask about projects, skills & background
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            {/* Clear Chat Button */}
                            <button
                                onClick={() => {
                                    if (messages.length > 1) {
                                        setShowConfirmClear(true);
                                    } else {
                                        handleClearChat();
                                    }
                                }}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-stone-800/60 transition-colors"
                                title="Clear chat"
                                aria-label="Clear chat"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Close Chat Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/60 transition-colors"
                                aria-label="Close Chat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Inline Confirmation Bar */}
                    {showConfirmClear && (
                        <div className="px-4 py-2 bg-red-950/90 border-b border-red-900/40 flex items-center justify-between text-xs text-stone-200 animate-in fade-in duration-150">
                            <span className="font-medium text-[11px] text-stone-200">Clear this conversation?</span>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setShowConfirmClear(false)}
                                    className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleClearChat}
                                    className="px-2 py-0.5 rounded bg-red-700 hover:bg-red-600 text-white font-medium text-[11px] transition-colors shadow-sm"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-stone-200 scrollbar-thin scrollbar-thumb-stone-800">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-start gap-2.5 ${
                                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                            >
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                                        msg.role === "user"
                                            ? "bg-amber-600/30 text-amber-300 border border-amber-500/30"
                                            : msg.isError
                                            ? "bg-red-950 text-red-400 border border-red-800/50"
                                            : "bg-red-950/80 text-red-400 border border-red-800/40"
                                    }`}
                                >
                                    {msg.role === "user" ? (
                                        <User className="w-3.5 h-3.5" />
                                    ) : (
                                        <Bot className="w-3.5 h-3.5" />
                                    )}
                                </div>

                                <div
                                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                                        msg.role === "user"
                                            ? "bg-gradient-to-r from-red-950/70 to-stone-900/90 text-stone-100 border border-red-900/30 rounded-tr-none"
                                            : msg.isError
                                            ? "bg-red-950/40 text-red-300 border border-red-900/50 rounded-tl-none"
                                            : "bg-stone-900/90 text-stone-200 border border-stone-800/60 rounded-tl-none"
                                    }`}
                                >
                                    {msg.role === "user" ? (
                                        <div className="whitespace-pre-wrap break-words text-xs">
                                            {msg.content}
                                        </div>
                                    ) : (
                                        <div className="text-xs space-y-1.5 break-words">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h1: ({ children }) => (
                                                        <h1 className="text-sm font-bold text-amber-400 mt-2 mb-1.5 border-b border-red-900/30 pb-0.5">
                                                            {children}
                                                        </h1>
                                                    ),
                                                    h2: ({ children }) => (
                                                        <h2 className="text-xs font-bold text-amber-400/90 mt-2 mb-1">
                                                            {children}
                                                        </h2>
                                                    ),
                                                    h3: ({ children }) => (
                                                        <h3 className="text-xs font-semibold text-stone-100 mt-1.5 mb-1">
                                                            {children}
                                                        </h3>
                                                    ),
                                                    p: ({ children }) => (
                                                        <p className="mb-2 last:mb-0 leading-relaxed text-xs">
                                                            {children}
                                                        </p>
                                                    ),
                                                    strong: ({ children }) => (
                                                        <strong className="font-semibold text-amber-200/90">
                                                            {children}
                                                        </strong>
                                                    ),
                                                    em: ({ children }) => (
                                                        <em className="italic text-stone-300">
                                                            {children}
                                                        </em>
                                                    ),
                                                    ul: ({ children }) => (
                                                        <ul className="list-disc list-inside mb-2 space-y-1 pl-1 text-xs">
                                                            {children}
                                                        </ul>
                                                    ),
                                                    ol: ({ children }) => (
                                                        <ol className="list-decimal list-inside mb-2 space-y-1 pl-1 text-xs">
                                                            {children}
                                                        </ol>
                                                    ),
                                                    li: ({ children }) => (
                                                        <li className="leading-relaxed text-xs">
                                                            {children}
                                                        </li>
                                                    ),
                                                    a: ({ href, children }) => (
                                                        <a
                                                            href={href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-amber-400 underline underline-offset-2 hover:text-amber-300 transition-colors"
                                                        >
                                                            {children}
                                                        </a>
                                                    ),
                                                    blockquote: ({ children }) => (
                                                        <blockquote className="border-l-2 border-amber-500/60 pl-2.5 py-0.5 my-2 italic text-stone-300 bg-stone-950/40 rounded-r">
                                                            {children}
                                                        </blockquote>
                                                    ),
                                                    pre: ({ children }) => (
                                                        <div className="my-2 overflow-x-auto max-w-full rounded-lg bg-[#080706] border border-stone-800/80 text-[11px] p-2.5 font-mono">
                                                            {children}
                                                        </div>
                                                    ),
                                                    code: ({ className, children }) => {
                                                        const isInline = !className;
                                                        if (isInline) {
                                                            return (
                                                                <code className="bg-stone-950 text-amber-300 px-1.5 py-0.5 rounded text-[11px] font-mono border border-stone-800">
                                                                    {children}
                                                                </code>
                                                            );
                                                        }
                                                        return (
                                                            <code className="font-mono text-[11px] text-amber-200">
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    table: ({ children }) => (
                                                        <div className="my-2.5 overflow-x-auto max-w-full rounded-lg border border-stone-800/80 bg-stone-950/70">
                                                            <table className="w-full text-left border-collapse text-[11px]">
                                                                {children}
                                                            </table>
                                                        </div>
                                                    ),
                                                    thead: ({ children }) => (
                                                        <thead className="bg-stone-900/90 border-b border-stone-800 text-stone-300">
                                                            {children}
                                                        </thead>
                                                    ),
                                                    tbody: ({ children }) => (
                                                        <tbody className="divide-y divide-stone-800/50">
                                                            {children}
                                                        </tbody>
                                                    ),
                                                    tr: ({ children }) => (
                                                        <tr className="hover:bg-stone-900/40 transition-colors">
                                                            {children}
                                                        </tr>
                                                    ),
                                                    th: ({ children }) => (
                                                        <th className="px-2.5 py-1.5 font-semibold text-amber-400 text-[11px]">
                                                            {children}
                                                        </th>
                                                    ),
                                                    td: ({ children }) => (
                                                        <td className="px-2.5 py-1.5 text-stone-300 text-[11px] whitespace-normal">
                                                            {children}
                                                        </td>
                                                    ),
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    )}

                                    <span className="mt-1 block text-[10px] text-stone-500 text-right opacity-70">
                                        {msg.timestamp.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Loading typing indicator */}
                        {loading && (
                            <div className="flex items-start gap-2.5">
                                <div className="w-6 h-6 rounded-full bg-red-950/80 text-red-400 border border-red-800/40 flex items-center justify-center shrink-0">
                                    <Bot className="w-3.5 h-3.5 animate-pulse" />
                                </div>
                                <div className="bg-stone-900/90 text-stone-400 border border-stone-800/60 rounded-2xl rounded-tl-none px-3.5 py-2.5 flex items-center gap-2">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                                    <span className="text-[11px] font-medium text-stone-400">
                                        Analyzing portfolio context...
                                    </span>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Suggested Prompt Chips (show when message history has only welcome msg) */}
                    {messages.length === 1 && !loading && (
                        <div className="px-3.5 pb-2 pt-1 flex flex-wrap gap-1.5 border-t border-stone-800/40 bg-[#080706]/40">
                            {suggestedPrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(prompt)}
                                    className="text-[11px] bg-red-950/30 hover:bg-red-900/40 text-stone-300 hover:text-stone-100 border border-red-900/30 rounded-full px-2.5 py-1 transition-all text-left truncate max-w-full"
                                >
                                    ✨ {prompt}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Footer */}
                    <div className="p-3 bg-stone-950/80 border-t border-stone-800/60 flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                            placeholder={`Ask about ${displayName}...`}
                            className="flex-1 bg-stone-900/90 text-stone-100 placeholder-stone-500 text-xs px-3 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-red-800/60 transition-colors disabled:opacity-50"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={loading || !input.trim()}
                            className="p-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white disabled:opacity-40 disabled:hover:from-red-700 disabled:hover:to-amber-700 transition-all shadow-md shadow-red-950/30 shrink-0"
                            aria-label="Send Message"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-red-800 via-amber-800 to-red-900 text-white shadow-xl shadow-red-950/50 hover:shadow-red-900/60 hover:scale-105 active:scale-95 border border-red-600/40 transition-all duration-300"
                aria-label="Toggle AI Portfolio Chatbot"
            >
                <div className="relative">
                    <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-stone-900 animate-pulse" />
                </div>
                <span className="text-xs font-semibold tracking-wide">
                    {isOpen ? "Close Chat" : "Ask AI Assistant"}
                </span>
            </button>
        </div>
    );
}
