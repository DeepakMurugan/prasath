import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

type FaqItem = {
  q: string;
  a: string;
};

export function FaqSection({
  eyebrow = "Common Questions",
  title = "The practical details.",
  faqs,
}: {
  eyebrow?: string;
  title?: string;
  faqs: FaqItem[];
}) {
  return (
    <section className="section-y container-x">
      <Reveal>
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 text-center">{eyebrow}</p>
        <h2 className="font-display text-4xl md:text-5xl text-center max-w-3xl mx-auto leading-[1.05] mb-14">
          {title.split(" ").map((word, index) => {
            const isAccent = word.toLowerCase() === "practical" || word.toLowerCase() === "quiet" || word.toLowerCase() === "timeless";
            if (!isAccent) {
              return <span key={`${word}-${index}`} className="mr-2">{word}</span>;
            }
            return (
              <span key={`${word}-${index}`} className="italic font-serif gold-gradient-text mr-2">
                {word}
              </span>
            );
          })}
        </h2>
      </Reveal>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details className="soft-card rounded-[2px] p-6 group">
              <summary className="font-display text-lg cursor-pointer list-none flex items-start justify-between gap-4">
                <span>{f.q}</span>
                <CheckCircle2 className="text-gold shrink-0 mt-1 transition-transform group-open:rotate-90" size={18} />
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
