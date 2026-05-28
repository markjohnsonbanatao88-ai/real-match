const standards = [
  "Respectful communication",
  "Truthful identity and profile information",
  "No coercion, harassment, or pressure",
  "No transactional romantic or sexual expectations",
  "Independent mutual consent before any connection",
  "Immediate respect for blocks, pauses, and declines"
];

export function MemberStandards() {
  return (
    <section className="section">
      <p className="eyebrow">Standards</p>
      <h2>A private network needs firm rules</h2>
      <ul className="standards-list">
        {standards.map((standard) => (
          <li key={standard}>{standard}</li>
        ))}
      </ul>
    </section>
  );
}
