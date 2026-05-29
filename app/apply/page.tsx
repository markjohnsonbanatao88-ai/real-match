import { ApplicationForm } from "@/components/ApplicationForm";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";

export default function ApplyPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Private assessment</p>
        <h1>Apply for review</h1>
        <p>
          This static MVP does not submit, store, or process real applicant data yet. Real submissions should only be
          enabled after secure backend, consent records, and review workflows are implemented.
        </p>
      </section>
      <section className="section">
        <ApplicationForm />
      </section>
      <LegalDisclaimer />
    </>
  );
}
