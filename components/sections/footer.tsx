export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-cream py-12 px-8 border-t border-ink/10">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="font-serif italic text-base text-muted">
          Daryl MacDonald Counselling — Glasgow
        </div>
        <div className="text-[0.7rem] tracking-[0.15em] uppercase text-muted">
          BACP Registered · Est. 2019 · © {year}
        </div>
      </div>
    </footer>
  );
}
