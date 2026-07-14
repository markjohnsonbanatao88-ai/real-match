import { ApplicationForm } from "@/components/ApplicationForm";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";

export default function ApplyPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Application</p>
        <h1>Apply to join Real Match</h1>
        <p>
          Tell us about yourself and what you are looking for. A matchmaker reviews every application personally. This is
          an early preview, so your details are not submitted or stored yet while we finish building secure intake.
        </p>
      </section>
      <section className="section">
        <ApplicationForm />
      </section>
      <LegalDisclaimer />
    </>
  );
}
