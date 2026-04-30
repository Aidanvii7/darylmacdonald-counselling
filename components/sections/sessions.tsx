import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { site } from "@/content/site";
import { renderEmphasis } from "@/lib/render-emphasis";

export function Sessions() {
  const { eyebrow, headline, items } = site.sessions;

  return (
    <section
      id="sessions"
      className="max-w-[1200px] mx-auto px-8 py-[clamp(4rem,8vw,7rem)]"
    >
      <div className="max-w-[720px] mb-16">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)]">
          {renderEmphasis(headline)}
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
        {items.map((item) => (
          <div key={item.numeral}>
            <div className="font-serif italic text-5xl text-accent mb-4 leading-none">
              {item.numeral}
            </div>
            <h3 className="font-serif text-2xl m-0 mb-4 font-normal">{item.title}</h3>
            <p className="text-base leading-[1.7] text-ink-soft m-0">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
