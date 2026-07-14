const trustPoints = [
  {
    title: "Real, verified people",
    body: "Every member applies and completes identity review, so introductions are always to genuine people who chose to be here."
  },
  {
    title: "Matchmakers, not just algorithms",
    body: "A person gets to know you and hand-selects introductions based on values, intent, and compatibility — not swipe volume."
  },
  {
    title: "Both sides opt in",
    body: "Nothing happens without mutual agreement. An introduction only opens when both members independently say yes."
  },
  {
    title: "Privacy by default",
    body: "Your profile stays private and is only shared when there is mutual interest. You control what is visible and to whom."
  }
];

export function TrustLayer() {
  return (
    <section className="section">
      <p className="eyebrow">Why members trust us</p>
      <h2>Serious matchmaking, done with care</h2>
      <div className="card-grid">
        {trustPoints.map((point) => (
          <article className="card" key={point.title}>
            <h3>{point.title}</h3>
            <p>{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
