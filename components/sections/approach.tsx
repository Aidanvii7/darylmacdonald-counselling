import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { site } from "@/content/site";
import { renderEmphasis } from "@/lib/render-emphasis";

export function Approach() {
  const { eyebrow, photo, photoCaption, headline, paragraphs } = site.approach;

  return (
    <section
      id="approach"
      className="max-w-[1200px] mx-auto px-8 py-[clamp(4rem,8vw,7rem)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.2fr] gap-[clamp(3rem,6vw,6rem)] items-start">
        <div className="relative">
          <div className="aspect-[4/5] w-full relative overflow-hidden border border-[#c9b99a] bg-[#e5dcc9]">
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover object-center"
              />
            ) : (
              <PortraitPlaceholder />
            )}
          </div>
          <div className="mt-4 text-xs tracking-[0.12em] uppercase text-accent">
            {photoCaption.name}
          </div>
          <div className="font-serif italic text-[0.95rem] text-muted mt-1">
            {photoCaption.title}
          </div>
        </div>

        <div>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)] mb-8">
            {renderEmphasis(headline)}
          </h2>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                p.emphasis
                  ? "font-serif italic text-[1.3rem] leading-[1.6] text-accent mb-6 last:mb-0"
                  : "font-serif text-[1.3rem] leading-[1.6] text-ink-soft mb-6 last:mb-0"
              }
            >
              {p.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortraitPlaceholder() {
  return (
    <>
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pbg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8ddc7" />
            <stop offset="100%" stopColor="#c9b99a" />
          </linearGradient>
          <radialGradient id="plight" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#f5ead0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f5ead0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="url(#pbg)" />
        <rect width="400" height="500" fill="url(#plight)" />
        <ellipse cx="200" cy="180" rx="55" ry="65" fill="#8a6d3b" opacity="0.15" />
        <path
          d="M 120 500 Q 120 330 200 310 Q 280 330 280 500 Z"
          fill="#8a6d3b"
          opacity="0.15"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 p-8 text-center">
        <div className="text-[0.7rem] tracking-[0.25em] uppercase text-[#6b5840] opacity-70">
          Portrait
        </div>
        <div className="font-serif italic text-base text-[#6b5840] opacity-70">
          Set photo.src in site.json
        </div>
      </div>
    </>
  );
}
