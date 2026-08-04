import { useEffect, useRef, type ReactNode } from "react";

type Variant = "portrait" | "grid" | "aperture" | "signal" | "focus" | "default";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  variant = "default",
  timecode,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  variant?: Variant;
  timecode?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 600);
        el.style.setProperty("--py", `${y * 0.18}px`);
        el.style.setProperty("--pyo", `${1 - Math.min(1, y / 500)}`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Split title into words for masked rise reveal (only when a plain string)
  const renderTitle = () => {
    if (typeof title === "string") {
      return title.split(" ").map((w, i) => (
        <span key={i} className="word-mask">
          <span className="word-inner" style={{ animationDelay: `${120 + i * 70}ms` }}>{w}</span>
        </span>
      ));
    }
    return title;
  };

  return (
    <section
      ref={ref}
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden paper-grain section-champagne corner-marks"
    >
      {/* Signature per-page backdrop */}
      <VariantBackdrop variant={variant} />

      {/* Universal light sweep */}
      <div className="light-sweep" aria-hidden />

      {/* Ambient orbs */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full blur-[130px] opacity-40 orb-drift"
        style={{ background: "radial-gradient(circle, rgba(214,73,62,0.35), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[30rem] h-[30rem] rounded-full blur-[130px] opacity-30 orb-drift"
        style={{ background: "radial-gradient(circle, rgba(214,73,62,0.22), transparent 60%)", animationDelay: "-6s" }}
      />

      {/* Timecode strip — top right */}
      <div className="absolute top-24 right-6 sm:right-10 hidden md:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-foreground/60 font-mono">
        <span className="rec-dot" />
        <span>REC · {timecode ?? "00:00:12:04"}</span>
      </div>

      <div
        className="container-x relative"
        style={{ transform: "translateY(calc(var(--py, 0px) * -1))", opacity: "var(--pyo, 1)" }}
      >
        <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-5 sm:mb-6 reveal-up flex items-center gap-3">
          <span className="w-8 h-px bg-gold/60" />
          {eyebrow}
        </p>
        <h1 className="font-display font-normal text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[6.5rem] max-w-5xl">
          {renderTitle()}
        </h1>
        {subtitle && (
          <p
            className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground reveal-up leading-relaxed"
            style={{ animationDelay: "600ms" }}
          >
            {subtitle}
          </p>
        )}
        {children}

        {/* Scroll cue */}
        <div className="mt-10 sm:mt-14 lg:mt-16 flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-foreground/50 reveal-up" style={{ animationDelay: "800ms" }}>
          <span className="w-10 h-px bg-foreground/30" />
          Scroll to explore
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 gold-divider" />
    </section>
  );
}

function VariantBackdrop({ variant }: { variant: Variant }) {
  if (variant === "portrait") {
    // Vertical filmstrip columns — About
    return (
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute inset-y-0 left-[8%] w-6 film-strip" />
        <div className="absolute inset-y-0 right-[8%] w-6 film-strip" style={{ animationDelay: "-1.2s" }} />
      </div>
    );
  }
  if (variant === "grid") {
    // Contact-sheet frames — Portfolio
    const cells = Array.from({ length: 12 });
    return (
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-2 gap-2 p-8">
          {cells.map((_, i) => (
            <div
              key={i}
              className="sheet-cell rounded-[2px]"
              style={{ animationDelay: `${i * 90}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (variant === "aperture") {
    // Aperture blades — Services
    return (
      <div aria-hidden className="absolute -right-40 -top-20 w-[42rem] h-[42rem] pointer-events-none opacity-70">
        <div className="aperture-blade" />
        <div className="aperture-blade-2" />
        <div className="aperture-blade" style={{ inset: "18%", animationDuration: "80s" }} />
        <div className="aperture-blade-2" style={{ inset: "28%", animationDuration: "100s" }} />
      </div>
    );
  }
  if (variant === "signal") {
    // Ping rings — Contact
    return (
      <div aria-hidden className="absolute right-16 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-80 hidden md:block">
        <div className="ping-ring inset-0" />
        <div className="ping-ring inset-0" style={{ animationDelay: "1s" }} />
        <div className="ping-ring inset-0" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_20px_rgba(214,73,62,0.8)]" />
        </div>
      </div>
    );
  }
  if (variant === "focus") {
    // Focus-pull concentric rings — Experience
    return (
      <div aria-hidden className="absolute -right-20 top-10 w-[32rem] h-[32rem] pointer-events-none opacity-80">
        <div className="focus-ring inset-0" />
        <div className="focus-ring" style={{ inset: "12%", animationDelay: "0.8s" }} />
        <div className="focus-ring" style={{ inset: "26%", animationDelay: "1.6s" }} />
        <div className="focus-ring" style={{ inset: "40%", animationDelay: "2.4s" }} />
      </div>
    );
  }
  return null;
}
