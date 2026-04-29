import { GrainOverlay } from "@/components/grain-overlay";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { About } from "@/components/sections/about";
import { Sessions } from "@/components/sections/sessions";
import { ContactMailto } from "@/components/sections/contact-mailto";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <SiteNav />
      <main className="relative z-10">
        <Hero />
        <Approach />
        <About />
        <Sessions />
        <ContactMailto />
      </main>
      <Footer />
    </>
  );
}
