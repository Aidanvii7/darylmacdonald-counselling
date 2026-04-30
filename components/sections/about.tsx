import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { site } from "@/content/site";
import { renderEmphasis } from "@/lib/render-emphasis";

export function About() {
  const { eyebrow, headline, bio, quote, quoteAttribution } = site.about;

  return (
    <section id="about" className="bg-cream-deep py-[clamp(4rem,8vw,7rem)] px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-[clamp(3rem,6vw,6rem)] items-start">
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)] mb-6">
              {renderEmphasis(headline)}
            </h2>
          </div>
          <div>
            <p className="font-serif text-[1.3rem] leading-[1.6] text-ink-soft mb-8">
              {bio}
            </p>
            <blockquote className="border-l-2 border-accent pl-6 mt-10 m-0">
              <p className="font-serif italic text-[1.15rem] text-ink-soft leading-[1.6] m-0">
                &ldquo;{quote}&rdquo;
              </p>
              <footer className="text-xs tracking-[0.15em] uppercase text-muted mt-3">
                — {quoteAttribution}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
