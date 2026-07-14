import { philosophy } from "@/content/site";
import { ImageSlot } from "@/components/marketing/ImageSlot";

export function Philosophy() {
  return (
    <section className="section section-deep">
      <div className="wrap split">
        <ImageSlot
          requirement="Discreet consultation environment — a calm, warmly lit sitting room or study; two chairs, no faces required."
          ratio="portrait"
        />
        <div>
          <p className="eyebrow">{philosophy.eyebrow}</p>
          <h2>{philosophy.heading}</h2>
          <div className="prose" style={{ marginTop: 22 }}>
            {philosophy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
