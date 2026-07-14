import Link from "next/link";

const badges = ["Verified members", "Human matchmakers", "Mutual consent, always"];

export function HeroSection() {
  return (
    <section className="hero-section">
      <p className="eyebrow">Private matchmaking · by application only</p>
      <h1>
        Introductions for people serious about <span className="accent">love</span>.
      </h1>
      <p className="hero-copy">
        Real Match is a discreet, personal matchmaking service. We take the time to know you, introduce you to compatible
        members who are also looking for something real, and stay by your side — but only when the interest is mutual.
      </p>
      <div className="badge-row">
        {badges.map((badge) => (
          <span className="badge" key={badge}>
            <span className="dot" aria-hidden="true" />
            {badge}
          </span>
        ))}
      </div>
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
