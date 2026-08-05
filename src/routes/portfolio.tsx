import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Films - Pause Pictures" },
      { name: "description", content: "A collection of films that blend creativity, storytelling, and visual craftsmanship to create memorable experiences." },
      { property: "og:title", content: "Films — Pause Pictures" },
      { property: "og:description", content: "Weddings, commercials, and creative films — from Chennai to the world." },
    ],
  }),
  component: Portfolio,
});

type Cat = "All" | "Weddings" | "Commercial" | "Creative";

type PortfolioItem = {
  title: string;
  meta: string;
  cat: Exclude<Cat, "All">;
  videoId: string;
  description: string;
};

const items: PortfolioItem[] = [
  {
    title: "Yuvan Event Promo",
    meta: "Event · Chennai",
    cat: "Creative",
    videoId: "YABql04ZDYg",
    description: "High-energy event motion with a cinematic rhythm built for social release and brand recall.",
  },
  {
    title: "Pavi & Aakash Outdoor Shoot",
    meta: "Outdoor · Coimbatore",
    cat: "Weddings",
    videoId: "hQRVHmbYSa4",
    description: "A warmth-led outdoor story with natural movement, editorial framing, and immersive light.",
  },
  {
    title: "Pride Hospitals Shoot",
    meta: "Brand · Chennai",
    cat: "Commercial",
    videoId: "fNoPlr5A-dY",
    description: "A polished brand film focused on clarity, trust, and cinematic storytelling for healthcare.",
  },
  {
    title: "Kishore & Priya Outdoor Shoot",
    meta: "Outdoor · Chennai",
    cat: "Weddings",
    videoId: "skK4Y4hwXx4",
    description: "A soft, sunlit outdoor portrait film that feels intimate and timeless.",
  },
  {
    title: "Aparajith Jayaveena Marriage Shoot",
    meta: "Wedding · Chennai",
    cat: "Weddings",
    videoId: "FhesjyTUJV4",
    description: "An intimate marriage story captured with emotional rhythm and warm editorial detail.",
  },
  {
    title: "KK Hari Marriage Shoot",
    meta: "Wedding · Chennai",
    cat: "Weddings",
    videoId: "T-W8_PMyK9k",
    description: "A wedding film with graceful pacing, expressive movement, and story-first coverage.",
  },
  {
    title: "மழைநீர் சேமிப்பு - Concept Creative",
    meta: "Concept Creative · Chennai",
    cat: "Creative",
    videoId: "hdy_oltMaok",
    description: "A concept-led creative film shaped around social impact and visual clarity.",
  },
];

const getEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${videoId}`;

function Portfolio() {
  const [cat, setCat] = useState<Cat>("All");
  const [activeVideoId, setActiveVideoId] = useState(items[0].videoId);

  const filtered = useMemo(() => (cat === "All" ? items : items.filter((item) => item.cat === cat)), [cat]);
  const activeVideo = filtered.find((item) => item.videoId === activeVideoId) ?? filtered[0];

  useEffect(() => {
    if (!filtered.some((item) => item.videoId === activeVideoId)) {
      setActiveVideoId(filtered[0]?.videoId ?? items[0].videoId);
    }
  }, [activeVideoId, filtered]);

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
                Play the film you want, and let the rest stay ready in a looped, responsive gallery.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Weddings", "Commercial", "Creative"] as Cat[]).map((c) => (
                <button
                  key={c}
                  type="button"
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

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={80}>
            <div className="rounded-[2px] editorial-panel bg-[#fffaf3] p-3 md:p-4">
              <div className="relative aspect-video overflow-hidden rounded-[2px] bg-black">
                {activeVideo && (
                  <iframe
                    src={getEmbedUrl(activeVideo.videoId)}
                    title={activeVideo.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[10px] tracking-[0.28em] uppercase text-gold">
                  {activeVideo?.cat}
                </span>
                <span className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
                  Looping showcase
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl md:text-3xl leading-tight">{activeVideo?.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{activeVideo?.meta}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{activeVideo?.description}</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {filtered.map((item, index) => (
              <Reveal key={item.title} delay={120 + index * 70}>
                <button
                  type="button"
                  onClick={() => setActiveVideoId(item.videoId)}
                  className={`group w-full overflow-hidden rounded-[2px] editorial-panel text-left ${
                    activeVideo?.videoId === item.videoId ? "ring-2 ring-gold/70" : ""
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-background">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] tracking-[0.28em] uppercase backdrop-blur-sm">
                        <Play size={11} className="ml-0.5" fill="currentColor" /> Play
                      </div>
                      <p className="mt-3 text-[10px] tracking-[0.3em] uppercase text-gold">{item.cat}</p>
                      <h3 className="mt-1 font-display text-xl leading-tight">{item.title}</h3>
                      <p className="mt-1 text-sm text-background/80">{item.meta}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
