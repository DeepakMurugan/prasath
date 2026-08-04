import { useMemo, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "./Reveal";

type GalleryCategory = "All" | "Weddings" | "Brand" | "Aerial";

type GalleryItem = {
  title: string;
  location: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  accent: string;
};

const items: GalleryItem[] = [
  {
    title: "Golden Hour Vows",
    location: "Udaipur · Destination Wedding",
    category: "Weddings",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80",
    accent: "from-[#d6493e]/70 to-transparent",
  },
  {
    title: "Heritage Launch Film",
    location: "Chennai · Luxury Brand",
    category: "Brand",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80",
    accent: "from-[#c9a46c]/60 to-transparent",
  },
  {
    title: "Nubra Flow Sequence",
    location: "Ladakh · Aerial Cinema",
    category: "Aerial",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80",
    accent: "from-[#2d2a24]/70 to-transparent",
  },
  {
    title: "Private Palace Ceremony",
    location: "Jaipur · Intimate Wedding",
    category: "Weddings",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
    accent: "from-[#d6493e]/60 to-transparent",
  },
  {
    title: "Editorial Campaign Reel",
    location: "Mumbai · Fashion Story",
    category: "Brand",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
    accent: "from-[#8b6d45]/70 to-transparent",
  },
  {
    title: "Cinewhoop Motion Study",
    location: "Goa · FPV Sequence",
    category: "Aerial",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    accent: "from-[#1f1a17]/70 to-transparent",
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

  const filtered = useMemo(() => {
    if (activeTab === "All") return items;
    return items.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const featured = filtered[0];
  const sideCards = filtered.slice(1, 5);

  return (
    <section className="section-y container-x">
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-14">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">{eyebrow}</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {title}
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{intro}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.28em] uppercase transition-all duration-300 ${
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

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.9fr]">
        {featured && (
          <Reveal>
            <div className="group relative overflow-hidden rounded-[2px] editorial-panel min-h-[420px] md:min-h-[520px]">
              <img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-105" />
              <div className={`absolute inset-0 bg-gradient-to-t ${featured.accent} via-foreground/10 to-foreground/85`} />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 text-background">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.3em] uppercase backdrop-blur-sm">
                  <Play size={12} className="ml-0.5" fill="currentColor" /> Featured frame
                </div>
                <h3 className="mt-5 font-display text-3xl md:text-4xl leading-tight">{featured.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-background/80">{featured.location}</p>
              </div>
            </div>
          </Reveal>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          {sideCards.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="group relative overflow-hidden rounded-[2px] editorial-panel aspect-[4/3] sm:aspect-[5/4] xl:aspect-[4/3]">
                <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.accent} via-foreground/10 to-foreground/85`} />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-background">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{item.category}</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm text-background/80">{item.location}</p>
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
  );
}
