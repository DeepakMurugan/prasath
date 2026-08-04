import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Film, Camera, Aperture, Quote, Sparkles, BadgeCheck, Compass } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ParticleField } from "@/components/site/ParticleField";
import { MotionReveal, MotionStagger, MotionItem, SplitReveal, RevealImage } from "@/components/site/MotionReveal";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Marquee } from "@/components/site/Marquee";
import { GearSlider } from "@/components/site/GearSlider";
import { FaqSection } from "@/components/site/FaqSection";
import { GalleryShowcase } from "@/components/site/GalleryShowcase";
import heroAsset from "@/assets/hero.mp4.asset.json";
const heroVideo = heroAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pause Pictures — Luxury Wedding & Cinematic Films" },
      { name: "description", content: "Documentary wedding Flims,commercial production, corporate stories, social media influencer brand content and FPV & Aerial cinematography Crafted with editorial elegance and timeless intent" },
      { property: "og:title", content: "Pause Pictures — Luxury Wedding & Cinematic Films" },
      { property: "og:description", content: "Documentary wedding Flims,commercial production, corporate stories, social media influencer brand content and FPV & Aerial cinematography Crafted with editorial elegance and timeless intent" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const brands = [
  "Aaronobed art", "Fifth angle", "Blue eye", "Elegand studios", "Stories by N",
  "Vilvah", "Chai Habbat", "Minus clinic", "Les amis", "Heeds Ad tech",
];

const films = [
  { title: "Ananya & Rohan", location: "Leela Palace · Udaipur", date: "Nov 2025", client: "Mehra Family", big: true, img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80" },
  { title: "Priya & Karthik", location: "Chettinad · Karaikudi", date: "Aug 2025", client: "Ramanathan Estate", big: true, img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&q=80" },
  { title: "Aerial Symphony", location: "Nubra Valley · Ladakh", date: "Jun 2025", client: "Royal Enfield", big: false, img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&q=80" },
  { title: "Tanishq Heritage", location: "Chennai Studio", date: "Mar 2025", client: "Tanishq × Titan", big: false, img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&q=80" },
  { title: "Coldplay India", location: "DY Patil · Mumbai", date: "Jan 2025", client: "BookMyShow Live", big: false, img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1000&q=80" },
];

const signatures = [
  { t: "Documentary Storytelling", d: "Real emotions caught in motion. No staged poses — only truths.", icon: Film },
  { t: "Editorial Composition", d: "Film-level framing, colour, and light. Every frame a still.", icon: Camera },
  { t: "FPV & Aerial Mastery", d: "Immersive choreography that moves through the moment.", icon: Aperture },
  { t: "Emotional Narratives", d: "Moments that stay forever, edited with rhythm and restraint.", icon: Quote },
];

const stats = [
  { n: 8, suf: "+", label: "Years of Craft" },
  { n: 140, suf: "+", label: "Films Delivered" },
  { n: 60, suf: "+", label: "Weddings Filmed" },
  { n: 25, suf: "+", label: "Brands Trusted" },
];

const testimonials = [
  { q: "Every emotion was captured beautifully. Watching our film felt like reliving the day, frame by frame.", n: "Ananya & Rohan", e: "Wedding · Udaipur" },
  { q: "Pause Pictures has an eye for the unseen. The FPV shots gave our wedding a cinematic dimension we never imagined.", n: "Priya & Karthik", e: "Destination · Karaikudi" },
  { q: "Effortlessly professional. The team disappears into the day, then returns with a masterpiece.", n: "Meera & Arjun", e: "Wedding · Coimbatore" },
];

const faqs = [
  { q: "Do you travel for destination shoots?", a: "Yes — India-wide and internationally. Travel, stay, and permits are quoted transparently." },
  { q: "How long until we receive our film?", a: "Teasers within 3 weeks. Full films in 8–12 weeks, depending on scope." },
  { q: "Can we request a specific crew size?", a: "Absolutely. Two-person intimate coverage up to five-person multi-cam is available." },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Counter({ to, suf }: { to: number; suf: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1800;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suf}</span>;
}

function Home() {
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="paper-grain">
      <Nav />

      {/* HERO — cinematic video + particle field */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover slow-zoom"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
        />
        {/* Warm cream tint + darker vignette to keep text legible */}
        <div aria-hidden className="absolute inset-0 bg-[#F6F1EA]/55" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#1a1210]/25 via-transparent to-[#1a1210]/55" />
        {/* Interactive particles */}
        <ParticleField />
        {/* Ambient orbs */}
        <div aria-hidden className="absolute -top-40 -right-32 w-[42rem] h-[42rem] rounded-full blur-[140px] opacity-40 orb-drift"
          style={{ background: "radial-gradient(circle, rgba(214,73,62,0.45), transparent 60%)" }} />

        <div className="relative z-10 container-x pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-20 min-h-[100dvh] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-6 sm:mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-gold/70" />
            Pause Pictures · Chennai · Est. 2018
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            className="font-display font-normal text-[13vw] sm:text-[10.5vw] lg:text-[8vw] leading-[0.98] tracking-[-0.025em] max-w-6xl"
          >
            Capturing Moments,<br />
            <span className="italic font-serif gold-gradient-text">Creating Legacies.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-foreground/75 leading-relaxed"
          >
            Documentary wedding Flims,commercial production, corporate stories,
            social media influencer brand content and FPV & Aerial cinematography
            Crafted with editorial elegance and timeless intent
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gold text-gold-foreground text-xs tracking-[0.25em] uppercase hover:brightness-110 transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(214,73,62,0.5)]"
              >
                <Play size={14} fill="currentColor" /> Watch Showreel
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-foreground/25 text-foreground text-xs tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition-all duration-300"
              >
                Begin Enquiry <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-cue">
            <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/60">Scroll</span>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <section className="py-10 md:py-14 border-y border-foreground/[0.08] section-white overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="mx-10 md:mx-14 font-display text-xl md:text-2xl text-muted-foreground/60 hover:text-gold transition-colors">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-y container-x">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <MotionReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] gold-sheen soft-card group">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80"
                alt="Behind the scenes — Pause Pictures"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.15} className="lg:col-span-7">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gold/70" />The Studio
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.05]">
              Pause pictures<br />
              <span className="italic font-serif gold-gradient-text">Crafting Timeless Stories Through Visuals.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Production House Built on Quiet Conviction.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Our work blends documentary instinct with the discipline of feature
              film making - patient, observant, and unafraid of silence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Luxury weddings', 'Brand campaigns', 'Destination films'].map((chip) => (
                <span key={chip} className="rounded-full border border-foreground/10 bg-[#fffaf3] px-3 py-2 text-[11px] tracking-[0.28em] uppercase text-foreground/70">
                  {chip}
                </span>
              ))}
            </div>
            {/* <div className="mt-8 rounded-[2px] border border-foreground/10 bg-[#fffaf3] p-6 sm:p-7">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-gold">
                <Sparkles size={14} /> Editorial approach
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Every film is shaped around intimacy, pacing, and atmosphere so the final piece feels as timeless as the memory itself.
              </p>
            </div> */}
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-3 text-gold text-sm tracking-[0.25em] uppercase link-gold"
            >
              Read the full story <ArrowRight size={14} />
            </Link>
          </MotionReveal>
        </div>
      </section>

      {/* TAGLINE MARQUEE — endless storytelling band */}
      <section className="py-12 md:py-16 border-y border-foreground/[0.06] section-ivory">
        <Marquee
          items={[
            "Visual Storyteller",
            "Capturing Moments",
            "Cinematic Artistry",
            "Documentary Weddings",
            "Editorial Composition",
            "FPV & Aerial Mastery",
          ]}
          speed={55}
          className="font-display italic text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] text-foreground/85"
        />
      </section>

      {/* FEATURED FILMS — editorial gallery */}
      <section className="section-y section-cream border-y border-foreground/[0.05]">
        <GalleryShowcase
          eyebrow="Featured Films"
          title="Selected stories, styled with intent."
          intro="A responsive editorial gallery of weddings, premium brand films, and aerial work — built to feel immersive on mobile and elevated on desktop."
        />
      </section>

      {/* GEAR WE CARRY — sliding cards */}
      <section className="section-y container-x">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-gold/70" /> The Gear We Carry
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">
                Tools that <span className="italic font-serif gold-gradient-text">disappear</span> into the story.
              </h2>
            </div>
            <Link to="/experience" className="text-sm tracking-[0.25em] uppercase text-muted-foreground hover:text-gold inline-flex items-center gap-2 link-gold">
              Full Kit List <ArrowRight size={14} />
            </Link>
          </div>
        </MotionReveal>
        <GearSlider />
      </section>

      {/* SIGNATURE STYLE */}
      <section className="section-y container-x">

        <MotionReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">Signature Style</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center max-w-3xl mx-auto leading-[1.05]">
            A craft built on <span className="italic font-serif gold-gradient-text">instinct</span> and intent.
          </h2>
        </MotionReveal>
        <MotionStagger className="mt-14 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {signatures.map((s) => (
            <MotionItem key={s.t}>
              <div className="group relative h-full p-8 rounded-[2px] editorial-panel hover:border-gold/50 transition-all duration-300 hover-lift overflow-hidden bg-[#fffaf3]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/15">
                  <s.icon size={22} />
                </div>
                <h3 className="font-display text-2xl mt-6">{s.t}</h3>
                <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">{s.d}</p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </section>

      {/* STATS */}
      <section className="section-y section-cream border-y border-foreground/[0.05]">
        <MotionStagger className="container-x grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((s) => (
            <MotionItem key={s.label} className="text-center border-l border-foreground/[0.1] first:border-l-0 lg:border-l">
              <div className="font-display text-5xl md:text-6xl lg:text-7xl gold-gradient-text">
                <Counter to={s.n} suf={s.suf} />
              </div>
              <p className="mt-4 text-xs tracking-[0.3em] uppercase text-muted-foreground">{s.label}</p>
            </MotionItem>
          ))}
        </MotionStagger>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-y container-x">
        <MotionReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">In Their Words</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-14 md:mb-20 leading-[1.05]">
            Loved by <span className="italic font-serif gold-gradient-text">couples</span>.
          </h2>
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <div className="max-w-4xl mx-auto editorial-panel rounded-[2px] p-8 md:p-14 lg:p-16 relative bg-[#fffaf3]">
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-gold/15 bg-background/80 px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-gold">
              <BadgeCheck size={12} /> Trusted by couples
            </div>
            <Quote className="absolute -top-5 left-10 text-gold bg-background px-2" size={44} />
            <motion.div
              key={tIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="font-display text-2xl md:text-3xl leading-snug italic text-foreground/95">
                "{testimonials[tIdx].q}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-px h-10 bg-gold" />
                <div>
                  <p className="font-medium">{testimonials[tIdx].n}</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{testimonials[tIdx].e}</p>
                </div>
              </div>
            </motion.div>
            <div className="flex gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setTIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === tIdx ? "w-10 bg-gold" : "w-4 bg-foreground/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </MotionReveal>
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
