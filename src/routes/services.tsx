import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Play, X, Heart, Sparkles, Building2, TrendingUp, Plane } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Pause Pictures" },
      { name: "description", content: "From documentary weddings to global campaigns, one creative house with five signature crafts." },
      { property: "og:title", content: "Services — Pause Pictures" },
      { property: "og:description", content: "Five distinct services, one signature — cinematic, editorial, timeless." },
    ],
  }),
  component: Services,
});

const services = [
  {
    id: "wedding",
    num: "01",
    icon: Heart,
    title: "Documentary style Wedding Flims",
    tagline: "Your love story, captured naturally and crafted into a timeless film.",
    desc: "Our documentary wedding films are crafted to tell your story with authenticity and elegance. Rather than directing every moment, we capture the emotions, interactions, and details naturally, transforming them into a cinematic film that reflects the true essence of your celebration.",
    features: ["Multi-camera coverage", "Ambient audio & vows", "Cinematic 4-8 min film", "Full-length ceremony edit"],
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85",
    accent: "from-[#c5a880]/40 to-transparent",
  },
  {
    id: "commercial",
    num: "02",
    icon: Sparkles,
    title: "Commercial productions",
    tagline: "Cinematic films that elevate brands through compelling storytelling.",
    desc: "We create cinematic commercial films that elevate brands through compelling storytelling, striking visuals, and purposeful production. Every brand has a story to tell, and our commercial productions combine creative direction, seamless execution, and visual craftsmanship to transform ideas into impactful films that engage audiences and leave a lasting impression.",
    features: ["Concept & direction", "Feature-grade lighting", "Colour-graded delivery", "Vertical + horizontal cuts"],
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&q=85",
    accent: "from-[#d4af37]/35 to-transparent",
  },
  {
    id: "corporate",
    num: "03",
    icon: Building2,
    title: "Corporate stories",
    tagline: "Authentic storytelling and cinematic visuals for your brand.",
    desc: "We craft corporate films that showcase your brand's vision, values, and people through authentic storytelling and cinematic visuals. Each story is designed to build trust, inspire audiences, and create meaningful connections.",
    features: ["Founder interviews", "Culture & office films", "Executive portraits", "LinkedIn-ready assets"],
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&q=85",
    accent: "from-[#c5a880]/35 to-transparent",
  },
  {
    id: "influencer",
    num: "04",
    icon: TrendingUp,
    title: "Social media / influencer brand Shoots",
    tagline: "Personal branding to high-impact campaigns across digital platforms.",
    desc: "From personal branding to high-impact campaigns, we craft visually compelling content that reflects identity, builds connection, and leaves a lasting impression across digital platforms.",
    features: ["Reel packs (5-30 clips)", "Vertical-first framing", "Trend-aware direction", "Same-week delivery"],
    img: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=1600&q=85",
    accent: "from-[#d4af37]/35 to-transparent",
  },
  {
    id: "aerial",
    num: "05",
    icon: Plane,
    title: "FPV & Aerial cinematography",
    tagline: "Extraordinary perspectives with precision and cinematic fluidity.",
    desc: "EGCA-certified pilots deliver seamless one-shot FPV flythroughs that showcase interiors, decor, and commercial spaces with precision and cinematic fluidity. Our FPV and aerial cinematography services create high-impact visuals for films, commercials, events, and brands-capturing movement, scale, and emotion from extraordinary perspectives.",
    features: ["FPV one-take flights", "Cinewhoop interiors", "Mavic 3 Cine coverage", "Licensed & insured"],
    img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=85",
    accent: "from-[#c5a880]/40 to-transparent",
  },
];

