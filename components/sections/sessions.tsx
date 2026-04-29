import { SectionEyebrow } from "@/components/ui/section-eyebrow";

const items = [
  {
    n: "I",
    title: "Initial consultation",
    body: "A free phone or online consultation to understand what you're looking for and whether we're a good fit. No obligation.",
  },
  {
    n: "II",
    title: "50-minute sessions",
    body: "Held in person at my office in Glasgow City Centre, or online. £50 per session.",
  },
  {
    n: "III",
    title: "Ongoing support",
    body: "We'll review regularly to check the work is serving you. Short-term focused work or longer-term exploration — both are welcome.",
  },
];

export function Sessions() {
  return (
    <section
      id="sessions"
      className="max-w-[1200px] mx-auto px-8 py-[clamp(4rem,8vw,7rem)]"
    >
      <div className="max-w-[720px] mb-16">
        <SectionEyebrow>Sessions</SectionEyebrow>
        <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)]">
          What a session{" "}
          <span className="font-serif italic text-accent">looks like</span>.
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
        {items.map((item) => (
          <div key={item.n}>
            <div className="font-serif italic text-5xl text-accent mb-4 leading-none">
              {item.n}
            </div>
            <h3 className="font-serif text-2xl m-0 mb-4 font-normal">{item.title}</h3>
            <p className="text-base leading-[1.7] text-ink-soft m-0">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
