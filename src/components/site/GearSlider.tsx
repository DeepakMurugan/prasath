import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, Aperture, Plane, Mic, Monitor } from "lucide-react";

export type GearCard = {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  headline: string;
  items: string[];
  img: string;
};

const defaultGear: GearCard[] = [
  {
    icon: Camera,
    label: "Cinema Bodies",
    headline: "Sony Cinema Line",
    items: ["Sony FX3", "Sony A7S III", "Sony A7 IV"],
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80",
  },
  {
    icon: Aperture,
    label: "Prime & Zoom Glass",
    headline: "GM & Sigma Art",
    items: ["24-70mm f/2.8 GM", "35mm f/1.2 Art", "70-200mm f/2.8 GM"],
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
  },
  {
    icon: Plane,
    label: "Aerial & FPV",
    headline: "DJI + Custom FPV",
    items: ["DJI Mavic 3 Cine", "DJI Avata 2", "Custom 5\" FPV"],
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80",
  },
  {
    icon: Mic,
    label: "Location Audio",
    headline: "Broadcast Grade",
    items: ["RØDE Wireless Pro", "Sennheiser MKH 416", "Zoom F6"],
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=80",
  },
  {
    icon: Monitor,
    label: "Post & Colour",
    headline: "Reference Suite",
    items: ["Mac Studio M2 Ultra", "DaVinci Resolve Studio", "Eizo CG319X"],
    img: "https://images.unsplash.com/photo-1626170733248-7f6c9dbd8be0?w=1200&q=80",
  },
];

export function GearSlider({ cards = defaultGear }: { cards?: GearCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-gear-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => (
          <motion.article
            key={c.label}
            data-gear-card
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="snap-start shrink-0 w-[82%] sm:w-[52%] md:w-[38%] lg:w-[30%] group"
          >
            <div className="relative overflow-hidden rounded-[2px] soft-card gold-sheen h-full">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-3 text-background">
                  <span className="w-10 h-10 rounded-full bg-gold/90 text-gold-foreground grid place-items-center backdrop-blur-md">
                    <c.icon size={16} />
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-background/85">{c.label}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <h3 className="font-display text-2xl lg:text-3xl leading-tight">{c.headline}</h3>
                  <ul className="mt-4 space-y-1.5">
                    {c.items.map((it) => (
                      <li key={it} className="text-[13px] tracking-[0.05em] text-background/80 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          Drag · Swipe · Explore the kit
        </p>
        <div className="flex gap-3">
          <button
            aria-label="Previous gear"
            onClick={() => scrollBy(-1)}
            className="w-11 h-11 rounded-full border border-foreground/20 grid place-items-center hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next gear"
            onClick={() => scrollBy(1)}
            className="w-11 h-11 rounded-full border border-foreground/20 grid place-items-center hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
