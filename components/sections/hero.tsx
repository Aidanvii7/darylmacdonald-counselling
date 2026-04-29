export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[85vh] flex items-center px-8 py-[clamp(3rem,8vw,8rem)] max-w-[1200px] mx-auto"
    >
      <div className="max-w-[900px] relative z-10">
        <div className="text-[0.7rem] tracking-[0.25em] uppercase text-accent font-medium mb-6">
          Glasgow, Scotland
        </div>
        <h1 className="font-serif font-normal tracking-tight leading-[1.05] text-[clamp(3rem,8vw,6rem)] m-0">
          A space to
          <br />
          <span className="font-serif italic text-accent">reflect,</span> to
          <br />
          understand,
          <br />
          to <span className="font-serif italic text-accent">move forward.</span>
        </h1>
        <p className="font-serif text-[1.3rem] leading-[1.6] text-ink-soft font-normal mt-12 max-w-[540px]">
          Counselling for adults navigating life&apos;s difficult moments — anxiety, low mood,
          grief, relationships, and the patterns we can&apos;t quite see on our own.
        </p>
        <div className="mt-12">
          <a href="#contact" className="no-underline">
            <button
              type="button"
              className="text-xs tracking-[0.2em] uppercase font-medium px-10 py-5 bg-ink text-cream border-0 cursor-pointer hover:bg-accent transition-colors"
            >
              Book a consultation
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
