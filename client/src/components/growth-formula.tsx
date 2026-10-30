import { TrendingUp, Users, Briefcase, ArrowRight, Zap, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ContactFormPopup from "@/components/ContactFormPopup";

const growthFeatures = [
  {
    icon: TrendingUp,
    title: "Accelerated Learning",
    description: "Learn faster with our proven methodology built by industry veterans.",
    stat: "3x",
    statLabel: "Faster Progress",
    accent: "#3b82f6",
    glow: "#60a5fa",
    card: "#1e3a8a",
    emoji: "⚡",
  },
  {
    icon: Users,
    title: "Industry Experts",
    description: "Learn from working professionals with real-world battle-tested experience.",
    stat: "50+",
    statLabel: "Expert Mentors",
    accent: "#22c55e",
    glow: "#4ade80",
    card: "#14532d",
    emoji: "🎯",
  },
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "Get clarity on roles, salary & roadmap with personalized career coaching.",
    stat: "95%",
    statLabel: "Placement Rate",
    accent: "#f59e0b",
    glow: "#fbbf24",
    card: "#78350f",
    emoji: "🚀",
  },
];

function FeatureCard({
  feature, index, visible,
}: {
  feature: typeof growthFeatures[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
      style={{
        transform: visible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.9)",
        opacity: visible ? 1 : 0,
        transition: `all 0.8s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.15 + 0.2}s`,
      }}
    >
      {/* Glow aura */}
      <div
        className="absolute -inset-3 rounded-3xl blur-2xl pointer-events-none transition-opacity duration-500"
        style={{ background: feature.glow, opacity: hovered ? 0.2 : 0 }}
      />

      <div
        className="relative rounded-2xl border overflow-hidden h-full"
        style={{
          background: `linear-gradient(145deg, ${feature.card}f2, ${feature.card}b8)`,
          borderColor: hovered ? feature.accent : `${feature.accent}40`,
          boxShadow: hovered
            ? `0 24px 60px ${feature.glow}44, inset 0 1px 0 rgba(255,255,255,0.12)`
            : "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "all 0.4s ease",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full origin-left transition-transform duration-500"
          style={{
            background: `linear-gradient(90deg, ${feature.accent}, ${feature.glow}, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.4)",
          }}
        />

        {/* Emoji badge */}
        <div
          className="absolute top-4 right-4 text-xs font-black px-2 py-0.5 rounded-full"
          style={{
            background: `${feature.accent}22`,
            color: feature.accent,
            border: `1px solid ${feature.accent}55`,
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          {feature.emoji}
        </div>

        <div className="p-5">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: `linear-gradient(135deg, ${feature.accent}33, ${feature.accent}11)`,
              border: `1.5px solid ${feature.accent}44`,
              boxShadow: hovered ? `0 0 28px ${feature.glow}55` : "none",
              transform: hovered ? "scale(1.1) rotate(6deg)" : "scale(1) rotate(0deg)",
              transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <Icon size={28} style={{ color: feature.accent }} />
          </div>

          {/* Title */}
          <h4
            className="font-black text-xl mb-2 text-white"
            style={{ letterSpacing: "-0.01em" }}
          >
            {feature.title}
          </h4>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            {feature.description}
          </p>

          {/* Stat pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: `${feature.accent}18`,
              border: `1px solid ${feature.accent}33`,
            }}
          >
            <span
              className="text-2xl font-black"
              style={{ color: feature.glow, filter: `drop-shadow(0 0 6px ${feature.glow}88)` }}
            >
              {feature.stat}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: feature.accent }}>
              {feature.statLabel}
            </span>
          </div>
        </div>

        {/* Scanline sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${feature.accent}09 50%, transparent 100%)`,
            backgroundSize: "100% 48px",
            opacity: hovered ? 1 : 0,
            animation: hovered ? "gf-scanline 2s linear infinite" : "none",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function GrowthFormula() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes gf-grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
        @keyframes gf-scanline {
          0% { background-position: 0 -48px; }
          100% { background-position: 0 calc(100% + 48px); }
        }
        @keyframes gf-twinkle {
          0%,100% { opacity: 0.08; transform: scale(0.7); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }
        @keyframes gf-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gf-grad {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes gf-live-dot {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3.5); opacity: 0; }
        }
      `}</style>

      {/* ✅ Popup */}
      <ContactFormPopup open={popupOpen} onOpenChange={setPopupOpen} />

      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #020E3A 0%, #041C5C 40%, #071e70 65%, #020E3A 100%)",
          paddingTop: "3.5rem",
          paddingBottom: "3.5rem",
        }}
      >
        {/* Animated grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            animation: "gf-grid-move 20s linear infinite",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.35) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            opacity: 0.2,
          }}
        />

        {/* Center radial bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(59,130,246,0.13) 0%, transparent 70%)",
          }}
        />

        {/* Star field — purely decorative (empty divs, randomized inline
            styles, no text/content). Marked so scripts/prerender.tsx can
            strip it from the crawler-facing HTML; zero effect in the
            browser, data-* attributes do nothing on their own. */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            data-prerender-strip="decorative"
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `hsl(${200 + Math.random() * 80}, 90%, ${65 + Math.random() * 35}%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
              animation: `gf-twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}

        {/* Floating orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
            top: "-100px", left: "-100px",
            animation: "gf-float 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: "350px", height: "350px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
            bottom: "-80px", right: "-80px",
            animation: "gf-float 9s ease-in-out 2s infinite",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

          {/* ── Header ── */}
          <div className="text-center mb-10">
            <h2
              className="font-black text-white leading-none mb-4"
              style={{
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                letterSpacing: "-0.02em",
                textShadow: "0 0 60px rgba(59,130,246,0.3)",
                transform: mounted ? "translateY(0)" : "translateY(40px)",
                opacity: mounted ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
              }}
            >
              SKILL{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #60a5fa, #34d399, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200%",
                  animation: "gf-grad 3.5s linear infinite",
                }}
              >
                SCALE
              </span>
              {" "}SUCCEED
            </h2>

            <p
              className="text-base font-medium"
              style={{
                color: "rgba(147,197,253,0.7)",
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                opacity: mounted ? 0.75 : 0,
                transition: "all 0.8s ease 0.35s",
              }}
            >
              Transform your career with industry-ready expertise.
            </p>

            {/* Divider */}
            <div
              className="flex items-center justify-center gap-3 mt-5"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s ease 0.45s",
              }}
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500 opacity-60" />
              <Zap size={13} style={{ color: "#60a5fa", opacity: 0.7 }} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500 opacity-60" />
            </div>
          </div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {growthFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} visible={visible} />
            ))}
          </div>

          {/* ── CTA ── */}
          <div
            className="text-center"
            style={{
              transform: visible ? "translateY(0)" : "translateY(30px)",
              opacity: visible ? 1 : 0,
              transition: "all 0.8s ease 0.7s",
            }}
          >
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#fbbf24" style={{ color: "#fbbf24", opacity: 0.9 }} />
              ))}
            </div>
            <p
              className="text-xs mb-6 font-semibold tracking-widest uppercase"
              style={{ color: "rgba(147,197,253,0.4)" }}
            >
              Join 15,000+ professionals already upskilling
            </p>

            <button
              onClick={() => setPopupOpen(true)}
              className="group relative overflow-hidden px-10 py-4 rounded-full font-black text-sm tracking-widest uppercase"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#ffffff",
                border: "1px solid rgba(99,179,237,0.3)",
                cursor: "pointer",
                boxShadow: "0 0 30px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                transition: "all 0.35s ease",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
                el.style.color = "#000";
                el.style.boxShadow = "0 0 50px rgba(245,158,11,0.5)";
                el.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
                el.style.color = "#ffffff";
                el.style.boxShadow = "0 0 30px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15)";
                el.style.transform = "scale(1)";
              }}
            >
              <span className="flex items-center gap-3">
                Request a Call
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}