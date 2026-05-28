import { HowItWorksSteps } from "@/components/HowItWorksSteps";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";

export default function HowItWorksPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Process</p>
        <h1>How it works</h1>
        <p>
          Real Match is designed around verified identity, respectful intent, independent interest, and optional logistics.
        </p>
      </section>
      <HowItWorksSteps />
      <LegalDisclaimer />
    </>
  );
}
