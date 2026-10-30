import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import OldFooter from "@/components/oldFooter";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import SEO from "@/seo/SEO";
import { PAGES } from "@/seo/seo-config";

interface AboutProps {
  onRequestCall: () => void;
}

/* ─────────────────────────────────────────────
   DARK MODE HOOK
───────────────────────────────────────────── */
function useDarkMode() {
  // Lazy initializer matches original browser behavior exactly (computed
  // synchronously on first render, no flash) while staying SSR-safe: guarded
  // by typeof document since Node has no `document` to read during prerender.
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = value / (1200 / 16);
    const tick = () => {
      start += increment;
      if (start < value) { setCount(Math.floor(start)); requestAnimationFrame(tick); }
      else { setCount(value); }
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   ARC RING
───────────────────────────────────────────── */
function ArcRing({ color, pct, visible }: { color: string; pct: number; visible: boolean }) {
  const R = 34, CX = 40, CY = 40;
  const CIRC = 2 * Math.PI * R;
  const offset = CIRC - (pct / 100) * CIRC;
  const angle = (2 * Math.PI * pct) / 100 - Math.PI / 2;
  const dotX = (CX + R * Math.cos(angle)).toFixed(2);
  const dotY = (CY + R * Math.sin(angle)).toFixed(2);
  return (
    <svg width="80" height="80" viewBox="0 0 80 80"
      style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor" strokeWidth="3" strokeOpacity="0.08" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
        strokeDasharray={CIRC} strokeDashoffset={visible ? offset : CIRC}
        style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.34,1.1,0.64,1)", filter: `drop-shadow(0 0 5px ${color})` }} />
      <circle cx={parseFloat(dotX)} cy={parseFloat(dotY)} r={4} fill={color}
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 1.2s", filter: `drop-shadow(0 0 6px ${color})` }} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
interface StatItem {
  value: number; suffix: string; label: string; sub: string;
  pct: number; icon: React.ReactNode; nightColor: string; dayColor: string;
}

function StatCard({ stat, index, isDark, visible }: { stat: StatItem; index: number; isDark: boolean; visible: boolean }) {
  const color = isDark ? stat.nightColor : stat.dayColor;
  const delay = index * 0.15;
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.34, 1.2, 0.64, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      style={{ "--card-color": color, "--card-glow": color + "40" } as React.CSSProperties}
      className={`
        relative flex flex-col items-center text-center rounded-2xl p-4 sm:p-6 lg:p-8
        cursor-default overflow-hidden transition-all duration-300 border backdrop-blur-xl
        ${isDark
          ? "bg-white/[0.03] border-white/[0.07] hover:border-[var(--card-color)] hover:shadow-[0_12px_60px_var(--card-glow)]"
          : "bg-white/80 border-black/[0.06] hover:border-[var(--card-color)] hover:shadow-[0_12px_40px_var(--card-glow)]"}`}
    >
      {/* BG glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)` }} />

      {/* Ring + icon container — fixed 80x80, scales via font-size trick not transform */}
      <div className="relative mb-3 sm:mb-5 flex items-center justify-center"
        style={{ width: 80, height: 80 }}>
        <div className="absolute inset-[-5px] rounded-full border border-dashed"
          style={{ borderColor: color, opacity: 0.2, animation: "statsOrbit 14s linear infinite" }} />
        <div className="absolute w-[5px] h-[5px] rounded-full"
          style={{
            background: color, boxShadow: `0 0 8px ${color}`,
            opacity: visible ? 1 : 0, transition: "opacity 0.5s",
            top: -2, left: "calc(50% - 2.5px)",
            animation: "statsOrbit 14s linear infinite",
          }} />
        <ArcRing color={color} pct={stat.pct} visible={visible} />
        <div style={{ color, filter: `drop-shadow(0 0 8px ${color})`, position: "relative", zIndex: 1 }}>
          {stat.icon}
        </div>
      </div>

      {/* Number */}
      <div className="font-black leading-none mb-1 tracking-tight"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(36px, 6vw, 68px)",
          color,
          filter: `drop-shadow(0 0 18px ${color}66)`,
        }}>
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </div>

      {/* Progress bar */}
      <div className={`w-full h-[2px] rounded-full my-3 overflow-hidden ${isDark ? "bg-white/[0.07]" : "bg-black/[0.06]"}`}>
        <div className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color})`,
            boxShadow: `0 0 10px ${color}`,
            width: visible ? `${stat.pct}%` : "0%",
            transition: `width 1.6s cubic-bezier(0.34,1.1,0.64,1) ${delay + 0.2}s`,
          }} />
      </div>

      <p className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
        {stat.label}
      </p>
      <p className="text-[10px] sm:text-[11px] tracking-wide" style={{ color: `${color}cc`, fontFamily: "monospace" }}>
        {stat.sub}
      </p>
    </motion.div>
  );
}

const STATS: StatItem[] = [
  {
    value: 500, suffix: "+", label: "Hiring Network", sub: "and counting", pct: 83,
    nightColor: "#00d4ff", dayColor: "#0ea5e9",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    value: 95, suffix: "%", label: "Industry Readiness", sub: "rate achieved", pct: 95,
    nightColor: "#00ff94", dayColor: "#10b981",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    value: 100, suffix: "+", label: "Live Projects", sub: "real world delivered", pct: 60,
    nightColor: "#ffb800", dayColor: "#f59e0b",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  },
  {
    value: 8, suffix: "+", label: "Tech Domains", sub: "mastered by learners", pct: 70,
    nightColor: "#bf5fff", dayColor: "#8b5cf6",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
];

/* ─────────────────────────────────────────────
   STATS SECTION
───────────────────────────────────────────── */
function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const isDark = useDarkMode();

  return (
    <>
      <style>{`
        @keyframes statsOrbit { to { transform: rotate(360deg); } }
      `}</style>
      <section ref={sectionRef}
        className={`relative py-12 sm:py-16 lg:py-20 px-4 sm:px-8 md:px-16 overflow-hidden transition-colors duration-500
          ${isDark ? "bg-[#070b14]" : "bg-slate-50"}`}>
        {/* BG blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-20 w-64 h-64 sm:w-[500px] sm:h-[500px] rounded-full blur-[100px] opacity-60"
            style={{ background: "rgba(0,212,255,0.07)" }} />
          <div className="absolute -top-20 -right-32 w-64 h-64 sm:w-[400px] sm:h-[400px] rounded-full blur-[90px] opacity-50"
            style={{ background: "rgba(139,92,246,0.08)" }} />
        </div>

        {/* Heading */}
        <div className="relative z-10 text-center mb-8 sm:mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4
            ${isDark ? "border-cyan-400/30 bg-cyan-400/10" : "border-blue-500/20 bg-blue-500/10"}`}>
            <span className={`w-[6px] h-[6px] rounded-full animate-pulse ${isDark ? "bg-cyan-400" : "bg-blue-600"}`} />
            <span className={`text-[10px] font-bold tracking-[0.2em] font-mono uppercase ${isDark ? "text-cyan-400" : "text-blue-600"}`}>
              By The Numbers
            </span>
          </div>
          <h2 className={`font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
            Our Impact
          </h2>
          <p className={`text-sm tracking-wide ${isDark ? "text-white/40" : "text-gray-500"}`}>
            Real students · Real projects · Real careers
          </p>
        </div>

        {/* Cards grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isDark={isDark} visible={isInView} />
          ))}
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   PIE / DONUT DATA
───────────────────────────────────────────── */
const PIE_DATA = [
  { label: "Software Development", value: 30, color: "#3b82f6" },
  { label: "Software Testing",     value: 28, color: "#10b981" },
  { label: "DevOps & Cloud",       value: 22, color: "#f59e0b" },
  { label: "Data & Analytics",     value: 20, color: "#8b5cf6" },
];

const SKILL_BARS = [
  { label: "Live Project Experience",  pct: 92, color: "#3b82f6" },
  { label: "Industry Readiness Rate",  pct: 95, color: "#10b981" },
  { label: "Real Workflow Training",   pct: 88, color: "#f59e0b" },
  { label: "Professional Mentorship",  pct: 85, color: "#8b5cf6" },
];

/* ─────────────────────────────────────────────
   CORE STRENGTH VISUAL
───────────────────────────────────────────── */
function CoreStrengthVisual({ isDark }: { isDark: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const total = PIE_DATA.reduce((s, d) => s + d.value, 0);
  const CX = 100, CY = 100, R = 72, INNER_R = 44;

  function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function slicePath(startDeg: number, endDeg: number, r: number, ir: number) {
    const s1 = polarToXY(CX, CY, r, startDeg);
    const e1 = polarToXY(CX, CY, r, endDeg);
    const s2 = polarToXY(CX, CY, ir, endDeg);
    const e2 = polarToXY(CX, CY, ir, startDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return [`M ${s1.x} ${s1.y}`, `A ${r} ${r} 0 ${large} 1 ${e1.x} ${e1.y}`,
      `L ${s2.x} ${s2.y}`, `A ${ir} ${ir} 0 ${large} 0 ${e2.x} ${e2.y}`, "Z"].join(" ");
  }

  let cumDeg = 0;
  const slices = PIE_DATA.map((seg) => {
    const deg = (seg.value / total) * 360;
    const start = cumDeg; const end = cumDeg + deg; cumDeg = end;
    return { ...seg, start, end, deg };
  });

  const surface    = isDark ? "rgba(15,23,42,0.8)" : "#ffffff";
  const border     = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const textPri    = isDark ? "#f1f5f9" : "#1e293b";
  const textMut    = isDark ? "rgba(255,255,255,0.35)" : "#94a3b8";
  const trackBg    = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const cardShadow = isDark
    ? "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)"
    : "0 24px 64px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)";
  const holeFill   = isDark ? "#0f172a" : "#ffffff";

  return (
    <>
      <style>{`
        @keyframes shimBar {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(400%); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div ref={ref}
        className="w-full rounded-[22px] p-4 sm:p-6"
        style={{
          background: surface, border: `1px solid ${border}`,
          backdropFilter: "blur(20px)", boxShadow: cardShadow,
          display: "flex", flexDirection: "column", gap: 16,
          transition: "background 0.4s", overflow: "hidden",
          boxSizing: "border-box",
        }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: textMut, marginBottom: 2 }}>
              Domain Coverage
            </p>
            <p style={{ fontSize: 16, fontWeight: 800, color: textPri }}>8+ Technology Areas</p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
            borderRadius: 999, flexShrink: 0,
            background: isDark ? "rgba(0,212,255,0.1)" : "rgba(59,130,246,0.08)",
            border: `1px solid ${isDark ? "rgba(0,212,255,0.25)" : "rgba(59,130,246,0.2)"}`,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", display: "inline-block",
              background: isDark ? "#00d4ff" : "#3b82f6",
              boxShadow: `0 0 6px ${isDark ? "#00d4ff" : "#3b82f6"}`,
              animation: "rotateSlow 2s ease infinite alternate",
            }} />
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", color: isDark ? "#00d4ff" : "#3b82f6" }}>
              LIVE TRAINING
            </span>
          </div>
        </div>

        {/* ── Donut + Legend ──
            KEY FIX: always column on mobile, row only on sm+
            Donut uses percentage width so it never overflows
        ── */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">

          {/* Donut — 100% width on mobile so it fills column, capped at 200px */}
          <div className="w-full sm:w-auto sm:flex-shrink-0" style={{ maxWidth: 200 }}>
            <svg viewBox="0 0 200 200" style={{ width: "100%", height: "auto", display: "block" }}>
              <circle cx={CX} cy={CY} r={R + 8} fill="none"
                stroke={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} strokeWidth="14" />
              <circle cx={CX} cy={CY} r={R} fill="none"
                stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="28" />
              {slices.map((sl, i) => (
                <path key={i} d={slicePath(sl.start, sl.end, R, INNER_R)} fill={sl.color}
                  style={{
                    transformOrigin: `${CX}px ${CY}px`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "scale(1)" : "scale(0.5)",
                    transition: `opacity 0.6s ease ${i * 0.18}s, transform 0.6s cubic-bezier(0.34,1.3,0.64,1) ${i * 0.18}s`,
                    filter: `drop-shadow(0 0 8px ${sl.color}88)`,
                  }} />
              ))}
              {slices.map((sl, i) => {
                const p = polarToXY(CX, CY, R + 2, sl.start);
                const q = polarToXY(CX, CY, INNER_R - 2, sl.start);
                return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                  stroke={holeFill} strokeWidth="2.5" />;
              })}
              <circle cx={CX} cy={CY} r={INNER_R - 2} fill={holeFill} />
              <text x={CX} y={CY - 10} textAnchor="middle" fill={textPri}
                fontSize="22" fontWeight="900" fontFamily="'Bebas Neue', sans-serif">100%</text>
              <text x={CX} y={CY + 8} textAnchor="middle" fill={textMut}
                fontSize="9" fontFamily="monospace" letterSpacing="1.5">COVERAGE</text>
              <text x={CX} y={CY + 22} textAnchor="middle" fill={textMut}
                fontSize="8" fontFamily="monospace">4 Domains</text>
            </svg>
          </div>

          {/* Legend — always full width, 2-col grid on mobile, 1-col on sm+ */}
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-3 sm:flex sm:flex-col sm:gap-3">
            {PIE_DATA.map((seg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.14, duration: 0.5 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 8, minWidth: 0 }}>
                <div style={{
                  width: 8, height: 24, borderRadius: 4, flexShrink: 0,
                  background: seg.color, boxShadow: `0 0 8px ${seg.color}88`, marginTop: 2,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 10, color: textPri, fontWeight: 700, lineHeight: 1.3 }}>{seg.label}</span>
                    <span style={{ fontSize: 11, color: seg.color, fontFamily: "monospace", fontWeight: 800, flexShrink: 0 }}>
                      {seg.value}%
                    </span>
                  </div>
                  <div style={{ height: 3, borderRadius: 999, background: trackBg, marginTop: 4, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 999, background: seg.color,
                      width: inView ? `${seg.value}%` : "0%",
                      transition: `width 1.2s cubic-bezier(0.34,1.1,0.64,1) ${0.3 + i * 0.14}s`,
                    }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: border }} />

        {/* ── Skill Bars ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: textMut }}>
            Training Quality Metrics
          </p>
          {SKILL_BARS.map((sk, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: textPri }}>{sk.label}</span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: sk.color, fontWeight: 800 }}>{sk.pct}%</span>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: trackBg, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${sk.pct}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.15, ease: [0.34, 1.1, 0.64, 1] }}
                  style={{
                    height: "100%", borderRadius: 999,
                    background: `linear-gradient(90deg, ${sk.color}70, ${sk.color})`,
                    boxShadow: `0 0 12px ${sk.color}55`,
                    position: "relative", overflow: "hidden",
                  }}>
                  <div style={{
                    position: "absolute", top: 0, bottom: 0, width: "35%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
                    animation: "shimBar 2.2s ease-in-out infinite",
                  }} />
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pills ── */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { label: "2000+ Students", color: "#3b82f6" },
            { label: "Real Projects",  color: "#10b981" },
            { label: "Live Mentors",   color: "#f59e0b" },
            { label: "8 Tech Domains", color: "#8b5cf6" },
          ].map((pill, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.3 + i * 0.1, duration: 0.35 }}
              style={{
                padding: "4px 10px", borderRadius: 999,
                border: `1px solid ${pill.color}44`, background: `${pill.color}12`,
                fontSize: 10, fontWeight: 700, color: pill.color,
                fontFamily: "monospace", letterSpacing: "0.05em", display: "inline-block",
              }}>
              {pill.label}
            </motion.span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN ABOUT PAGE
───────────────────────────────────────────── */
export default function About({ onRequestCall }: AboutProps) {
  const ourMission = "our-mission.webp";
  const isDark = useDarkMode();

  return (
    <div className="bg-white dark:bg-[#0B0B10] text-gray-900 dark:text-gray-100 overflow-x-hidden w-full">
      <SEO page={PAGES.about} />
      <ScrollToTop />

      {/* Mobile Hero */}
      <header className="md:hidden relative w-full h-[180px] bg-black">
        <div className="absolute inset-0 bg-[url('/Aboutbanner.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-4 pt-10">
          <h2 className="text-white font-extrabold text-lg">
            About <span className="text-yellow-400">Qualibytes IT Academy</span>
          </h2>
          <p className="text-gray-300 text-xs mt-2">Real industry experience. Real professional growth.</p>
          <button onClick={onRequestCall}
            className="mt-3 bg-yellow-400 text-black text-xs px-3 py-1.5 rounded">
            Talk to a Counsellor
          </button>
        </div>
      </header>

      {/* Desktop Hero */}
      <header className="hidden md:block relative w-full">
        <motion.img src="/Aboutbanner.webp" alt="About Qualibytes IT Academy"
          initial={{ scale: 1.04, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-auto object-contain block" />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-white text-4xl lg:text-5xl font-extrabold">About Qualibytes IT Academy</h1>
            <p className="mt-4 text-gray-200 text-2xl">An IT academy built inside a real working IT company</p>
            <div className="mt-6">
              <Button onClick={onRequestCall}
                className="bg-yellow-400 text-black px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white">
                Talk to a Counsellor
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="pt-8 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-8 md:px-16 space-y-8 sm:space-y-12">

        {/* Intro */}
        <div className="max-w-5xl space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">About Qualibytes IT Academy</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Qualibytes IT Academy was not born in a classroom. It was born inside a real, working IT company.
            At a time when most training institutes were focused on teaching concepts, Qualibytes was already
            building software, delivering projects, and solving real business problems for real clients.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            While most institutes focus on teaching concepts, we build professionals. While others simulate
            projects, we deliver real ones. While many promise placements, we prepare individuals for real
            industry performance.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Founded by experienced IT professionals, Qualibytes began its journey in 2020 as a full-fledged
            IT company delivering real-world projects across multiple domains. As our teams expanded and we
            worked closely with fresh graduates, one critical gap became impossible to ignore — students knew
            theory, but companies needed performers.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            That realization led to the creation of Qualibytes IT Academy.
          </p>
        </div>

        {/* Core Strength — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start w-full">
          {/* Left text */}
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Our Core Strength: An IT Company at Heart</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              What truly separates Qualibytes IT Academy from traditional training institutes is simple,
              yet powerful. We are an IT company first. We do not imagine projects. We do not create dummy
              assignments. We already have real projects.
            </p>
            <ul className="space-y-3">
              {[
                "Live, ongoing industry projects",
                "Practical experience recruiters value",
                "Real development, testing, and deployment workflows",
                "Industry timelines and professional accountability",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0 w-5 h-5" />
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — visual, full width on mobile */}
          <div className="w-full min-w-0">
            <CoreStrengthVisual isDark={isDark} />
          </div>
        </div>

        {/* Outcomes */}
        <div className="max-w-5xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Built on Trust. Driven by Outcomes.</h3>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Over the years, Qualibytes IT Academy has trained and transformed hundreds of learners into
            industry-ready professionals across Software Testing, DevOps and Cloud, Software Development,
            and Data and Analytics.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            We do not measure success by certificates alone. We measure it by careers launched, confidence
            built, and professionals created.
          </p>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Mission */}
      <section className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-8 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ourMission})` }}>
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-white">Our Mission</h3>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-200">
            To bridge the gap between education and industry and create professionals who are job-ready from
            day one — not just certified on paper. If you want real experience, real confidence, and real
            growth, Qualibytes IT Academy is where your IT career truly begins.
          </p>
        </div>
      </section>

      <OldFooter />
    </div>
  );
}