import Link from "next/link";
import { hero } from "@/content/site";
import { ImageSlot } from "@/components/marketing/ImageSlot";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.headline}</h1>
          <p className="lede">{hero.body}</p>
          <div className="hero-actions">
            <Link className="button primary" href="/apply">
              {hero.primaryCta}
            </Link>
            <Link className="button secondary" href="/how-it-works">
              {hero.secondaryCta}
            </Link>
          </div>
          <ul className="hero-points">
            {hero.trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <ImageSlot
          requirement="Hero editorial relationship image — two adults in warm, natural conversation; candid, unstaged, no direct camera gaze."
          ratio="portrait"
          priority
        />
      </div>
    </section>
  );
}
