import { site } from "@/content/site";

export function Footer() {
  const { brand, directionsLabel } = site.footer;
  const { address, directionsUrl, phoneHref, phoneDisplay } = site.contactInfo;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream py-12 px-8 border-t border-ink/10">
      <div className="max-w-[1200px] mx-auto flex justify-between items-start flex-wrap gap-6">
        <div>
          <div className="font-serif italic text-base text-muted">
            {brand}
          </div>
          <div className="text-[0.75rem] text-muted mt-2 leading-[1.6]">
            {address.lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {directionsLabel}
              </a>
              <a href={phoneHref} className="text-accent hover:underline">
                {phoneDisplay}
              </a>
            </div>
          </div>
        </div>
        <div className="text-[0.7rem] tracking-[0.15em] uppercase text-muted">
          © {year}
        </div>
      </div>
    </footer>
  );
}
