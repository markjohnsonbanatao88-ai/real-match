import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply privately",
  description:
    "A private application, read by a person. No public profile is created and nothing is shared without your approval."
};

export default function ApplyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Application</p>
          <h1>Apply privately.</h1>
          <p className="lede">
            This is not a public profile — it is a private application, read by a person.
            Take your time; every step can be revisited before you submit.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
