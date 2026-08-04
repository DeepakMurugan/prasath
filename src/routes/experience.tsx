import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Aperture, Plane, Mic, Monitor, Shield, HardDrive, Zap, Award, Calendar, Users, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { GearSlider } from "@/components/site/GearSlider";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { GalleryShowcase } from "@/components/site/GalleryShowcase";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Gear & Crew — Pause Pictures" },
      { name: "description", content: "Cinema cameras, lenses, aerial rigs, and the crew behind Pause Pictures." },
      { property: "og:title", content: "Gear & Crew — Pause Pictures" },
      { property: "og:description", content: "The tools and the team that make our films possible." },
    ],
  }),
  component: Experience,
});

const groups = [
  {
    icon: Camera,
    label: "Cinema Bodies",
    items: [
      { n: "Sony A7S III", s: "Low-light monster · 4K 120p" },
      { n: "Sony FX3", s: "Cinema Line · S-Cinetone" },
      { n: "Sony A7 IV", s: "33MP hybrid · 4K 60p" },
    ],
  },
  {
    icon: Aperture,
    label: "Lenses",
    items: [
      { n: "Sony GM 24-70mm f/2.8", s: "Everyday workhorse" },
      { n: "Sigma 35mm f/1.2 Art", s: "Signature portrait glass" },
      { n: "Sony 70-200mm f/2.8 GM", s: "Compressed cinematic reach" },
      { n: "Laowa 12mm T2.9 Zero-D", s: "Wide architectural" },
    ],
  },
  {
    icon: Plane,
    label: "Aerial / FPV",
    items: [
      { n: "DJI Mavic 3 Cine", s: "5.1K ProRes · 4/3 CMOS" },
      { n: "DJI FPV Avata 2", s: "Cinewhoop · sub-200g" },
      { n: "Custom 5\" FPV Rig", s: "GoPro 12 · 4K 120p" },
    ],
  },
  {
    icon: Mic,
    label: "Audio",
    items: [
      { n: "RØDE Wireless Pro", s: "32-bit float · timecode" },
      { n: "Sennheiser MKH 416", s: "Broadcast shotgun" },
      { n: "Zoom F6", s: "6-input field recorder" },
    ],
  },
  {
    icon: Monitor,
    label: "Post & Colour",
    items: [
      { n: "Apple Mac Studio M2 Ultra", s: "Edit & grade suite" },
      { n: "DaVinci Resolve Studio", s: "Colour · finishing" },
      { n: "Eizo ColorEdge CG319X", s: "Reference grading display" },
    ],
  },
];

const crew = [
  { r: "Director & DoP", n: "Studio Principal" },
  { r: "Second Camera", n: "Rotating specialist" },
  { r: "FPV Pilot", n: "Certified operator" },
  { r: "Sound Recordist", n: "On-set audio lead" },
  { r: "Colourist", n: "In-house post" },
  { r: "Editor", n: "Story-first cut" },
];

const workflow = [
  { step: "01", t: "Discovery Call", d: "We listen to your story, mood, and non-negotiables before quoting a single frame." },
  { step: "02", t: "Pre-Production", d: "Shot lists, timelines, recce visits, and a lookbook tuned to your palette." },
  { step: "03", t: "Filming Day", d: "Quiet, invisible presence. Documentary-led coverage with a cinema-first eye." },
  { step: "04", t: "Post & Colour", d: "Story edit, sound design, and a hand-crafted grade on a reference monitor." },
  { step: "05", t: "Delivery", d: "Master files, streaming cuts, and archival backups — yours forever." },
];

const reliability = [
  { icon: HardDrive, t: "Triple-Backup Workflow", d: "On-set mirroring, hotel-night redundancy, and cloud archival within 24 hours." },
  { icon: Shield, t: "Fully Insured Kit", d: "Every body, lens, and drone is insured — your day is never at the mercy of hardware." },
  { icon: Zap, t: "Power & Signal Ready", d: "V-mount batteries, UPS on drives, and redundant wireless — no missed vows." },
  { icon: Award, t: "DGCA Certified Pilots", d: "Legal-to-fly aerial and FPV operators, cleared for venues nationwide." },
];

const stats = [
  { n: "8+", l: "Years of Craft" },
  { n: "140+", l: "Films Delivered" },
  { n: "25+", l: "Cities Filmed" },
  { n: "6", l: "Core Crew" },
];

const values = [
  { t: "Story Over Spectacle", d: "The frame serves the moment. Never the other way around." },
  { t: "Quiet on Set", d: "You'll barely notice us — until you watch the film." },
  { t: "Craft, Not Volume", d: "A limited number of films a year, each fully authored." },
];

const faqs = [
  { q: "Do you travel for destination shoots?", a: "Yes — India-wide and internationally. Travel, stay, and permits are quoted transparently." },
  { q: "How long until we receive our film?", a: "Teasers within 3 weeks. Full films in 8–12 weeks, depending on scope." },
  { q: "Can we request a specific crew size?", a: "Absolutely. Two-person intimate coverage up to five-person multi-cam is available." },
];

