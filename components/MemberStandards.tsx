const standards = [
  "Everyone joins on equal terms, whoever they are and whoever they are hoping to meet.",
  "Respectful, honest communication at every stage.",
  "Truthful identity, photos, and profile information.",
  "No coercion, harassment, pressure, or transactional expectations.",
  "Independent, mutual consent before any introduction or meeting.",
  "Immediate respect for declines, pauses, and blocks."
];

export function MemberStandards() {
  return (
    <section className="section">
      <p className="eyebrow">Member standards</p>
      <h2>A community built on respect</h2>
      <ul className="standards-list">
        {standards.map((standard) => (
          <li key={standard}>{standard}</li>
        ))}
      </ul>
    </section>
  );
}
