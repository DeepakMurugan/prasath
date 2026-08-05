import { useEffect, useMemo, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "./Reveal";

type GalleryCategory = "All" | "Weddings" | "Brand" | "Aerial";

type GalleryItem = {
  title: string;
  location: string;
  category: Exclude<GalleryCategory, "All">;
  videoId: string;
  accent: string;
  description: string;
};

const items: GalleryItem[] = [
  {
    title: "Yuvan Event Promo",
    location: "Event · Chennai",
    category: "Aerial",
    videoId: "YABql04ZDYg",
    accent: "from-[#d6493e]/70 to-transparent",
    description: "A bold motion-led promo with cinematic pacing and polished event energy.",
  },
  {
    title: "Pavi & Aakash Outdoor Shoot",
    location: "Outdoor · Coimbatore",
    category: "Weddings",
    videoId: "hQRVHmbYSa4",
    accent: "from-[#c9a46c]/60 to-transparent",
    description: "A poetic outdoor story with natural movement and editorial warmth.",
  },
  {
    title: "Pride Hospitals Shoot",
    location: "Brand · Chennai",
    category: "Brand",
    videoId: "fNoPlr5A-dY",
    accent: "from-[#2d2a24]/70 to-transparent",
    description: "A premium brand film crafted for clarity, trust, and immersive storytelling.",
  },
  {
    title: "Kishore & Priya Outdoor Shoot",
    location: "Outdoor · Chennai",
    category: "Weddings",
    videoId: "skK4Y4hwXx4",
    accent: "from-[#8b6d45]/70 to-transparent",
    description: "A soft, sunlit outdoor portrait film that feels intimate and timeless.",
  },
  {
    title: "Aparajith Jayaveena Marriage Shoot",
    location: "Wedding · Chennai",
    category: "Weddings",
    videoId: "FhesjyTUJV4",
    accent: "from-[#8b6d45]/60 to-transparent",
    description: "An emotional marriage film with intimate coverage and refined pacing.",
  },
  {
    title: "KK Hari Marriage Shoot",
    location: "Wedding · Chennai",
    category: "Weddings",
    videoId: "T-W8_PMyK9k",
    accent: "from-[#d6493e]/60 to-transparent",
    description: "A warm, story-led marriage film with elegant movement and detail.",
  },
  {
    title: "மழைநீர் சேமிப்பு - Concept Creative",
    location: "Concept · Chennai",
    category: "Brand",
    videoId: "hdy_oltMaok",
    accent: "from-[#1f1a17]/70 to-transparent",
    description: "A concept-driven creative film built around a clear social message and visual rhythm.",
  },
];

const tabs: GalleryCategory[] = ["All", "Weddings", "Brand", "Aerial"];

export function GalleryShowcase({
  eyebrow = "Gallery",
  title = "A cinematic archive, reimagined.",
  intro = "A layered gallery of weddings, brand stories, and aerial sequences — designed to feel like a modern editorial spread.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("All");
  const [activeVideoId, setActiveVideoId] = useState(items[0].videoId);
  const tabListRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (activeTab === "All") return items;
    return items.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const featured = filtered.find((item) => item.videoId === activeVideoId) ?? filtered[0];
  const remainingCards = filtered.filter((item) => item.videoId !== featured?.videoId);

  useEffect(() => {
    if (!filtered.some((item) => item.videoId === activeVideoId)) {
      setActiveVideoId(filtered[0]?.videoId ?? items[0].videoId);
    }
  }, [activeVideoId, filtered]);

  useEffect(() => {
    const button = tabListRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${activeTab}"]`);
    button?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeTab]);

  return (
    <section className="section-y container-x">
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-14">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">{eyebrow}</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-gold">
              {title}
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{intro}</p>
          </div>
          <div ref={tabListRef} className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                data-tab={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 snap-start rounded-full border px-4 py-2 text-[11px] tracking-[0.28em] uppercase transition-all duration-300 ${
                  activeTab === tab
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-foreground/10 text-foreground/70 hover:border-gold hover:text-gold"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col gap-4">
        {featured && (
          <Reveal>
            <button
              type="button"
              onClick={() => setActiveVideoId(featured.videoId)}
              className="group relative h-full min-h-[280px] w-full overflow-hidden rounded-[2px] editorial-panel text-left md:min-h-[340px]"
            >
              <div className="absolute inset-0 bg-[#1b1412]">
                <iframe
                  src={`https://www.youtube.com/embed/${featured.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&iv_load_policy=3&disablekb=1&rel=0&playsinline=1&loop=1&playlist=${featured.videoId}`}
                  title={featured.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t ${featured.accent} via-[#1b1412]/30 to-[#1b1412]/90`} />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-background sm:p-6 md:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] tracking-[0.3em] uppercase backdrop-blur-sm sm:text-[10px]">
                  <Play size={12} className="ml-0.5" fill="currentColor" /> Featured film
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight text-gold sm:mt-5 sm:text-3xl md:text-4xl">{featured.title}</h3>
                <p className="mt-2 max-w-md text-[11px] leading-relaxed text-gold/90 sm:mt-3 sm:text-sm">{featured.description}</p>
                <p className="mt-2 text-[11px] text-gold/90 sm:mt-3 sm:text-sm">{featured.location}</p>
              </div>
            </button>
          </Reveal>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {remainingCards.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <button
                type="button"
                onClick={() => setActiveVideoId(item.videoId)}
                className={`group relative h-full min-h-[180px] w-full overflow-hidden rounded-[2px] editorial-panel text-left ${
                  activeVideoId === item.videoId ? "ring-2 ring-gold/70" : ""
                }`}
              >
                <div className="absolute inset-0 bg-[#1b1412]">
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${item.accent} via-[#1b1412]/20 to-[#1b1412]/90`} />
                <div className="absolute inset-x-0 bottom-0 p-4 text-background sm:p-5 md:p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gold sm:text-[10px]">{item.category}</p>
                  <h3 className="mt-2 font-display text-lg leading-tight text-gold sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-[11px] text-gold/90 sm:text-sm">{item.location}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
