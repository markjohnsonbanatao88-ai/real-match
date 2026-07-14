import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Draft privacy notice for the Real Match matchmaking service."
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="prose">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy Notice</h1>
          <p className="legal-warning">Draft for legal review — not final.</p>

          <h2>The short version</h2>
          <p>
            We collect only what the service needs, show your profile to no one without
            your approval, never sell your data, and delete what we no longer need. This
            notice will be finalised with counsel and mapped to the live systems before any
            real member data is collected.
          </p>

          <h2>What we collect</h2>
          <p>
            Application details you choose to give us, consultation notes, your approved
            profile, consent records, and — once verification is live — a reference and
            result from an approved identity-verification provider. We do not intend to
            hold raw identity documents.
          </p>

          <h2>How information is shared</h2>
          <p>
            Your profile is private by default. It is shared only with a specific member
            being considered for an introduction with you, only after you approve its
            contents. Staff access is role-restricted and logged.
          </p>

          <h2>Retention and deletion</h2>
          <p>
            Information is kept only as long as needed for the service, under a documented
            retention schedule. You can request deletion of your information at any time,
            and deletion requests are honoured within a documented period.
          </p>

          <h2>Consent</h2>
          <p>
            Service communication and marketing communication are consented to separately.
            Marketing consent is optional, never bundled, and can be withdrawn at any time.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This site currently sets no cookies and runs no analytics or tracking scripts.
            If privacy-respecting analytics are added later, this notice will be updated
            first and consent handled appropriately.
          </p>

          <h2>Current implementation scope</h2>
          <p>
            While the service is in preview, this website does not collect, store, or
            transmit application data at all — the application form is a demonstration and
            says so where it appears.
          </p>
        </div>
      </div>
    </section>
  );
}
