import { MemberStandards } from "@/components/MemberStandards";
import { SafetyPrinciples } from "@/components/SafetyPrinciples";

export default function SafetyPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Safety</p>
        <h1>Consent, dignity, and documentation</h1>
        <p>
          Safety is not a marketing claim. It must be implemented through member standards, reporting paths, audit logs, and clear boundaries.
        </p>
      </section>
      <SafetyPrinciples />
      <MemberStandards />
    </>
  );
}
