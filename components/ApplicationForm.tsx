"use client";

import { FormEvent, useState } from "react";

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="section confirmation" aria-live="polite">
        <h2>Assessment received</h2>
        <p>
          This static MVP does not submit data to a backend yet. The next implementation phase should add secure storage,
          consent records, and review workflows before collecting real applicant information.
        </p>
      </section>
    );
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <label>
        Full name
        <input name="fullName" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Phone or WhatsApp
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        Country of residence
        <input name="country" type="text" autoComplete="country-name" required />
      </label>
      <label>
        Professional background
        <input name="background" type="text" required />
      </label>
      <label>
        Social intent
        <textarea name="intent" rows={4} required />
      </label>
      <label>
        Values and lifestyle preferences
        <textarea name="values" rows={4} required />
      </label>
      <label className="checkbox-row">
        <input name="ageConfirmed" type="checkbox" required />
        I confirm I am at least 18 years old.
      </label>
      <label className="checkbox-row">
        <input name="serviceConsent" type="checkbox" required />
        I consent to being contacted about this private assessment.
      </label>
      <label className="checkbox-row">
        <input name="marketingConsent" type="checkbox" />
        I separately consent to future marketing contact. I understand this is optional.
      </label>
      <label className="checkbox-row">
        <input name="conductAgreement" type="checkbox" required />
        I agree to respectful conduct, truthful information, and independent mutual consent before any connection.
      </label>
      <button className="button primary" type="submit">
        Submit Private Assessment
      </button>
    </form>
  );
}
