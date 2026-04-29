const ADDRESS_LINES = ["The Consulting Rooms", "34 West George Street, Glasgow G2 1DA"];
const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Consulting+Rooms,+34+West+George+Street,+Glasgow+G2+1DA";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-cream py-12 px-8 border-t border-ink/10">
      <div className="max-w-[1200px] mx-auto flex justify-between items-start flex-wrap gap-6">
        <div>
          <div className="font-serif italic text-base text-muted">
            Daryl MacDonald Counselling
          </div>
          <div className="text-[0.75rem] text-muted mt-2 leading-[1.6]">
            {ADDRESS_LINES.map((line) => (
              <div key={line}>{line}</div>
            ))}
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Get directions ↗
              </a>
              <a href="tel:+447840373448" className="text-accent hover:underline">
                07840 373448
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
