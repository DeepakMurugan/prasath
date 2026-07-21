import { useEffect, useRef } from "react";

/**
 * Cinematic galaxy / starfield canvas.
 * - Moving stars (parallax layers)
 * - Warm gold nebula clouds matching theme
 * - Occasional shooting star
 * Fully responsive, DPR-aware, respects reduced-motion.
 */
export function GalaxyBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; z: number; r: number; tw: number; tp: number };
    let stars: Star[] = [];
    type Shoot = { x: number; y: number; vx: number; vy: number; life: number; max: number } | null;
    let shoot: Shoot = null;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = Math.min(1, (w * h) / (1920 * 1080));
      const count = Math.floor(220 * density) + 80;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1, // depth
        r: Math.random() * 1.3 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tp: Math.random() * 0.02 + 0.005,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pre-render nebula on offscreen for perf
    const nebula = document.createElement("canvas");
    const nctx = nebula.getContext("2d")!;
    const renderNebula = () => {
      nebula.width = w; nebula.height = h;
      const blobs = [
        { x: w * 0.15, y: h * 0.25, r: Math.max(w, h) * 0.55, c: "rgba(198,169,105,0.18)" },
        { x: w * 0.85, y: h * 0.75, r: Math.max(w, h) * 0.6, c: "rgba(180,130,70,0.14)" },
        { x: w * 0.6, y: h * 0.15, r: Math.max(w, h) * 0.45, c: "rgba(120,90,160,0.10)" },
        { x: w * 0.3, y: h * 0.85, r: Math.max(w, h) * 0.5, c: "rgba(80,60,120,0.10)" },
      ];
      blobs.forEach((b) => {
        const g = nctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.c);
        g.addColorStop(1, "rgba(0,0,0,0)");
        nctx.fillStyle = g;
        nctx.fillRect(0, 0, w, h);
      });
    };
    const roN = new ResizeObserver(renderNebula);
    roN.observe(canvas);
    renderNebula();

    let raf = 0;
    let last = performance.now();
    let mouseX = 0, mouseY = 0, tx = 0, ty = 0;
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - w / 2) / w;
      mouseY = (e.clientY - rect.top - h / 2) / h;
    };
    window.addEventListener("mousemove", onMouse);

    const tick = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;

      tx += (mouseX * 20 - tx) * 0.04;
      ty += (mouseY * 20 - ty) * 0.04;

      ctx.clearRect(0, 0, w, h);
      // deep space base
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#05050a");
      bg.addColorStop(1, "#080808");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      // nebula
      ctx.drawImage(nebula, 0, 0);

      // stars
      for (const s of stars) {
        if (!reduced) {
          s.x += (0.02 + s.z * 0.06) * (dt / 16);
          s.tw += s.tp * (dt / 16);
        }
        if (s.x > w + 4) s.x = -4;
        const px = s.x + tx * s.z;
        const py = s.y + ty * s.z;
        const a = 0.4 + Math.sin(s.tw) * 0.35 + s.z * 0.25;
        const rad = s.r * (0.6 + s.z);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,240,210,${Math.max(0, Math.min(1, a))})`;
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
        if (s.z > 0.75) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(198,169,105,${a * 0.25})`;
          ctx.arc(px, py, rad * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // shooting star
      if (!reduced) {
        if (!shoot && Math.random() < 0.004) {
          const sy = Math.random() * h * 0.6;
          shoot = { x: -50, y: sy, vx: 8 + Math.random() * 6, vy: 2 + Math.random() * 2, life: 0, max: 80 };
        }
        if (shoot) {
          shoot.x += shoot.vx;
          shoot.y += shoot.vy;
          shoot.life += 1;
          const grad = ctx.createLinearGradient(shoot.x - shoot.vx * 12, shoot.y - shoot.vy * 12, shoot.x, shoot.y);
          grad.addColorStop(0, "rgba(198,169,105,0)");
          grad.addColorStop(1, "rgba(255,240,210,0.9)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(shoot.x - shoot.vx * 12, shoot.y - shoot.vy * 12);
          ctx.lineTo(shoot.x, shoot.y);
          ctx.stroke();
          if (shoot.life > shoot.max || shoot.x > w + 60) shoot = null;
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      roN.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
