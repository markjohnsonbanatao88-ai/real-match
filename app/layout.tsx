import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Real Match | Private Matchmaking",
  description:
    "A discreet, personal matchmaking service that introduces verified members who are serious about finding love — with mutual consent at every step."
};

// Adds the reveal-ready flag before paint (unless the visitor prefers reduced
// motion) so scroll animations never cause a flash of hidden content.
const revealBootstrap =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reveal-ready')}}catch(e){}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
