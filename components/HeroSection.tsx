import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero-section">
      <p className="eyebrow">Private verified social introductions</p>
      <h1>Private Verified Social Introductions</h1>
      <p className="hero-copy">
        A selective, trust-first social platform for adults who value identity review, respectful communication, and
        optional cultural concierge support when interest is mutual.
      </p>
      <div className="hero-actions">
        <Link className="button primary" href="/apply">
          Apply for a Private Assessment
        </Link>
        <Link className="button secondary" href="/how-it-works">
          Learn How It Works
        </Link>
      </div>
    </section>
  );
}