function Services() {
  const [modal, setModal] = useState<string | null>(null);
  const active = services.find((s) => s.id === modal);

  return (
    <div className="paper-grain">
      <Nav />
      <PageHero
        variant="aperture"
        timecode="00:01:08:22"
        eyebrow="Services · Five Signatures"
        title={<>From concept to creation, we make it <span className="italic font-serif gold-gradient-text">happen</span></>}
        subtitle="From documentary weddings to global campaigns-one creative house, five signature crafts, delivered with editorial precision and cinematic vision"
      />

      {/* Editorial services list */}
      <section className="section-y container-x">
        <div className="flex flex-col gap-16 md:gap-24 lg:gap-28">
          {services.map((s, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={s.id}>
                <article className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  {/* Image */}
                  <div className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
                    <div className="relative group overflow-hidden rounded-[2px] soft-card aspect-[4/3] tilt-card">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-tr ${s.accent} mix-blend-multiply`} />
                      <div className="absolute inset-0 ring-1 ring-inset ring-foreground/[0.06]" />

                      <button
                        onClick={() => setModal(s.id)}
                        className="absolute bottom-6 right-6 group/btn flex items-center gap-2 px-5 py-3 rounded-full bg-white/95 backdrop-blur text-foreground text-[10px] tracking-[0.25em] uppercase hover:bg-gold hover:text-gold-foreground transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(26,26,26,0.35)]"
                      >
                        <Play size={12} fill="currentColor" /> Explore Showreel
                      </button>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
                    <div className="flex items-baseline gap-5 mb-6">
                      <span className="font-display italic text-gold text-2xl">{s.num}</span>
                      <span className="h-px flex-1 bg-gold/40" />
                      <s.icon className="text-gold" size={20} />
                    </div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">{s.tagline}</p>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
                      {s.title}
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{s.desc}</p>
                    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[13px] text-foreground/80">
                          <span className="mt-2 w-1 h-1 rounded-full bg-gold shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <button
                        onClick={() => setModal(s.id)}
                        className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-foreground link-gold"
                      >
                        Explore Showreel <Play size={13} fill="currentColor" />
                      </button>
                      <Link
                        to="/contact"
                        className="ml-auto group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/25 text-foreground text-[11px] tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition-all"
                      >
                        Enquire <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process strip */}
      <section className="section-y section-cream border-y border-foreground/[0.05]">
        <div className="container-x">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">The Process</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center max-w-3xl mx-auto leading-[1.05]">
              From First Note To <span className="italic font-serif gold-gradient-text">Final Cut.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Discovery & Concept", d: "We begin by understanding your vision, goals, and story. Through detailed discussions and creative planning, we define the direction, style, and approach for your project." },
              { n: "02", t: "Creative Development", d: "Our team transforms ideas into a clear visual concept, developing the narrative, mood, references, and production plan to bring your vision to life." },
              { n: "03", t: "Pre-Production Planning", d: "From location scouting and scheduling to crew coordination and technical preparation, we carefully plan every detail to ensure a seamless production experience." },
              { n: "04", t: "Production & Filming", d: "With a focus on cinematic storytelling, we capture every moment using professional filmmaking techniques, creative direction, and advanced equipment." },
              { n: "05", t: "Post-Production & Crafting", d: "Through expert editing, color grading, sound design, and visual refinement, we shape the footage into a polished cinematic experience." },
              { n: "06", t: "Final Delivery", d: "Your finished film is delivered in the highest quality formats, ready to engage audiences across digital platforms, campaigns, and brand experiences." },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="soft-card rounded-[2px] p-8 h-full hover-lift">
                  <p className="font-display italic text-3xl gold-gradient-text">{p.n}</p>
                  <h3 className="mt-4 font-display text-2xl">{p.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Investment note */}
      <section className="section-y container-x text-center">
        <Reveal>
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">Investment</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-[1.05]">
            Considered work, <span className="italic font-serif gold-gradient-text">bespoke</span> quotes.
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground text-lg">
            Every project is scoped uniquely. Share your story and we'll return a
            considered proposal within 48 hours.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-gold-foreground transition-all"
          >
            Request Proposal <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </section>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10 bg-foreground/70 backdrop-blur-lg animate-fade-in-up"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-background rounded-[2px] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 grid place-items-center hover:bg-gold hover:text-gold-foreground transition-colors"
            >
              <X size={16} />
            </button>
            <img src={active.img} alt={active.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-background max-w-2xl">
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">{active.tagline}</p>
              <h3 className="font-display text-3xl md:text-5xl leading-tight">{active.title}</h3>
              <p className="mt-4 text-white/80 text-sm md:text-base">{active.desc}</p>
            </div>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-white/95 text-foreground grid place-items-center gold-pulse pointer-events-auto">
                <Play size={26} className="ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
