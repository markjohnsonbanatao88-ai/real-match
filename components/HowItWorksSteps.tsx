const steps = [
  {
    title: "Apply",
    body: "Tell us who you are and what you are genuinely looking for. A matchmaker reviews every application personally."
  },
  {
    title: "Verify",
    body: "Confirm your identity so every member meets real, sincere people. Documents are handled discreetly and never kept longer than needed."
  },
  {
    title: "Curate your profile",
    body: "Build a warm, honest profile with help from your matchmaker — presented at its best, privately."
  },
  {
    title: "Receive introductions",
    body: "Your matchmaker hand-selects compatible members who are also looking for love, and introduces you thoughtfully."
  },
  {
    title: "Connect, mutually",
    body: "Conversations open one-on-one only when you both independently say yes. No pressure, ever."
  },
  {
    title: "Meet, with support",
    body: "When you are both ready, optional coaching and coordination help make first meetings feel effortless."
  }
];

export function HowItWorksSteps() {
  return (
    <section className="section">
      <p className="eyebrow">The process</p>
      <h2>A considered path, from application to introduction</h2>
      <ol className="timeline">
        {steps.map((step, index) => (
          <li className="timeline-item" key={step.title} data-reveal>
            <span className="timeline-marker" aria-hidden="true">
              {index + 1}
            </span>
            <div className="timeline-body">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
