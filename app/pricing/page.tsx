import { PricingCards } from "@/components/PricingCards";

export default function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Transparent service fees</h1>
        <p>
          Fees cover matchmaking, profile preparation, coaching, and optional coordination — our work and our time. They
          never buy an outcome, a guaranteed match, or access to another member.
        </p>
      </section>
      <PricingCards />
    </>
  );
}
