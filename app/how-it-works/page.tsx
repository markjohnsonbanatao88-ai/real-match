import { HowItWorksSteps } from "@/components/HowItWorksSteps";

export default function HowItWorksPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">The process</p>
        <h1>How it works</h1>
        <p>
          Real Match is built around verified identity, a real matchmaker who gets to know you, hand-selected
          introductions, and mutual consent before anyone connects.
        </p>
      </section>
      <HowItWorksSteps />
    </>
  );
}
