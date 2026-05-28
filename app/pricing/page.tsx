import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { PricingCards } from "@/components/PricingCards";

export default function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Transparent service fees</h1>
        <p>
          Fees cover assessment, consultation readiness, profile preparation, and optional logistical coordination. They do not buy outcomes.
        </p>
      </section>
      <PricingCards />
      <LegalDisclaimer />
    </>
  );
}
