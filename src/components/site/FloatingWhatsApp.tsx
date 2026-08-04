import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "919800000000";
const MESSAGE = "Hello Pause Pictures, I'd like to enquire about a project.";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => setPulse(false)}
      className={`fixed z-[70] bottom-5 right-5 md:bottom-7 md:right-7 w-12 h-12 md:w-14 md:h-14 rounded-full grid place-items-center transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${pulse ? "gold-pulse" : ""}`}
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 12px 30px -8px rgba(37,211,102,0.45), 0 0 0 4px rgba(255,255,255,0.5)",
      }}
    >
      <svg viewBox="0 0 32 32" width="22" height="22" fill="white" aria-hidden>
        <path d="M19.11 17.34c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15s-.78.98-.96 1.18c-.18.2-.35.22-.65.07s-1.26-.46-2.4-1.48c-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.5-.5-.68-.51-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.28-.2-.58-.35zM16.02 5.33c-5.85 0-10.6 4.76-10.6 10.6 0 1.87.5 3.7 1.44 5.3L5 26.67l5.6-1.47a10.55 10.55 0 0 0 5.42 1.48h.01c5.84 0 10.6-4.75 10.6-10.6 0-2.83-1.1-5.5-3.1-7.5-2-2-4.66-3.1-7.5-3.1z"/>
      </svg>
    </a>
  );
}
