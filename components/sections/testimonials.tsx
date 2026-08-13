import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { site } from "@/content/site";
import { renderEmphasis } from "@/lib/render-emphasis";

export function Testimonials() {
  const { eyebrow, headline, items } = site.testimonials;

  return (
    <section
      id="testimonials"
      className="bg-cream-deep py-[clamp(4rem,8vw,7rem)] px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[720px] mb-16">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)]">
            {renderEmphasis(headline)}
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
          {items.map((item, i) => (
            <figure key={i} className="m-0">
              <div
                aria-hidden="true"
                className="font-serif italic text-5xl text-accent mb-2 leading-none select-none"
              >
                &ldquo;
              </div>
              <blockquote className="m-0">
                <p className="font-serif text-[1.15rem] leading-[1.65] text-ink-soft m-0">
                  {item.quote}
                </p>
              </blockquote>
              {item.attribution && (
                <figcaption className="text-xs tracking-[0.15em] uppercase text-muted mt-4">
                  — {item.attribution}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
