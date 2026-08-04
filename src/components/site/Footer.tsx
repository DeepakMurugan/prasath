import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";

const nav = [
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Films" },
  { to: "/services", label: "Services" },
  { to: "/experience", label: "Gear & Crew" },
  { to: "/contact", label: "Enquire" },
] as const;

const services = [
  "Documentary Weddings",
  "Commercial Films",
  "Corporate Shoots",
  "Influencer / Social",
  "FPV / Aerial",
];

export function Footer() {
  return (
    <footer className="relative mt-20 md:mt-24 lg:mt-32 overflow-hidden section-cream border-t border-foreground/[0.06]">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] rounded-full blur-[130px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(214,73,62,0.30), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(214,73,62,0.7), transparent)" }}
      />
      <div aria-hidden className="absolute inset-0 paper-grain pointer-events-none" />

      <div className="relative container-x pt-24 md:pt-32 pb-14">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gold/60" /> Let's create something timeless
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              Your story,{" "}
              <span className="italic font-serif gold-gradient-text">beautifully</span>{" "}
              filmed.
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-gold-foreground text-xs tracking-[0.25em] uppercase hover:brightness-110 transition-all shadow-[0_20px_50px_-15px_rgba(214,73,62,0.5)]"
            >
              Begin a project
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative container-x">
        <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      </div>

      <div className="relative container-x py-14 md:py-16 grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
        <div className="col-span-2 md:col-span-5">
          <Link to="/" className="inline-flex items-baseline">
            <span className="font-display italic text-3xl md:text-4xl tracking-tight text-gold">
              Pause
            </span>
            <span className="ml-2 text-sm tracking-[0.3em] uppercase text-foreground/70">Pictures</span>
          </Link>
          <p className="text-muted-foreground max-w-md leading-relaxed mt-5 text-[15px]">
            A cinematography studio crafting documentary weddings, commercial cinema,
            corporate stories, influencer content and FPV aerial films. Based in Chennai. Available worldwide.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex items-center gap-2 max-w-md rounded-full border border-foreground/10 bg-white p-1.5 pl-5 focus-within:border-gold/70 shadow-[0_10px_30px_-15px_rgba(26,26,26,0.15)] transition-colors"
          >
            <input
              type="email"
              required
              placeholder="Your email for stories & updates"
              className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/70 py-2"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="w-10 h-10 rounded-full bg-gold text-gold-foreground grid place-items-center hover:scale-105 active:scale-95 transition-transform"
            >
              <Send size={15} />
            </button>
          </form>

          <div className="flex gap-3 mt-8">
            {[
              { Icon: Instagram, label: "Instagram", href: "#" },
              { Icon: Youtube, label: "YouTube", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="group relative w-11 h-11 grid place-items-center rounded-full border border-foreground/15 hover:border-gold hover:text-gold transition-all duration-500 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gold/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                <Icon size={16} className="relative" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Navigate</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-gold inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Services</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {services.map((s) => (
              <li key={s} className="hover:text-foreground transition-colors">{s}</li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="mailto:hello@prasathfilms.in" className="flex items-center gap-2 hover:text-foreground">
                <Mail size={13} className="text-gold" /> hello@prasathfilms.in
              </a>
            </li>
            <li>
              <a href="tel:+919800000000" className="flex items-center gap-2 hover:text-foreground">
                <Phone size={13} className="text-gold" /> +91 98000 00000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={13} className="text-gold" /> Chennai · Worldwide
            </li>
          </ul>
        </div>
      </div>

      <div className="relative overflow-hidden select-none pointer-events-none">
        <div
          className="text-center font-display italic leading-none tracking-tight"
          style={{
            fontSize: "clamp(4rem, 14vw, 20rem)",
            background: "linear-gradient(180deg, rgba(214,73,62,0.30) 0%, rgba(214,73,62,0.03) 90%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Pause Pictures
        </div>
      </div>

      <div className="relative border-t border-foreground/[0.08]">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between gap-3 text-[11px] tracking-wider text-muted-foreground">
          <p>© {new Date().getFullYear()} Pause Pictures — All rights reserved.</p>
         <p className="text-sm text-gray-400">
  Website Designed & Developed by{" "}
  <a
    href="https://dtechgrow.com"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-gold hover:underline transition-all"
    aria-label="DTech Grow - Web Design & Development Agency"
  >
    DTech Grow
  </a>
</p>
        </div>
      </div>
    </footer>
  );
}
