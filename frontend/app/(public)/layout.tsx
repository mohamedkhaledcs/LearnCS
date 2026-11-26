import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LearnCS - The Computer Science Learning OS",
  description: "An adaptive, premium Computer Science learning platform.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 
        TODO: Add Public Navbar 
      */}
      <main className="flex-1">{children}</main>
      {/* 
        TODO: Add Public Footer 
      */}
    </div>
  );
}
