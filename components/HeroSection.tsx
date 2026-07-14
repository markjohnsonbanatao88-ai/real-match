import Link from "next/link";

const badges = ["Verified members", "Human matchmakers", "Mutual consent, always"];

export function HeroSection() {
  return (
    <section className="hero-section">
      <p className="eyebrow">Personal matchmaking</p>
      <h1>
        Matchmaking for people serious about <span className="accent">finding love</span>.
      </h1>
      <p className="hero-copy">
        Real Match is a personal matchmaking service. We get to know you, introduce you to compatible members who are
        also looking for something real, and support you both along the way — but only when the interest is mutual.
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
          Start your application
        </Link>
        <Link className="button secondary" href="/how-it-works">
          See how matchmaking works
        </Link>
      </div>
    </section>
  );
}
