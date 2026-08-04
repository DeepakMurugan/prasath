import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Elite editorial easing — "expensive" out-curve
const EASE = [0.16, 1, 0.3, 1] as const;
const DUR = 0.7;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export function MotionStagger({
  children,
  className,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/**
 * SplitReveal — cinematic word-by-word slide-up from a hidden boundary.
 * Wraps each word in a mask; letters/words rise into view.
 */
export function SplitReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  stagger?: number;
}) {
  const words = text.split(" ");
  const Comp = motion[Tag] as typeof motion.span;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.14em] mr-[0.28em]"
          aria-hidden
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.75, ease: EASE } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/**
 * RevealImage — "Darkroom Lens Focus": scales down 1.06 → 1.0 and fades in
 * as it scrolls into view, then subtle zoom-in on hover.
 */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden group ${className ?? ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.4, ease: EASE }}
        className={`w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04] ${imgClassName ?? ""}`}
      />
      {children}
    </motion.div>
  );
}
