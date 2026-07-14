import type { Metadata } from "next";
import Link from "next/link";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { Comparison } from "@/components/marketing/Comparison";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Five steps from private application to a mutually agreed introduction — human review, curated introductions, and consent at every stage."
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">The process</p>
          <h1>How it works</h1>
          <p className="lede">
            No public profiles. No browsing. A person reads your application, gets to know
            what you are looking for, and introduces you only when both sides say yes.
          </p>
        </div>
      </section>
      <ProcessSteps />
      <Comparison />
      <section className="section">
        <div className="wrap">
          <h2>Ready when you are.</h2>
          <p className="lede" style={{ margin: "18px 0 30px" }}>
            Applying costs nothing, and there is no obligation at any stage.
          </p>
          <Link className="button primary" href="/apply">
            Begin private application
          </Link>
        </div>
      </section>
    </>
  );
}
