import { Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const WA_NUMBER = "918920942738";
const PHONE_DISPLAY = "+91 89209 42738";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in learning more about Qualibytes programs!")}`;

export default function BottomHelpBar({ onRequestCall }: any) {
  const [location] = useLocation();
  const [hiddenBySection, setHiddenBySection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Section-based hiding (ProgramsSection se event)
  useEffect(() => {
    const handler = (e: Event) => {
      setHiddenBySection((e as CustomEvent).detail.hide);
    };
    window.addEventListener("toggleBottomBar", handler);
    return () => window.removeEventListener("toggleBottomBar", handler);
  }, []);

  const hiddenByRoute = isMobile && location.startsWith("/courses/");

  if (hiddenByRoute || hiddenBySection) return null;

  return (
    <>
      <style>{`
        @keyframes bhb-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bhb-pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
        @keyframes bhb-glow-pulse {
          0%, 100% { box-shadow: 0 0 12px rgba(59,130,246,0.5); }
          50% { box-shadow: 0 0 28px rgba(59,130,246,0.9); }
        }
        @keyframes bhb-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bhb-wa-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(34,197,94,0.5); }
          50% { box-shadow: 0 0 28px rgba(34,197,94,0.9); }
        }
      `}</style>

      {/* Spacer */}
      <div className="block h-[60px] sm:h-[44px]" aria-hidden="true" />

      <div
        className="fixed bottom-0 left-0 right-0 z-[9998]"
        style={{ animation: "bhb-slide-up 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {/* ── MOBILE ── */}
        <div
          className="flex sm:hidden"
          style={{
            background: "linear-gradient(135deg, #020E3A 0%, #041C5C 100%)",
            borderTop: "1px solid rgba(59,130,246,0.3)",
            boxShadow: "0 -8px 32px rgba(2,14,58,0.8)",
            minHeight: "60px",
          }}
        >
          {/* CALL */}
          <button
            onClick={onRequestCall}
            className="flex-1 relative flex items-center justify-center gap-2.5 py-3.5 overflow-hidden group"
            style={{ borderRight: "1px solid rgba(59,130,246,0.2)" }}
          >
            <div
              className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-150"
              style={{ background: "rgba(37,99,235,0.25)" }}
            />
            <div
              className="relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                boxShadow: "0 0 14px rgba(59,130,246,0.6)",
                animation: "bhb-glow-pulse 2s ease-in-out infinite",
              }}
            >
              <Phone size={14} className="text-white" />
            </div>
            <div className="relative text-left">
              <div className="text-xs text-blue-300/60 font-semibold uppercase tracking-widest leading-none mb-0.5">
                Talk to us
              </div>
              <div className="text-sm font-black text-white leading-none">
                Request Call
              </div>
            </div>
          </button>

          {/* WHATSAPP */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 relative flex items-center justify-center gap-2.5 py-3.5 overflow-hidden group"
          >
            <div
              className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-150"
              style={{ background: "rgba(22,163,74,0.25)" }}
            />
            <div
              className="relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                boxShadow: "0 0 14px rgba(34,197,94,0.6)",
                animation: "bhb-wa-glow 2s ease-in-out 0.5s infinite",
              }}
            >
              <MessageCircle size={14} className="text-white" />
            </div>
            <div className="relative text-left">
              <div className="text-xs text-green-300/60 font-semibold uppercase tracking-widest leading-none mb-0.5">
                Chat now
              </div>
              <div className="text-sm font-black text-white leading-none">
                WhatsApp
              </div>
            </div>
          </a>
        </div>

        {/* ── DESKTOP ── */}
        <div
          className="hidden sm:flex items-center justify-center gap-3 py-1.5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #020E3A 0%, #041C5C 50%, #020E3A 100%)",
            borderTop: "1px solid rgba(59,130,246,0.25)",
            boxShadow: "0 -8px 40px rgba(2,14,58,0.9)",
            minHeight: "44px",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.06) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "bhb-shimmer 4s linear infinite",
            }}
          />

          <div className="relative flex items-center gap-1.5">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 rounded-full bg-green-400" />
              <div
                className="absolute inset-0 rounded-full bg-green-400"
                style={{ animation: "bhb-pulse-dot 1.5s ease-in-out infinite" }}
              />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "rgba(147,197,253,0.6)" }}>
              Live Support
            </span>
          </div>

          <div className="w-px h-4 opacity-20" style={{ background: "#93c5fd" }} />

          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
            Need Help? Talk to us at
          </span>

          <a
            href="tel:+918920942738"
            className="font-black text-sm tracking-wide"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 8px rgba(251,191,36,0.4))",
            }}
          >
            {PHONE_DISPLAY}
          </a>

          <div className="w-px h-4 opacity-20" style={{ background: "#93c5fd" }} />

          <button
            onClick={onRequestCall}
            className="group relative overflow-hidden flex items-center gap-2 px-5 py-1.5 rounded-full font-black text-xs tracking-widest uppercase"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff",
              border: "1px solid rgba(99,179,237,0.3)",
              boxShadow: "0 0 20px rgba(59,130,246,0.35)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
              el.style.color = "#000";
              el.style.boxShadow = "0 0 28px rgba(245,158,11,0.5)";
              el.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
              el.style.color = "#fff";
              el.style.boxShadow = "0 0 20px rgba(59,130,246,0.35)";
              el.style.transform = "scale(1)";
            }}
          >
            <Phone size={11} />
            Request a Call
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
            />
          </button>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              color: "#fff",
              border: "1px solid rgba(34,197,94,0.3)",
              boxShadow: "0 0 16px rgba(34,197,94,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(34,197,94,0.6)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(34,197,94,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <MessageCircle size={11} />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}