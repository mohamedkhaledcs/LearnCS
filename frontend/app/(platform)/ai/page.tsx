"use client";

import React, { useState, useEffect, useRef } from "react";
import { AiService } from "@/lib/api/ai.service";
import type { AiConversationDetailsDto, AiMessageDto } from "@/types/ai";
import { Bot, Send, User, Loader2, Sparkles, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import ReactMarkdown from "react-markdown";
import { useI18n } from "@/lib/i18n/i18n-context";

export default function AiMentorPage() {
  const { t, language, isRtl } = useI18n();
  const [conversation, setConversation] = useState<AiConversationDetailsDto | null>(null);
  const [messages, setMessages] = useState<AiMessageDto[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Try to load an existing active conversation, or start a new one
    const init = async () => {
      try {
        const convos = await AiService.getMyConversations();
        const active = convos.find(c => c.isActive);
        
        if (active) {
          const details = await AiService.getConversationById(active.id);
          setConversation(details);
          setMessages(details.messages);
        }
      } catch (err) {
        console.error("Failed to load conversations, using fallback UI", err);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartNew = async () => {
    setIsInitializing(true);
    try {
      const newConvo = await AiService.startConversation({ topic: "General CS Help" });
      setConversation(newConvo);
      setMessages(newConvo.messages);
    } catch (err) {
      console.error("Failed to start conversation", err);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !conversation || isLoading) return;

    const userText = input.trim();
    setInput("");
    
    // Remove previous error if exists
    setMessages(prev => prev.filter(m => m.id !== "error-msg"));
    
    // Optimistically add user message
    const tempUserMsg: AiMessageDto = {
      id: Date.now().toString(),
      conversationId: conversation.id,
      role: "User",
      content: userText,
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const responseMsg = await AiService.sendMessage(conversation.id, { content: userText });
      setMessages(prev => [...prev, responseMsg]);
    } catch (err) {
      console.error("Failed to send message", err);
      // Graceful error bubble
      setMessages(prev => [...prev, {
        id: "error-msg",
        conversationId: conversation.id,
        role: "Assistant",
        content: t.aiPage.connectionError,
        createdAt: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!conversation) {
    return (
      <div dir={isRtl ? "rtl" : "ltr"} className="h-[80vh] flex flex-col items-center justify-center max-w-2xl mx-auto text-center px-4">
        <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center mb-6">
          <Sparkles className="w-10 h-10 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-black text-white mb-4">{t.aiPage.emptyTitle}</h1>
        <p className="text-neutral-400 mb-8 text-lg">
          {t.aiPage.emptyDesc}
        </p>
        <Button onClick={handleStartNew} className="bg-indigo-600 hover:bg-indigo-500 text-white h-12 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          {t.aiPage.startBtn}
        </Button>
      </div>
    );
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="h-[calc(100vh-8rem)] max-w-5xl mx-auto flex flex-col bg-neutral-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-neutral-950/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.aiPage.headerTitle}</h2>
            <p className="text-xs text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              {t.aiPage.onlineStatus}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={handleStartNew}
          className="border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
          size="sm"
        >
          <MessageSquarePlus className="w-4 h-4 me-2" />
          {t.aiPage.newChat}
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.filter(m => m.role !== "System").map((msg, idx) => {
          const isUser = msg.role === "User";
          return (
            <div key={idx} className={cn("flex items-start gap-4 max-w-[85%]", isUser ? "ml-auto flex-row-reverse" : "mr-auto")}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                isUser ? "bg-indigo-600 border-indigo-500" : "bg-neutral-800 border-neutral-700"
              )}>
                {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl",
                isUser 
                  ? "bg-indigo-600 text-white rounded-tr-sm" 
                  : "bg-neutral-800/80 border border-white/5 text-neutral-200 rounded-tl-sm"
              )}>
                <div className={cn("prose prose-invert max-w-none text-sm md:text-base leading-relaxed", isUser ? "prose-p:text-white" : "")}>
                  {msg.role === "Assistant" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    <p className="m-0 whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex items-start gap-4 max-w-[85%] mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-neutral-500" />
            </div>
            <div className="p-4 rounded-2xl bg-neutral-800/50 border border-white/5 rounded-tl-sm flex gap-1 items-center h-12">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-neutral-950/80 backdrop-blur-md border-t border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.aiPage.placeholder}
            disabled={isLoading}
            className="w-full bg-neutral-900 border border-white/10 rounded-full ps-6 pe-14 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute end-2 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white p-0 flex items-center justify-center disabled:bg-neutral-800 disabled:text-neutral-500 transition-colors"
          >
            <Send className={cn("w-4 h-4", language === "ar" && "rotate-180")} />
          </Button>
        </form>
      </div>
    </div>
  );
}
