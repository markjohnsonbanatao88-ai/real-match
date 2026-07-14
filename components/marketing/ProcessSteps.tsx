import { processSteps } from "@/content/site";

export function ProcessSteps() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">The process</p>
          <h2>Five steps, taken at your pace.</h2>
        </div>
        <ol className="process-list">
          {processSteps.map((step) => (
            <li key={step.title}>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
