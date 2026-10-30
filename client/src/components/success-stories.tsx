import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import type { SuccessStory } from "@shared/schema";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

/* ─── helpers ─────────────────────────────────────────────── */
const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

const STEP_COLORS = [
  { card: "#1e3a8a", accent: "#3b82f6", glow: "#60a5fa", icon: "💡" },
  { card: "#14532d", accent: "#22c55e", glow: "#4ade80", icon: "📈" },
  { card: "#78350f", accent: "#f59e0b", glow: "#fbbf24", icon: "⚙️" },
  { card: "#164e63", accent: "#06b6d4", glow: "#22d3ee", icon: "🔍" },
  { card: "#713f12", accent: "#f97316", glow: "#fb923c", icon: "📊" },
  { card: "#4c1d95", accent: "#a855f7", glow: "#c084fc", icon: "🏆" },
];

/* ─── Animated Counter ───────────────────────────────────── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = (timestamp: number, startTime: number) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
          };
          requestAnimationFrame((t) => step(t, t));
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── SVG Staircase Diagram ─────────────────────────────── */
function StaircaseSVG({ count, activeStep }: { count: number; activeStep: number }) {
  const W = 1100, H = 440;
  const stepW = W / (count + 0.5);
  const stepH = (H - 60) / count;

  // Build staircase path
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= count; i++) {
    pts.push({ x: i * stepW + 40, y: H - 20 - i * stepH });
    if (i < count) pts.push({ x: (i + 1) * stepW + 40, y: H - 20 - i * stepH });
  }
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  // Node centers: on each horizontal segment
  const nodes = Array.from({ length: count }, (_, i) => ({
    x: (i + 0.5) * stepW + 40,
    y: H - 20 - i * stepH,
    col: STEP_COLORS[i % STEP_COLORS.length],
  }));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: "clamp(180px, 35vw, 440px)", overflow: "visible" }}
    >
      <defs>
        <filter id="glow-path">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-node">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="path-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="33%" stopColor="#22c55e" />
          <stop offset="66%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <marker id="end-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" opacity="0.8" />
        </marker>
      </defs>

      {/* Shadow/blur path */}
      <path d={pathD} fill="none" stroke="rgba(99,179,237,0.12)" strokeWidth="16"
        strokeLinecap="round" strokeLinejoin="round" filter="url(#glow-path)" />

      {/* Main animated path */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#path-gradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5000"
        strokeDashoffset="5000"
        markerEnd="url(#end-arrow)"
        style={{ animation: "draw-stair-path 2.8s cubic-bezier(0.4,0,0.2,1) 0.3s forwards" }}
      />

      {/* Travelling glow bead */}
      <circle r="6" fill="white" filter="url(#glow-node)" opacity="0.9">
        <animateMotion dur="5s" repeatCount="indefinite" begin="1.5s">
          <mpath href="#hidden-path" />
        </animateMotion>
      </circle>
      <path id="hidden-path" d={pathD} fill="none" stroke="none" />

      {/* Step nodes */}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x},${n.y})`}
          style={{ opacity: i <= activeStep ? 1 : 0.15, transition: `opacity 0.5s ease ${i * 0.15}s` }}>
          {/* Pulse ring */}
          {i <= activeStep && (
            <circle r="28" fill="none" stroke={n.col.glow} strokeWidth="1.5" opacity="0.5">
              <animate attributeName="r" values="24;40;24" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          )}
          {/* Node circle */}
          <circle r="22" fill={n.col.card} stroke={n.col.accent} strokeWidth="2.5" filter="url(#glow-node)" />
          {/* Icon */}
          <text textAnchor="middle" dominantBaseline="central" fontSize="16">{n.col.icon}</text>
          {/* Step label below */}
          <text y="38" textAnchor="middle" fill={n.col.accent} fontSize="9"
            fontWeight="900" fontFamily="monospace" letterSpacing="2">
            STEP {i + 1}
          </text>
        </g>
      ))}

      {/* Trophy at end */}
      <g transform={`translate(${W - 55},${H - 20 - count * stepH})`}>
        <circle r="32" fill="#1a1060" stroke="#f59e0b" strokeWidth="2.5" filter="url(#glow-node)" />
        <text textAnchor="middle" dominantBaseline="central" fontSize="22">🏆</text>
        <circle r="40" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.35">
          <animate attributeName="r" values="32;52;32" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

/* ─── Individual Card ────────────────────────────────────── */
function StoryCard({ story, index, active }: { story: SuccessStory; index: number; active: boolean }) {
  const col = STEP_COLORS[index % STEP_COLORS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
      style={{
        transform: active ? "translateY(0) scale(1)" : "translateY(56px) scale(0.91)",
        opacity: active ? 1 : 0,
        transition: `all 0.75s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.13}s`,
      }}
    >
      {/* Card glow aura */}
      <div
        className="absolute -inset-2 rounded-3xl blur-2xl transition-opacity duration-500 pointer-events-none"
        style={{ background: col.glow, opacity: hovered ? 0.22 : 0 }}
      />

      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${col.card}f2, ${col.card}b8)`,
          borderColor: hovered ? col.accent : `${col.accent}40`,
          boxShadow: hovered
            ? `0 24px 60px ${col.glow}44, inset 0 1px 0 rgba(255,255,255,0.12)`
            : "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "all 0.4s ease",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Accent top bar — grows on hover */}
        <div
          className="h-1 w-full origin-left transition-transform duration-500"
          style={{
            background: `linear-gradient(90deg, ${col.accent}, ${col.glow}, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.5)",
          }}
        />

        {/* Step badge */}
        <div
          className="absolute top-3 right-3 text-xs font-black px-2 py-0.5 rounded-full"
          style={{
            background: `${col.accent}22`,
            color: col.accent,
            border: `1px solid ${col.accent}55`,
            letterSpacing: "0.1em",
            fontFamily: "monospace",
          }}
        >
          #{String(index + 1).padStart(2, "0")}
        </div>

        <div className="p-5">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="relative h-13 w-13 flex-shrink-0"
              style={{
                transform: hovered ? "scale(1.12) rotate(6deg)" : "scale(1) rotate(0deg)",
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center font-black text-sm text-white"
                style={{
                  background: `linear-gradient(135deg, ${col.accent}99, ${col.accent}44)`,
                  border: `2px solid ${col.accent}66`,
                  boxShadow: hovered ? `0 0 20px ${col.glow}80` : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {getInitials(story.name)}
              </div>
              {/* Sparkle dot */}
              <div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{
                  background: col.glow,
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "scale(1)" : "scale(0)",
                  transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  boxShadow: `0 0 8px ${col.glow}`,
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4
                className="font-black text-sm text-white truncate"
                style={{ letterSpacing: "0.02em" }}
              >
                {story.name}
              </h4>
              <p className="text-xs truncate mt-0.5" style={{ color: `${col.glow}cc` }}>
                {story.currentPosition}
              </p>
            </div>
          </div>

          {/* From → To journey */}
          <div className="flex items-stretch gap-1.5 mb-4">
            <div
              className="flex-1 rounded-xl p-2.5"
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>
                From
              </p>
              <p className="text-xs font-semibold text-white/65 leading-tight line-clamp-2">
                {story.previousCompany}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${col.accent}, ${col.glow})`,
                  boxShadow: `0 0 14px ${col.glow}80`,
                  transform: hovered ? "scale(1.25)" : "scale(1)",
                  transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <ArrowRight size={11} className="text-white" />
              </div>
            </div>

            <div
              className="flex-1 rounded-xl p-2.5"
              style={{ background: `${col.accent}18`, border: `1px solid ${col.accent}33` }}
            >
              <p style={{ color: col.accent, fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>
                To
              </p>
              <p className="text-xs font-bold text-white leading-tight line-clamp-2">
                {story.currentCompany}
              </p>
            </div>
          </div>

          {/* Growth + Stars */}
          <div className="flex items-center justify-between mb-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black"
              style={{
                background: `${col.accent}22`,
                border: `1px solid ${col.accent}44`,
                color: col.glow,
              }}
            >
              <TrendingUp size={10} />
              +{story.salaryHike}% Growth
            </div>
          </div>

          {/* Profile link */}
          {story.profileUrl && (
            <a
              href={story.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: col.accent, transition: "gap 0.3s ease" }}
            >
              <ExternalLink
                size={10}
                style={{
                  transform: hovered ? "rotate(-45deg)" : "rotate(0)",
                  transition: "transform 0.3s ease",
                }}
              />
              View Profile
            </a>
          )}
        </div>

        {/* Scanline sweep on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${col.accent}09 50%, transparent 100%)`,
            backgroundSize: "100% 48px",
            opacity: hovered ? 1 : 0,
            animation: hovered ? "scanline-anim 2s linear infinite" : "none",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const stats = [
    { value: 2000, suffix: "+", label: "Placed" },
    { value: 95, suffix: "%", label: "Placement Rate" },
    { value: 500, suffix: "+", label: "Hiring Network" },
    { value: 100, suffix: "+", label: "Projects" },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020E3A 0%, #041C5C 45%, #071e70 70%, #020E3A 100%)",
        minHeight: "clamp(360px, 52vh, 540px)",
      }}
    >
      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          animation: "grid-move 20s linear infinite",
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

      {/* Star field — purely decorative, stripped from prerendered HTML by
          scripts/prerender.tsx (see data-prerender-strip). No browser effect. */}
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
            animation: `star-twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-14 pb-10">
        {/* Live badge */}
        {/* <div
          className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold"
          style={{
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(99,179,237,0.3)",
            color: "#93c5fd",
            backdropFilter: "blur(10px)",
            transform: mounted ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.9)",
            opacity: mounted ? 1 : 0,
            transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}
        >
          <div className="relative w-2 h-2 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-blue-400" />
            <div
              className="absolute inset-0 rounded-full bg-blue-400"
              style={{ animation: "live-dot 1.5s ease-out infinite" }}
            />
          </div>
          SUCCESS STORIES
        </div> */}

        {/* Main heading */}
        <h2
          className="font-black text-white leading-none mb-3"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 4.5rem)",
            letterSpacing: "-0.02em",
            textShadow: "0 0 60px rgba(59,130,246,0.3)",
            transform: mounted ? "translateY(0)" : "translateY(40px)",
            opacity: mounted ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.25s",
          }}
        >
          SHAPING{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa, #34d399, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200%",
              animation: "grad-anim 3.5s linear infinite",
            }}
          >
            SUCCESS
          </span>
          <br />
          <span style={{ fontSize: "0.68em", opacity: 0.85 }}>
            STORIES SINCE{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              2020
            </span>
          </span>
        </h2>

        <p
          className="text-blue-200/70 text-base mb-8 font-medium"
          style={{
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            opacity: mounted ? 0.75 : 0,
            transition: "all 0.8s ease 0.4s",
          }}
        >
          Your Journey, Our Mission
        </p>

        {/* Stats row */}
        <div
          className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10"
          style={{
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            opacity: mounted ? 1 : 0,
            transition: "all 0.8s ease 0.5s",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl font-black"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 12px rgba(245,158,11,0.35))",
                }}
              >
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-blue-300/55 font-semibold tracking-widest uppercase mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            opacity: mounted ? 1 : 0,
            transition: "all 0.8s ease 0.6s",
          }}
        >
          <Link to="/testimonials">
            <button
              className="group relative overflow-hidden px-9 py-4 rounded-full font-bold text-sm tracking-wide text-white"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                border: "1px solid rgba(99,179,237,0.3)",
                boxShadow: "0 0 30px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                transition: "all 0.35s ease",
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
                el.style.color = "white";
                el.style.boxShadow = "0 0 30px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15)";
                el.style.transform = "scale(1)";
              }}
            >
              <span className="flex items-center gap-2">
                View More Success Stories
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              {/* Shimmer */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
              />
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom wave */}
      <svg viewBox="0 0 1440 70" className="absolute bottom-0 left-0 right-0 w-full" style={{ display: "block" }}>
        <path
          d="M0,50 C200,20 400,70 600,40 C800,10 1000,60 1200,35 C1300,22 1380,45 1440,50 L1440,70 L0,70 Z"
          fill="rgba(2,14,58,1)"
        />
      </svg>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export default function SuccessStories() {
  const { data: stories } = useQuery<SuccessStory[]>({
    queryKey: ["/api/success-stories"],
  });

  const displayedStories = stories?.slice(0, 6) || [];
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          displayedStories.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), i * 180 + 300);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [displayedStories.length]);

  return (
    <>
      <style>{`
        @keyframes draw-stair-path {
          to { stroke-dashoffset: 0; }
        }
        @keyframes live-dot {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes star-twinkle {
          0%,100% { opacity: 0.1; transform: scale(0.7); }
          50% { opacity: 0.95; transform: scale(1.5); }
        }
        @keyframes grad-anim {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
        @keyframes scanline-anim {
          0% { background-position: 0 -48px; }
          100% { background-position: 0 calc(100% + 48px); }
        }
      `}</style>

      <HeroSection />

      {/* Cards + SVG Section */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #020E3A 0%, #030f42 55%, #020E3A 100%)",
          paddingBottom: "5rem",
        }}
      >
        {/* Dot grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.35) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            opacity: 0.25,
          }}
        />

        {/* Section header */}
        <div className="relative z-10 text-center pt-14 pb-4 px-4">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-blue-500 opacity-60" />
            <span
              className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase"
              style={{ fontFamily: "monospace" }}
            >
              Their Journey
            </span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-blue-500 opacity-60" />
          </div>
          <h3
            className="font-black text-white"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)", letterSpacing: "-0.01em" }}
          >
            From Learning to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Placement
            </span>
          </h3>
          <p className="text-blue-300/45 mt-1.5 text-sm">Real alumni. Real growth. Real impact.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SVG staircase — desktop only, purely decorative diagram (glow
              filters/animated pulse rings, no information not already in
              the StoryCard text below it). Marked for removal from the
              prerendered/crawler-facing HTML; it's sizeable markup
              (multiple <g>/<circle>/<animate> per story) for no text
              content. Zero effect in the live browser either way. */}
          {displayedStories.length > 0 && (
            <div className="hidden lg:block -mb-2 relative z-10" data-prerender-strip="decorative">
              <StaircaseSVG count={displayedStories.length} activeStep={activeStep} />
            </div>
          )}

          {/* Cards */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} active={index <= activeStep} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}