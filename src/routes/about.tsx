import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Compass, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pause Pictures" },
      { name: "description", content: "Pause Pictures Production is a Chennai-based production house founded by Prasath, specializing in cinematic photography, filmmaking, FPV drone cinematography, and creative visual storytelling." },
      { property: "og:title", content: "About — Pause Pictures" },
      { property: "og:description", content: "A Production House Built on Quiet Conviction." },
    ],
  }),
  component: About,
});

const values = [
  { t: "Authenticity", d: "We believe every story deserves to be told with honesty and care." },
  { t: "Creativity", d: "Every project is shaped with cinematic artistry and meaningful visual direction." },
  { t: "Excellence", d: "From concept to delivery, every frame is crafted with precision and purpose." },
];

const faqs = [
  { q: "How do you approach documentary weddings?", a: "We stay quiet, observe naturally, and let the day unfold with minimal intrusion so the emotion feels honest." },
  { q: "Do you work with luxury brands and campaigns?", a: "Yes. We blend editorial storytelling with polished production values for premium launches and brand films." },
  { q: "Can you provide a full film and social clips?", a: "Absolutely. We often deliver both a long-form film and a tailored short-form cut for reels and digital sharing." },
];

function About() {
  return (
    <div className="paper-grain">
      <Nav />
      <PageHero
        variant="portrait"
        timecode="00:02:14:08"
        eyebrow="About · Pause Pictures"
        title={<>A Production House Built on <span className="italic font-serif gold-gradient-text">Quiet Conviction</span>.</>}
        subtitle="Pause Pictures Production is a Chennai-based production house founded by Prasath. With over 8 years of experience, we specialize in cinematic photography, filmmaking, FPV drone cinematography, and creative visual storytelling. From weddings and commercials to branded content and documentaries, we create timeless visuals that transform moments into compelling stories."
      />

      {/* Split editorial */}
      <section className="section-y container-x">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden soft-card gold-sheen">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=85"
                alt="Founder of Pause Pictures"
                className="w-full h-full object-cover transition-transform duration-[1600ms] hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gold/70" /> Our Philosophy
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Every frame is <span className="italic font-serif gold-gradient-text">intentional</span>.<br />Every story is personal.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Every moment is worth preserving. Life moves fast, but the moments that matter deserve to be paused.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We exist to preserve those moments through authentic storytelling, cinematic craftsmanship, and timeless visuals that people can relive for years to come.
            </p>
            <Link to="/portfolio" className="mt-10 inline-flex items-center gap-3 text-gold text-sm tracking-[0.25em] uppercase link-gold">
              See our films <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="section-y section-cream border-y border-foreground/[0.05]">
        <div className="container-x">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">How We Work</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center max-w-3xl mx-auto leading-[1.05]">
              The Pause Process,<span className="italic font-serif gold-gradient-text"> From first look to final frame</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "Discover", desc: "Every project begins with understanding your vision, goals, and story. We take the time to listen and plan every detail with purpose.", icon: Sparkles },
              { title: "Plan", desc: "From creative concepts and storyboarding to scheduling and logistics, we ensure every production is carefully organized for a smooth experience.", icon: Compass },
              { title: "Create", desc: "Our team captures every moment with cinematic precision using professional filmmaking techniques, creative direction, and cutting-edge equipment.", icon: BadgeCheck },
              { title: "Refine", desc: "Each frame goes through meticulous editing, color grading, sound design, and quality control to deliver a polished final film.", icon: Sparkles },
              { title: "Deliver", desc: "We provide high-quality final outputs within the agreed timeline, ensuring every project reflects our commitment to excellence and timeless storytelling.", icon: Compass },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="editorial-panel rounded-[2px] bg-[#fffaf3] p-8 h-full">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <item.icon size={20} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y container-x">
        <Reveal>
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">What We Stand For</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center max-w-3xl mx-auto leading-[1.05]">
            Authenticity. <span className="italic font-serif gold-gradient-text">Creativity</span>. Excellence.
          </h2>
          <p className="mt-6 text-lg text-center text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            At Pause Pictures Production, we stand for authenticity, creativity, and excellence. We believe every story deserves to be told with honesty and cinematic artistry. Every project we take on is guided by passion, precision, and a commitment to creating meaningful visuals that inspire, connect, and leave a lasting impact.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 100}>
              <div className="editorial-panel rounded-[2px] bg-[#fffaf3] p-10 h-full hover-lift">
                <p className="font-display italic text-4xl gold-gradient-text">0{i + 1}</p>
                <h3 className="mt-4 font-display text-3xl">{v.t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Long-form quote */}
      <section className="section-y container-x text-center">
        <Reveal>
          <div className="editorial-panel rounded-[2px] bg-[#fffaf3] px-8 py-12 md:px-12 lg:px-16 lg:py-16 max-w-5xl mx-auto">
            <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto text-foreground">
              "From concept to final delivery, we create visuals that inspire, connect, and leave a lasting impression."
            </p>
            <p className="mt-8 text-xs tracking-[0.4em] uppercase text-gold">— Pause Pictures</p>
          </div>
        </Reveal>
      </section>

      <FaqSection
        eyebrow="Common Questions"
        title="The practical details."
        faqs={faqs}
      />

      <Footer />
    </div>
  );
}
