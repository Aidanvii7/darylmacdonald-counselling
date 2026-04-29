import { SectionEyebrow } from "@/components/ui/section-eyebrow";

export function About() {
  return (
    <section id="about" className="bg-cream-deep py-[clamp(4rem,8vw,7rem)] px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-[clamp(3rem,6vw,6rem)] items-start">
          <div>
            <SectionEyebrow>About</SectionEyebrow>
            <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)] mb-6">
              Trained in the{" "}
              <span className="font-serif italic text-accent">person-centred</span> tradition.
            </h2>
          </div>
          <div>
            <p className="font-serif text-[1.3rem] leading-[1.6] text-ink-soft mb-8">
              I&apos;m a qualified counsellor based in Glasgow, with five years&apos; experience
              in private practice. My training is in the person-centred approach — sitting with
              people with warmth, without judgement, and with a belief that you already hold the
              answers you&apos;re looking for.
            </p>
            <blockquote className="border-l-2 border-accent pl-6 mt-10 m-0">
              <p className="font-serif italic text-[1.15rem] text-ink-soft leading-[1.6] m-0">
                &ldquo;The curious paradox is that when I accept myself just as I am, then I can
                change.&rdquo;
              </p>
              <footer className="text-xs tracking-[0.15em] uppercase text-muted mt-3">
                — Carl Rogers
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
