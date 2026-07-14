import type { ReactNode } from "react";

type TrustPoint = {
  title: string;
  body: string;
  icon: ReactNode;
};

const shield = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const matchmaker = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="10" r="2.4" />
    <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M15 15.4c2.4.2 4.5 1.9 4.5 4.6" />
  </svg>
);

const consent = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 6.5L10 17l-5-5" />
    <path d="M4 12.5a8 8 0 1 1 3.5 6.6" />
  </svg>
);

const lock = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <path d="M12 14.5v2" />
  </svg>
);

const trustPoints: TrustPoint[] = [
  {
    title: "Real, verified people",
    body: "Every member applies and completes identity review, so introductions are always to genuine people who chose to be here.",
    icon: shield
  },
  {
    title: "Matchmakers, not algorithms",
    body: "A person gets to know you and hand-selects introductions based on values, intent, and compatibility — not swipe volume.",
    icon: matchmaker
  },
  {
    title: "Both sides opt in",
    body: "Nothing happens without mutual agreement. An introduction only opens when both members independently say yes.",
    icon: consent
  },
  {
    title: "Privacy by default",
    body: "Your profile stays private and is shared only when there is mutual interest. You control what is visible, and to whom.",
    icon: lock
  }
];

export function TrustLayer() {
  return (
    <section className="section">
      <p className="eyebrow">Why members trust us</p>
      <h2>Serious matchmaking, handled with care</h2>
      <div className="card-grid">
        {trustPoints.map((point) => (
          <article className="card" key={point.title} data-reveal>
            <span className="card-icon" aria-hidden="true">
              {point.icon}
            </span>
            <h3>{point.title}</h3>
            <p>{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
