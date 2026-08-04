import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * MagneticButton — pointer-tracking magnetic pull for elite CTAs.
 * Renders a motion.div wrapper — put your <Link>/<button> inside.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });
  const innerX = useTransform(sx, (v) => v * 0.45);
  const innerY = useTransform(sy, (v) => v * 0.45);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ""}`}
    >
      <motion.div style={{ x: innerX, y: innerY }} className="inline-block">
        {children}
      </motion.div>
    </motion.div>
  );
}
