import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Films — Pause Pictures" },
      { name: "description", content: "A collection of films that blend creativity, storytelling, and visual craftsmanship to create memorable experiences." },
      { property: "og:title", content: "Films — Pause Pictures" },
      { property: "og:description", content: "Weddings, commercials, and creative films — from Chennai to the world." },
    ],
  }),
  component: Portfolio,
});

type Cat = "All" | "Weddings" | "Commercial" | "Creative";

const items: { title: string; meta: string; cat: Exclude<Cat, "All">; img: string; big?: boolean }[] = [
  { title: "Ananya & Rohan", meta: "Leela Palace · Udaipur", cat: "Weddings", big: true, img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80" },
  { title: "Tanishq Heritage", meta: "Commercial · Chennai", cat: "Commercial", img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&q=80" },
  { title: "Priya & Karthik", meta: "Chettinad · Karaikudi", cat: "Weddings", img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1000&q=80" },
  { title: "Aerial Symphony", meta: "FPV · Ladakh", cat: "Creative", big: true, img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1400&q=80" },
  { title: "Sabyasachi Editorial", meta: "Fashion · Kolkata", cat: "Commercial", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80" },
  { title: "Meera & Arjun", meta: "Beach · Goa", cat: "Weddings", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&q=80" },
  { title: "Coldplay India", meta: "Concert · Mumbai", cat: "Creative", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1000&q=80" },
  { title: "JW Marriott Reveal", meta: "Hospitality · Chennai", cat: "Commercial", img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1000&q=80" },
  { title: "Sara & Aditya", meta: "Palace · Jaipur", cat: "Weddings", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=80" },
];

function Portfolio() {
  const [cat, setCat] = useState<Cat>("All");
  const filtered = useMemo(() => cat === "All" ? items : items.filter((i) => i.cat === cat), [cat]);

  return (
    <div className="paper-grain">
      <Nav />
      <PageHero
        variant="grid"
        timecode="00:04:32:11"
        eyebrow="Films · Selected Archive"
        title={<>Frames From <span className="italic font-serif gold-gradient-text">Archive</span></>}
        subtitle="A collection of films that blend creativity, storytelling, and visual craftsmanship to create memorable experiences."
      />

      <section className="section-y container-x">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-14">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Featured Work</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                A modern archive of cinematic moments.
              </h2>
              <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">
                Browse by story type and explore the atmosphere, movement, and detail behind each film.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Weddings", "Commercial", "Creative"] as Cat[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.28em] uppercase transition-all duration-300 ${
                    cat === c
                      ? "border-gold bg-gold text-gold-foreground"
                      : "border-foreground/10 text-foreground/70 hover:border-gold hover:text-gold"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          {filtered[0] && (
            <Reveal delay={80}>
              <div className="group relative overflow-hidden rounded-[2px] editorial-panel min-h-[420px] md:min-h-[520px]">
                <img
                  src={filtered[0].img}
                  alt={filtered[0].title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 text-background">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.3em] uppercase backdrop-blur-sm">
                    <Play size={12} className="ml-0.5" fill="currentColor" /> Featured film
                  </div>
                  <h3 className="mt-5 font-display text-3xl md:text-4xl leading-tight">{filtered[0].title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-background/80">{filtered[0].meta}</p>
                </div>
              </div>
            </Reveal>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {filtered.slice(1, 5).map((f, i) => (
              <Reveal key={f.title} delay={120 + i * 80}>
                <div className="group relative overflow-hidden rounded-[2px] editorial-panel aspect-[4/3] sm:aspect-[5/4] xl:aspect-[4/3]">
                  <img
                    src={f.img}
                    alt={f.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-background">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{f.cat}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight">{f.title}</h3>
                    <p className="mt-2 text-sm text-background/80">{f.meta}</p>
                  </div>
                  <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-background backdrop-blur-sm transition-transform duration-500 group-hover:translate-x-1">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
