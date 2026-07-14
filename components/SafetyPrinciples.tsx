const principles = [
  "Every member is a consenting adult who chose to apply and join.",
  "No one is ever pressured to talk, match, or meet.",
  "Introductions require both members to independently agree.",
  "Profiles stay private and are shared only when interest is mutual.",
  "Declines and blocks are respected immediately and without penalty.",
  "Reports and safety concerns are documented, escalated, and acted on."
];

export function SafetyPrinciples() {
  return (
    <section className="section muted">
      <p className="eyebrow">Safety</p>
      <h2>Consent and dignity come first</h2>
      <div className="card-grid three">
        {principles.map((principle) => (
          <article className="card" key={principle} data-reveal>
            <p>{principle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
