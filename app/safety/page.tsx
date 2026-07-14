import { MemberStandards } from "@/components/MemberStandards";
import { SafetyPrinciples } from "@/components/SafetyPrinciples";

export default function SafetyPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Safety</p>
        <h1>Consent, dignity, and clear boundaries</h1>
        <p>
          Safety is not a marketing claim. It is built into how we work: verified members, firm standards, reporting
          paths, and mutual consent before anyone connects.
        </p>
      </section>
      <SafetyPrinciples />
      <MemberStandards />
    </>
  );
}
