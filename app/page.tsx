"use client";

import React, { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessage: Message = { role: "user", content: input.trim() };
    const nextMessages = [...messages, newMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply ?? "",
      };
      setMessages([...nextMessages, assistantMessage]);
    } catch (err: any) {
      const assistantMessage: Message = {
        role: "assistant",
        content:
          "Sorry, something went wrong contacting the AI service. " +
          (err?.message ?? ""),
      };
      setMessages([...nextMessages, assistantMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#0f172a",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: "640px", width: "100%" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "12px" }}>
          Wix AI Chatbot
        </h1>
        <p style={{ marginBottom: "16px", color: "#e2e8f0" }}>
          Ask me anything. This is a minimal chatbot built with Next.js and Vercel.
        </p>

        <div
          style={{
            border: "1px solid #1e293b",
            borderRadius: "8px",
            padding: "12px",
            backgroundColor: "#020617",
            maxHeight: "60vh",
            overflowY: "auto",
            marginBottom: "12px",
          }}
        >
          {messages.length === 0 && (
            <div style={{ color: "#64748b" }}>
              Start the conversation by typing a message below.
            </div>
          )}
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "8px",
                textAlign: m.role === "user" ? "right" : "left",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 10px",
                  borderRadius: "12px",
                  backgroundColor:
                    m.role === "user" ? "#1d4ed8" : "#111827",
                  color: "white",
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ color: "#64748b" }}>Thinking…</div>
          )}
        </div>

        <form
          onSubmit={handleSend}
          style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "999px",
              border: "1px solid #1e293b",
              backgroundColor: "#020617",
              color: "white",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: loading ? "#4b5563" : "#22c55e",
              color: "#020617",
              cursor: loading ? "default" : "pointer",
              fontWeight: 600,
            }}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
