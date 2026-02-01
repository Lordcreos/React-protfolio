import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Waves from '@/components/Waves';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Leonardo Sanchez - Senior Full Stack Developer",
  description: "Senior Full Stack Developer with 8+ years of experience. Specialized in React, Node.js, TypeScript, and MongoDB. Building scalable web applications and leading development teams.",
  keywords: ["Leonardo Sanchez", "Senior Full Stack Developer", "React", "Node.js", "TypeScript", "MongoDB", "MERN Stack", "Web Development", "Portfolio"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="App">
            <Navbar />
            <main>{children}</main>
            <Waves />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
