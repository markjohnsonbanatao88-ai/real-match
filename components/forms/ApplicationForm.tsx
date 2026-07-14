"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import {
  ApplicationDraft,
  FieldErrors,
  emptyDraft,
  validateStep
} from "@/lib/validation/application";
import { serviceConfig } from "@/lib/config/site";

const STEP_TITLES = [
  "Basic details",
  "Relationship goals",
  "Lifestyle and values",
  "Preferences and non-negotiables",
  "Privacy, terms, and consent",
  "Review and submit"
];

const FIELD_LABELS: Partial<Record<keyof ApplicationDraft, string>> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone",
  country: "Country of residence",
  city: "City or region",
  age: "Age",
  relationshipGoal: "What you are looking for",
  timeline: "Your readiness",
  whyNow: "Why now",
  values: "Values",
  lifestyle: "Day-to-day life",
  interests: "Interests",
  preferences: "The person you hope to meet",
  nonNegotiables: "Non-negotiables",
  ageConfirmed: "Age confirmation",
  truthfulInfo: "Truthful information",
  termsAgreed: "Terms of Service",
  privacyAcknowledged: "Privacy Notice",
  conductAgreed: "Conduct standards"
};

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<ApplicationDraft>(emptyDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const totalSteps = STEP_TITLES.length;

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  function set<K extends keyof ApplicationDraft>(key: K, value: ApplicationDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) {
        return current;
      }
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function focusField(name: string) {
    document.getElementById(`field-${name}`)?.focus();
  }

  function goNext() {
    const stepErrors = validateStep(step, draft);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      summaryRef.current?.focus();
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, totalSteps));
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < totalSteps) {
      goNext();
      return;
    }
    // Preview mode: no transmission occurs, and we say so plainly.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="confirmation-panel" aria-live="polite">
        <h2>Thank you for walking through the application</h2>
        {serviceConfig.applicationsEnabled ? (
          <p>Your application has been received and will be reviewed personally.</p>
        ) : (
          <>
            <p>
              Real Match is in private preview, so <strong>nothing you entered has been
              saved or sent anywhere</strong> — the form is a demonstration of the real
              application flow.
            </p>
            <p>
              When applications open, submissions will be stored securely, reviewed
              personally against documented criteria, and answered by email. The current
              service status is always shown in the banner at the top of this site.
            </p>
          </>
        )}
      </section>
    );
  }

  const errorEntries = Object.entries(errors) as [keyof ApplicationDraft, string][];

  return (
    <form className="form-shell" onSubmit={handleSubmit} noValidate>
      <div className="form-progress">
        <div>
          <p className="step-label">
            Step {step} of {totalSteps}
          </p>
          <p className="step-title" ref={headingRef} tabIndex={-1}>
            {STEP_TITLES[step - 1]}
          </p>
        </div>
      </div>

      {!serviceConfig.applicationsEnabled && step === 1 ? (
        <p className="notice" style={{ marginBottom: 26 }}>
          Private preview: this form is a demonstration. Nothing you enter is saved or
          transmitted, so please avoid entering sensitive personal details.
        </p>
      ) : null}

      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="polite"
        style={{ outline: "none" }}
      >
        {errorEntries.length > 0 ? (
          <div className="error-summary" role="alert">
            <h3>Please review the following</h3>
            <ul>
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <button type="button" onClick={() => focusField(field)}>
                    {FIELD_LABELS[field] ?? field}: {message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {step === 1 ? (
        <div className="form-fields">
          <TextField
            name="fullName"
            label="Full name"
            autoComplete="name"
            value={draft.fullName}
            error={errors.fullName}
            onChange={(value) => set("fullName", value)}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={draft.email}
            error={errors.email}
            onChange={(value) => set("email", value)}
          />
          <TextField
            name="phone"
            label="Phone"
            type="tel"
            autoComplete="tel"
            hint="Used only to arrange your consultation."
            value={draft.phone}
            error={errors.phone}
            onChange={(value) => set("phone", value)}
          />
          <TextField
            name="country"
            label="Country of residence"
            autoComplete="country-name"
            value={draft.country}
            error={errors.country}
            onChange={(value) => set("country", value)}
          />
          <TextField
            name="city"
            label="City or region"
            autoComplete="address-level2"
            value={draft.city}
            error={errors.city}
            onChange={(value) => set("city", value)}
          />
          <TextField
            name="age"
            label="Age"
            type="number"
            hint="You must be at least 18 to apply."
            value={draft.age}
            error={errors.age}
            onChange={(value) => set("age", value)}
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="form-fields">
          <SelectField
            name="relationshipGoal"
            label="What are you looking for?"
            value={draft.relationshipGoal}
            error={errors.relationshipGoal}
            onChange={(value) => set("relationshipGoal", value)}
            options={[
              ["long-term", "A long-term partnership"],
              ["marriage-minded", "A partnership heading toward marriage"],
              ["open", "Open to either, taken seriously"]
            ]}
          />
          <SelectField
            name="timeline"
            label="Which best describes where you are?"
            value={draft.timeline}
            error={errors.timeline}
            onChange={(value) => set("timeline", value)}
            options={[
              ["ready-now", "Ready now — this is a priority in my life"],
              ["ready-soon", "Getting ready — serious, but not rushing"],
              ["exploring", "Exploring whether this service is right for me"]
            ]}
          />
          <TextAreaField
            name="whyNow"
            label="Why is this the right time for you?"
            hint="A sentence or two is enough."
            value={draft.whyNow}
            error={errors.whyNow}
            onChange={(value) => set("whyNow", value)}
          />
        </div>
      ) : null}

      {step === 3 ? (
        <div className="form-fields">
          <TextAreaField
            name="values"
            label="What matters most to you?"
            hint="Family, faith, honesty, ambition, quiet weekends — whatever is true."
            value={draft.values}
            error={errors.values}
            onChange={(value) => set("values", value)}
          />
          <TextAreaField
            name="lifestyle"
            label="What does your day-to-day life look like?"
            value={draft.lifestyle}
            error={errors.lifestyle}
            onChange={(value) => set("lifestyle", value)}
          />
          <TextAreaField
            name="interests"
            label="How do you like to spend your time?"
            value={draft.interests}
            error={errors.interests}
            onChange={(value) => set("interests", value)}
          />
        </div>
      ) : null}

      {step === 4 ? (
        <div className="form-fields">
          <TextAreaField
            name="preferences"
            label="Tell us about the person you hope to meet"
            hint="Character and life direction matter more here than a checklist."
            value={draft.preferences}
            error={errors.preferences}
            onChange={(value) => set("preferences", value)}
          />
          <TextAreaField
            name="nonNegotiables"
            label="Is anything essential — or a firm no?"
            hint="Writing “none” is a perfectly good answer."
            value={draft.nonNegotiables}
            error={errors.nonNegotiables}
            onChange={(value) => set("nonNegotiables", value)}
          />
        </div>
      ) : null}

      {step === 5 ? (
        <div className="form-fields">
          <CheckField
            name="ageConfirmed"
            checked={draft.ageConfirmed}
            error={errors.ageConfirmed}
            onChange={(value) => set("ageConfirmed", value)}
          >
            I confirm that I am at least 18 years old.
          </CheckField>
          <CheckField
            name="truthfulInfo"
            checked={draft.truthfulInfo}
            error={errors.truthfulInfo}
            onChange={(value) => set("truthfulInfo", value)}
          >
            I confirm that the information provided is truthful.
          </CheckField>
          <CheckField
            name="termsAgreed"
            checked={draft.termsAgreed}
            error={errors.termsAgreed}
            onChange={(value) => set("termsAgreed", value)}
          >
            I agree to the <Link className="text-link" href="/terms">Terms of Service</Link>.
          </CheckField>
          <CheckField
            name="privacyAcknowledged"
            checked={draft.privacyAcknowledged}
            error={errors.privacyAcknowledged}
            onChange={(value) => set("privacyAcknowledged", value)}
          >
            I acknowledge the <Link className="text-link" href="/privacy">Privacy Notice</Link>.
          </CheckField>
          <CheckField
            name="conductAgreed"
            checked={draft.conductAgreed}
            error={errors.conductAgreed}
            onChange={(value) => set("conductAgreed", value)}
          >
            I agree to the <Link className="text-link" href="/safety">member conduct standards</Link>.
          </CheckField>
          <CheckField
            name="marketingOptIn"
            checked={draft.marketingOptIn}
            onChange={(value) => set("marketingOptIn", value)}
          >
            Optional: I would like to receive occasional updates about Real Match by email.
            This is separate from the application and can be withdrawn at any time.
          </CheckField>
        </div>
      ) : null}

      {step === 6 ? (
        <div className="review-block">
          <p className="notice">
            Please check everything below. Use “Back” to change any answer before
            submitting.
          </p>
          <dl>
            <ReviewRow label="Full name" value={draft.fullName} />
            <ReviewRow label="Email" value={draft.email} />
            <ReviewRow label="Phone" value={draft.phone} />
            <ReviewRow label="Location" value={`${draft.city}, ${draft.country}`} />
            <ReviewRow label="Age" value={draft.age} />
            <ReviewRow label="Looking for" value={draft.relationshipGoal} />
            <ReviewRow label="Readiness" value={draft.timeline} />
            <ReviewRow label="Why now" value={draft.whyNow} />
            <ReviewRow label="Values" value={draft.values} />
            <ReviewRow label="Day-to-day life" value={draft.lifestyle} />
            <ReviewRow label="Interests" value={draft.interests} />
            <ReviewRow label="Hoping to meet" value={draft.preferences} />
            <ReviewRow label="Non-negotiables" value={draft.nonNegotiables} />
            <ReviewRow
              label="Marketing updates"
              value={draft.marketingOptIn ? "Yes, opted in" : "No"}
            />
          </dl>
        </div>
      ) : null}

      <div className="form-nav">
        {step > 1 ? (
          <button type="button" className="button secondary" onClick={goBack}>
            Back
          </button>
        ) : (
          <span />
        )}
        {step < totalSteps ? (
          <button type="button" className="button primary" onClick={goNext}>
            Continue
          </button>
        ) : (
          <button type="submit" className="button primary">
            {serviceConfig.applicationsEnabled ? "Submit application" : "Finish demonstration"}
          </button>
        )}
      </div>
    </form>
  );
}

/* ---------- Field primitives ---------- */

type TextFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
};

function TextField({ name, label, value, onChange, error, hint, type = "text", autoComplete }: TextFieldProps) {
  const fieldId = `field-${name}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="field">
      <label htmlFor={fieldId}>{label}</label>
      {hint ? (
        <p className="hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      <input
        id={fieldId}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextAreaFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
};

function TextAreaField({ name, label, value, onChange, error, hint }: TextAreaFieldProps) {
  const fieldId = `field-${name}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="field">
      <label htmlFor={fieldId}>{label}</label>
      {hint ? (
        <p className="hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      <textarea
        id={fieldId}
        name={name}
        rows={4}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
  error?: string;
};

function SelectField({ name, label, value, onChange, options, error }: SelectFieldProps) {
  const fieldId = `field-${name}`;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="field">
      <label htmlFor={fieldId}>{label}</label>
      <select
        id={fieldId}
        name={name}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Please choose…</option>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
      {error ? (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type CheckFieldProps = {
  name: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  children: ReactNode;
};

function CheckField({ name, checked, onChange, error, children }: CheckFieldProps) {
  const fieldId = `field-${name}`;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="field">
      <label className="check-field" htmlFor={fieldId}>
        <input
          id={fieldId}
          name={name}
          type="checkbox"
          checked={checked}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value.trim() === "" ? "—" : value}</dd>
    </div>
  );
}
