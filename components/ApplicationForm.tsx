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
        <h2>Thanks — your application preview is ready</h2>
        <p>
          This is an early preview, so your details are not saved or sent yet while we finish building secure intake,
          consent records, and identity review. When those are live, a matchmaker will review your application and reach
          out about next steps.
        </p>
      </section>
    );
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <p className="form-warning">
        Preview only: this form does not save or send your information yet. Please don&apos;t enter sensitive details.
      </p>
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
        A little about you
        <input name="background" type="text" required />
      </label>
      <label>
        What are you hoping to find?
        <textarea name="intent" rows={4} required />
      </label>
      <label>
        Values and lifestyle that matter to you
        <textarea name="values" rows={4} required />
      </label>
      <label className="checkbox-row">
        <input name="ageConfirmed" type="checkbox" required />
        I confirm I am at least 18 years old.
      </label>
      <label className="checkbox-row">
        <input name="serviceConsent" type="checkbox" required />
        I consent to being contacted by a matchmaker about my application.
      </label>
      <label className="checkbox-row">
        <input name="marketingConsent" type="checkbox" />
        I separately consent to occasional marketing updates. I understand this is optional.
      </label>
      <label className="checkbox-row">
        <input name="conductAgreement" type="checkbox" required />
        I agree to respectful conduct, truthful information, and mutual consent before any introduction.
      </label>
      <button className="button primary" type="submit">
        Submit application preview
      </button>
    </form>
  );
}
