const steps = [
  "Submit a private assessment.",
  "Complete identity and intent review.",
  "Prepare a respectful verified profile.",
  "Express interest independently.",
  "Connect only when interest is mutual.",
  "Request optional logistical concierge support."
];

export function HowItWorksSteps() {
  return (
    <section className="section">
      <p className="eyebrow">Process</p>
      <h2>How Real Match works</h2>
      <div className="card-grid">
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
