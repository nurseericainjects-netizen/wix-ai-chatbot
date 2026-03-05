import "../globals.css";
import React from "react";

export const metadata = {
  title: "Wix AI Chatbot",
  description: "Minimal AI chatbot for Wix, powered by Next.js and Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
