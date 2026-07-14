const plans = [
  {
    name: "Membership Application",
    price: "Free",
    unit: "",
    featured: false,
    description:
      "Apply, complete identity verification, and build your profile with a matchmaker. There is no charge to be considered for the community."
  },
  {
    name: "Matchmaking Membership",
    price: "£299",
    unit: "one-time",
    featured: true,
    description:
      "Work with a dedicated matchmaker who hand-selects compatible introductions. Message and meet only when both members opt in. You pay for our service and time — never for access to a specific person."
  },
  {
    name: "Dedicated Concierge",
    price: "£600",
    unit: "optional add-on",
    featured: false,
    description:
      "Everything in Membership, plus one-on-one date coaching, scheduling help, and thoughtful logistics for in-person meetings that both members have already agreed to."
  }
];

export function PricingCards() {
  return (
    <section className="section">
      <p className="eyebrow">Pricing</p>
      <h2>You pay for matchmaking — never for a person</h2>
      <div className="card-grid three">
        {plans.map((plan) => (
          <article className={plan.featured ? "card featured" : "card"} key={plan.name}>
            {plan.featured ? <span className="card-tag">Most popular</span> : null}
            <h3>{plan.name}</h3>
            <p className="price">
              {plan.price}
              {plan.unit ? <span className="price-unit"> · {plan.unit}</span> : null}
            </p>
            <p>{plan.description}</p>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Our fees pay for matchmaking, coaching, and coordination — the work we do. They never buy a guaranteed match, a
        relationship, or another member&apos;s attention. No member can pay to make someone view, reply to, or meet them.
      </p>
    </section>
  );
}