function Experience() {
  return (
    <div className="paper-grain">
      <Nav />
      <PageHero
        variant="focus"
        timecode="00:03:51:16"
        eyebrow="Gear & Crew · The Kit"
        title={<>Tools chosen with <span className="italic font-serif gold-gradient-text">intent</span>.</>}
        subtitle="Every camera, lens, and rig on our shelf earns its place. The gear serves the story — never the other way around."
      />

      {/* GEAR SLIDER */}
      <section className="section-y container-x">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">Signature Kit</p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
                A curated <span className="italic font-serif gold-gradient-text">arsenal</span>.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Swipe through the cinema bodies, glass, aerial rigs, and audio we bring to every set.
            </p>
          </div>
        </Reveal>
        <GearSlider />
      </section>

      <GalleryShowcase
        eyebrow="Studio Gallery"
        title="A gallery that feels like a premium spread."
        intro="Browse our signature moments with immersive cards, polished transitions, and responsive layout behaviour across every screen size."
      />

      {/* Full Gear Grid */}
      <section className="section-y section-cream border-y border-foreground/[0.05]">
        <div className="container-x">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">Full Inventory</p>
            <h2 className="font-display text-4xl md:text-5xl text-center max-w-3xl mx-auto leading-[1.05] mb-14">
              Every piece, <span className="italic font-serif gold-gradient-text">accounted for</span>.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {groups.map((g, i) => (
              <Reveal key={g.label} delay={i * 60}>
                <div className="soft-card rounded-[2px] p-8 h-full hover-lift gold-sheen">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-11 h-11 rounded-full bg-gold/15 text-gold grid place-items-center">
                      <g.icon size={18} />
                    </span>
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Kit</p>
                      <h3 className="font-display text-2xl">{g.label}</h3>
                    </div>
                  </div>
                  <ul className="divide-y divide-foreground/[0.08]">
                    {g.items.map((it) => (
                      <li key={it.n} className="py-3 flex items-baseline justify-between gap-4">
                        <span className="font-medium">{it.n}</span>
                        <span className="text-sm text-muted-foreground text-right">{it.s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section-y container-x">
        <Reveal>
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">The Workflow</p>
          <h2 className="font-display text-4xl md:text-5xl text-center max-w-3xl mx-auto leading-[1.05]">
            Five stages, <span className="italic font-serif gold-gradient-text">one obsession</span>.
          </h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {workflow.map((w, i) => (
            <Reveal key={w.step} delay={i * 70}>
              <div className="soft-card rounded-[2px] p-6 h-full hover-lift relative overflow-hidden">
                <span className="font-display text-5xl gold-gradient-text opacity-90">{w.step}</span>
                <h3 className="font-display text-xl mt-4">{w.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RELIABILITY */}
      <section className="section-y section-ivory border-y border-foreground/[0.05]">
        <div className="container-x">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">Built to Never Miss</p>
            <h2 className="font-display text-4xl md:text-5xl text-center max-w-3xl mx-auto leading-[1.05]">
              Reliability, <span className="italic font-serif gold-gradient-text">engineered in</span>.
            </h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reliability.map((r, i) => (
              <Reveal key={r.t} delay={i * 60}>
                <div className="soft-card rounded-[2px] p-7 h-full hover-lift">
                  <r.icon className="text-gold" size={26} />
                  <h3 className="font-display text-xl mt-5">{r.t}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Crew */}
      <section className="section-y section-cream border-y border-foreground/[0.05]">
        <div className="container-x">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">The Crew</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center max-w-3xl mx-auto leading-[1.05]">
              A tight team, <span className="italic font-serif gold-gradient-text">quietly capable</span>.
            </h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {crew.map((c, i) => (
              <Reveal key={c.r} delay={i * 60}>
                <div className="soft-card rounded-[2px] p-8 hover-lift">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{c.r}</p>
                  <p className="font-display text-2xl mt-3">{c.n}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO NUMBERS */}
      <section className="section-y container-x">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 60}>
              <div className="text-center border-l border-foreground/[0.1] first:border-l-0 lg:border-l">
                <div className="font-display text-5xl md:text-6xl gold-gradient-text">{s.n}</div>
                <p className="mt-4 text-xs tracking-[0.3em] uppercase text-muted-foreground">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="section-y section-ivory border-y border-foreground/[0.05]">
        <div className="container-x grid lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 80}>
              <div className="h-full p-8 border-l-2 border-gold/60">
                <Sparkles className="text-gold" size={22} />
                <h3 className="font-display text-2xl mt-5">{v.t}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FaqSection
        eyebrow="Common Questions"
        title="The practical details."
        faqs={faqs}
      />

      {/* CTA */}
      <section className="section-y section-cream border-y border-foreground/[0.05]">
        <div className="container-x text-center">
          <Reveal>
            <Users className="text-gold mx-auto" size={28} />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-6 leading-[1.05]">
              Ready to <span className="italic font-serif gold-gradient-text">book the crew</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-6">
              Tell us your date, venue, and vision — we'll respond within 24 hours with a tailored proposal.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gold text-gold-foreground text-xs tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-[0_20px_40px_-15px_rgba(214,73,62,0.5)]"
            >
              <Calendar size={14} /> Begin Enquiry <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

