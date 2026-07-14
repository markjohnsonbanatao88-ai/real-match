const steps = [
  "Apply and tell us who you are and what you are genuinely looking for.",
  "Verify your identity so every member meets real, sincere people.",
  "Build a warm, honest profile with help from your matchmaker.",
  "Receive curated introductions to compatible members who are also looking for love.",
  "Connect one-on-one — only when you both independently say yes.",
  "Get optional coaching and coordination support as things move forward."
];

export function HowItWorksSteps() {
  return (
    <section className="section">
      <p className="eyebrow">The process</p>
      <h2>How matchmaking at Real Match works</h2>
      <div className="card-grid three">
        {steps.map((step, index) => (
          <article className="card" key={step}>
            <span className="step-number">{index + 1}</span>
            <p>{step}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
