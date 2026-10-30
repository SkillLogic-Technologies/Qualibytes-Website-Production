"use client";
import { useEffect, useState } from "react";
import CompactForm from "./Compact-Form";

/* ─────────────────────────────────────────────
   Inject keyframe animations
───────────────────────────────────────────── */
function injectStyles() {
  const styleId = "fm-anim-v5";
  if (typeof document === "undefined" || document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes laptopBob  { 0%,100%{transform:translateY(0px) rotateX(0deg);}50%{transform:translateY(-8px) rotateX(-2deg);} }
    @keyframes laptopGlow { 0%,100%{filter:drop-shadow(0 8px 24px rgba(34,197,94,.35));}50%{filter:drop-shadow(0 16px 40px rgba(34,197,94,.65));} }
    @keyframes codeLine1  { 0%{opacity:0;transform:translateX(-8px);}20%{opacity:1;transform:translateX(0);}80%{opacity:1;}100%{opacity:0;transform:translateX(8px);} }
    @keyframes codeLine2  { 0%{opacity:0;transform:translateX(-8px);}40%{opacity:1;transform:translateX(0);}80%{opacity:1;}100%{opacity:0;transform:translateX(8px);} }
    @keyframes codeLine3  { 0%{opacity:0;transform:translateX(-8px);}60%{opacity:1;transform:translateX(0);}80%{opacity:1;}100%{opacity:0;transform:translateX(8px);} }
    @keyframes envFloat   { 0%,100%{transform:translateY(0px) rotate(-2deg);}50%{transform:translateY(-12px) rotate(2deg);} }
    @keyframes envGlow    { 0%,100%{filter:drop-shadow(0 8px 24px rgba(34,197,94,.35));}50%{filter:drop-shadow(0 16px 40px rgba(34,197,94,.65));} }
    @keyframes handBob    { 0%,100%{transform:translateY(0px);}50%{transform:translateY(-6px);} }
    @keyframes sparklePop { 0%,100%{opacity:.2;transform:scale(.7);}50%{opacity:1;transform:scale(1.4);} }
    @keyframes orbitSpin  { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
    @keyframes slideUp    { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
    @keyframes shimmer    { 0%{background-position:-200% center;}100%{background-position:200% center;} }
    @keyframes featIn     { from{opacity:0;transform:translateX(-18px);}to{opacity:1;transform:translateX(0);} }
    @keyframes eyeBlink   { 0%,92%,100%{transform:scaleY(1);}96%{transform:scaleY(.08);} }
    @keyframes pulseRing  { 0%{transform:scale(.8);opacity:.6;}100%{transform:scale(1.8);opacity:0;} }
    @keyframes dotPop     { 0%,100%{width:20px;}50%{width:28px;} }
    @keyframes pFloat     { 0%{transform:translateY(0) translateX(0);opacity:.5;}50%{opacity:1;}100%{transform:translateY(-60px) translateX(12px);opacity:0;} }
    @keyframes thanksIn   { from{opacity:0;transform:scale(.93) translateY(18px);}to{opacity:1;transform:scale(1) translateY(0);} }
    @keyframes checkDraw  { from{stroke-dashoffset:120;opacity:0;}to{stroke-dashoffset:0;opacity:1;} }
    @keyframes circlePop  { from{transform:scale(0) rotate(-20deg);opacity:0;}to{transform:scale(1) rotate(0deg);opacity:1;} }
    @keyframes badgeIn    { from{opacity:0;transform:translateX(-14px);}to{opacity:1;transform:translateX(0);} }
    @keyframes txtIn      { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);} }
    @keyframes starFloat  { 0%,100%{opacity:.25;transform:scale(.6);}50%{opacity:1;transform:scale(1.3);} }
    @keyframes particleUp { 0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:.7;}100%{transform:translateY(-70px) translateX(10px) rotate(20deg);opacity:0;} }
    @keyframes glowPulse  { 0%,100%{opacity:.3;}50%{opacity:.7;} }
    @keyframes lineGrow   { from{transform:scaleX(0);}to{transform:scaleX(1);} }

    .laptop-float { animation:laptopBob 4s ease-in-out infinite, laptopGlow 4s ease-in-out infinite; }
    .code-line-1  { animation:codeLine1 3s ease-in-out infinite; }
    .code-line-2  { animation:codeLine2 3s ease-in-out infinite; }
    .code-line-3  { animation:codeLine3 3s ease-in-out infinite; }
    .env-float    { animation:envFloat 4s ease-in-out infinite, envGlow 4s ease-in-out infinite; }
    .hand-bob     { animation:handBob 4s ease-in-out infinite; }
    .eye-blink    { animation:eyeBlink 5s ease-in-out infinite; }
    .orbit-ring   { animation:orbitSpin 12s linear infinite; transform-origin:center; }
    .orbit-ring2  { animation:orbitSpin 18s linear infinite reverse; transform-origin:center; }
    .txt-slide-1  { animation:slideUp .6s cubic-bezier(.22,.68,0,1.2) .1s both; }
    .txt-slide-2  { animation:slideUp .6s cubic-bezier(.22,.68,0,1.2) .25s both; }
    .txt-slide-3  { animation:slideUp .6s cubic-bezier(.22,.68,0,1.2) .4s both; }
    .feat-1       { animation:featIn .5s cubic-bezier(.22,.68,0,1.2) .55s both; }
    .feat-2       { animation:featIn .5s cubic-bezier(.22,.68,0,1.2) .7s both; }
    .feat-3       { animation:featIn .5s cubic-bezier(.22,.68,0,1.2) .85s both; }
    .sp1 { animation:sparklePop 2.2s ease-in-out 0s infinite; }
    .sp2 { animation:sparklePop 2.8s ease-in-out .5s infinite; }
    .sp3 { animation:sparklePop 2.4s ease-in-out 1s infinite; }
    .sp4 { animation:sparklePop 3s ease-in-out 1.5s infinite; }
    .p1  { animation:pFloat 3.5s ease-in .3s infinite; }
    .p2  { animation:pFloat 4.2s ease-in 1.1s infinite; }
    .p3  { animation:pFloat 3.8s ease-in 1.9s infinite; }
    .p4  { animation:pFloat 5s ease-in .7s infinite; }
    .pulse-ring { position:absolute; border-radius:50%; border:2px solid rgba(255,255,255,.4); animation:pulseRing 2.5s ease-out infinite; pointer-events:none; }
    .dot-active { animation:dotPop 2.5s ease-in-out infinite; }
    .shimmer-txt {
      background:linear-gradient(90deg,rgba(255,255,255,.55) 0%,rgba(255,255,255,1) 40%,rgba(255,255,255,.55) 80%);
      background-size:200% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
      animation:shimmer 3.5s linear infinite;
    }
    .shimmer-txt-blue {
      background:linear-gradient(90deg,rgba(147,197,253,.7) 0%,rgba(255,255,255,1) 40%,rgba(147,197,253,.7) 80%);
      background-size:200% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
      animation:shimmer 3.5s linear 1.2s infinite;
    }
    .thanks-in  { animation:thanksIn .65s cubic-bezier(.22,.68,0,1.2) both; }
    .check-draw { stroke-dasharray:120; animation:checkDraw .9s cubic-bezier(.22,.68,0,1.2) .5s both; }
    .circle-pop { animation:circlePop .55s cubic-bezier(.22,.68,0,1.2) .25s both; }
    .badge-in-1 { animation:badgeIn .5s cubic-bezier(.22,.68,0,1.2) .7s both; }
    .badge-in-2 { animation:badgeIn .5s cubic-bezier(.22,.68,0,1.2) .85s both; }
    .txt-in-1   { animation:txtIn .55s cubic-bezier(.22,.68,0,1.2) .35s both; }
    .txt-in-2   { animation:txtIn .55s cubic-bezier(.22,.68,0,1.2) .5s both; }
    .glow-pulse { animation:glowPulse 3s ease-in-out infinite; }
    .line-grow  { animation:lineGrow .8s cubic-bezier(.22,.68,0,1.2) 1s both; transform-origin:left; }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────────
   useDeviceInfo
   shortEdge = min(innerWidth, innerHeight)
   < 500 = real phone (works in both orientations)
───────────────────────────────────────────── */
function useDeviceInfo() {
  const [info, setInfo] = useState<{ isMobile: boolean } | null>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const shortEdge = Math.min(w, h);
      const isMobile = shortEdge < 500;
      setInfo({ isMobile });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return info;
}

/* ─────────────────────────────────────────────
   LAPTOP SVG — desktop left panel only
───────────────────────────────────────────── */
function LaptopCodeSVG() {
  return (
    <div className="relative flex justify-center my-3">
      <div
        className="absolute rounded-full pointer-events-none w-52 h-52 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle,rgba(34,197,94,0.4) 0%,transparent 60%)",
          animation: "glowPulse 3s ease-in-out infinite",
        }}
      />
      <svg
        viewBox="0 0 280 200"
        fill="none"
        className="w-64 h-auto relative z-10 laptop-float"
        style={{ transformOrigin: "140px 100px" }}
      >
        <g className="sp1"><circle cx="30" cy="40" r="2.5" fill="#eab308" opacity=".7" /></g>
        <g className="sp2"><circle cx="250" cy="50" r="2" fill="#06b6d4" opacity=".6" /></g>
        <g className="sp3"><circle cx="260" cy="100" r="1.8" fill="#22c55e" opacity=".6" /></g>
        <g className="sp4"><circle cx="20" cy="120" r="1.5" fill="#ef4444" opacity=".5" /></g>
        <path
          d="M30 160 L50 145 L230 145 L250 160 Q240 170 140 175 Q40 170 30 160Z"
          fill="#475569" stroke="#334155" strokeWidth="2" strokeLinejoin="round"
        />
        <rect x="50" y="158" width="180" height="8" rx="1" fill="#334155" opacity=".6" />
        <rect x="40" y="30" width="200" height="125" rx="8" fill="#1a1f3a" stroke="#334155" strokeWidth="2.5" />
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.05)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.05)" />
          </linearGradient>
          <filter id="cg">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect x="40" y="30" width="200" height="125" rx="8" fill="url(#sg)" opacity=".8" />
        <g className="code-line-1" filter="url(#cg)">
          <text x="55" y="55" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#22c55e">
            <tspan>{"const learn = async() {"}</tspan>
          </text>
          <circle cx="48" cy="51" r="2" fill="#22c55e" opacity=".6" />
        </g>
        <g className="code-line-2" filter="url(#cg)">
          <text x="60" y="75" fontSize="10" fontFamily="monospace" fill="#06b6d4">
            <tspan>await master(</tspan>
            <tspan fill="#eab308">'web dev'</tspan>
            <tspan fill="#06b6d4">)</tspan>
          </text>
          <circle cx="48" cy="71" r="2" fill="#06b6d4" opacity=".6" />
        </g>
        <g className="code-line-3" filter="url(#cg)">
          <text x="60" y="95" fontSize="10" fontFamily="monospace" fill="#ef4444">
            <tspan>return </tspan>
            <tspan fill="#22c55e">success</tspan>
          </text>
          <circle cx="48" cy="91" r="2" fill="#ef4444" opacity=".6" />
        </g>
        <circle cx="52" cy="39" r="2.5" fill="#ef4444" opacity=".7" />
        <circle cx="65" cy="39" r="2.5" fill="#eab308" opacity=".7" />
        <circle cx="78" cy="39" r="2.5" fill="#22c55e" opacity=".7" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP LEFT PANEL
───────────────────────────────────────────── */
function AnimatedLeftPanel() {
  return (
    <div className="relative flex flex-col justify-between p-8 overflow-hidden w-80 flex-shrink-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="340" height="340" viewBox="0 0 340 340" className="absolute opacity-[0.07]">
          <ellipse cx="170" cy="170" rx="140" ry="140" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 8" className="orbit-ring" />
          <ellipse cx="170" cy="170" rx="100" ry="100" stroke="white" strokeWidth="1" fill="none" strokeDasharray="2 6" className="orbit-ring2" />
        </svg>
      </div>
      <div className="absolute -top-14 -left-14 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-16 -right-8 w-64 h-64 rounded-full bg-white/[0.06] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="p1 absolute bottom-1/3 left-8 w-1.5 h-1.5 rounded-full bg-green-400/60" />
        <div className="p2 absolute bottom-1/2 left-16 w-1 h-1 rounded-full bg-cyan-400/60" />
        <div className="p3 absolute bottom-1/4 left-24 w-2 h-2 rounded-full bg-cyan-300/50" />
      </div>
      {/* Top text */}
      <div className="relative z-10">
        <div className="txt-slide-1 flex items-center gap-2.5 mb-6">
          <div className="relative w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
            <span className="pulse-ring w-9 h-9" style={{ top: 0, left: 0 }} />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 6H14M10 10H17M10 14H17M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                fill="white" fillOpacity="0.2"
              />
            </svg>
          </div>
          <span className="text-white/85 text-[11px] font-semibold tracking-[0.18em] uppercase">
            QUALIBYTES LEARNING PROGRAMS
          </span>
        </div>
        <div className="txt-slide-2 mb-3">
          <h2 className="text-2xl font-bold leading-tight text-white">
            <span className="shimmer-txt">Launch Your Career in</span>
            <br />
            <span className="shimmer-txt-blue">Top Tech Domains</span>
          </h2>
        </div>
        <p className="txt-slide-3 text-white/60 text-xs leading-relaxed">
          Choose from industry-focused programs like DevOps, Data Science, Full Stack Development,
          Software Testing, AI/ML, Cyber Security, Mobile App Development and more.
        </p>
      </div>
      {/* Laptop illustration */}
      <div className="relative z-10">
        <LaptopCodeSVG />
      </div>
      {/* Feature pills */}
      <div className="relative z-10 space-y-2.5 mb-4">
        {[
          { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Live  projects", cls: "feat-1" },
          { icon: "M12 6a3 3 0 100-6 3 3 0 000 6zM16 17a6 6 0 1012 0v-2a6 6 0 00-12 0v2z", label: "1-on-1 mentorship", cls: "feat-2" },
          { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Portfolio-ready work", cls: "feat-3" },
        ].map((feat, i) => (
          <div
            key={i}
            className={`${feat.cls} flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5 border border-white/10 hover:bg-white/15 transition-all duration-300 cursor-default`}
          >
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={feat.icon} />
              </svg>
            </div>
            <span className="text-white/90 text-xs font-medium">{feat.label}</span>
          </div>
        ))}
      </div>
      {/* Dot indicators */}
      <div className="relative z-10 flex gap-1.5 items-center">
        {[1, 2, 3, 4, 5].map((d) => (
          <div
            key={d}
            className={`rounded-full transition-all ${d === 1 ? "dot-active h-1.5 bg-white/90" : "w-1.5 h-1.5 bg-white/30"}`}
            style={d === 1 ? { width: "20px" } : {}}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP THANKS PANEL
───────────────────────────────────────────── */
function ThanksRightPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="thanks-in relative flex-1 flex flex-col overflow-y-auto bg-white dark:bg-[#0f1117]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full glow-pulse"
          style={{ background: "radial-gradient(circle,rgba(34,197,94,0.1),transparent 65%)" }}
        />
        <div
          className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full glow-pulse"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.1),transparent 65%)" }}
        />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10"
        aria-label="Close dialog"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 py-8 text-center">
        <div className="relative flex justify-center mb-4">
          <svg viewBox="0 0 240 215" fill="none" className="w-40 sm:w-56 h-auto relative z-10">
            <g className="hand-bob">
              <path d="M55 198 C50 182 48 163 50 147 C50 137 53 128 62 124" stroke="#e0b87a" strokeWidth="15" strokeLinecap="round" fill="none" />
              <path
                d="M62 124 C65 112 69 101 72 93 C76 81 87 77 93 86 C96 74 109 70 114 80 C120 70 134 72 134 88 C143 85 151 97 149 110 L141 141 C130 162 108 168 84 166 C68 164 54 153 53 198"
                fill="#f5d5a0" stroke="#e0b87a" strokeWidth="2.2" strokeLinejoin="round"
              />
            </g>
            <g className="env-float" style={{ transformOrigin: "103px 74px" }}>
              <rect x="30" y="38" width="144" height="100" rx="8" fill="black" fillOpacity=".1" transform="translate(5,6)" />
              <rect x="30" y="30" width="144" height="100" rx="8" fill="#86efac" stroke="#22c55e" strokeWidth="2.2" />
              <path d="M30 40 L102 80 L174 40" stroke="#22c55e" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
              <g transform="translate(148,16)" className="circle-pop" style={{ transformOrigin: "18px 18px" }}>
                <circle cx="18" cy="18" r="18" fill="#1e3a8a" />
                <circle cx="18" cy="18" r="14" fill="#3b82f6" />
                <path d="M10 18 L15 23 L26 12" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
              </g>
            </g>
          </svg>
        </div>
        <div className="txt-in-1 mb-3">
          <h2 className="text-[25px] font-extrabold leading-snug text-gray-900 dark:text-white">You're In! </h2>
          <span className="text-[25px] font-extrabold text-green-600 dark:text-green-400">Welcome to Tech </span>
        </div>
        <div className="w-full max-w-sm flex flex-col gap-2.5">
          {[
            {
              icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              text: "Our academic counselor will reach out to you soon.",
              cls: "badge-in-1",
            },
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              text: "Get ready to discuss your career goals and choose the right program.",
              cls: "badge-in-2",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.cls} flex items-center gap-3 rounded-xl px-4 py-3 border bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20`}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-100 dark:bg-green-500/15">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <span className="text-xs font-medium text-left text-gray-600 dark:text-slate-400">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP RIGHT PANEL — Form
───────────────────────────────────────────── */
function DesktopFormPanel({ onClose, onFormDone }: { onClose: () => void; onFormDone: () => void }) {
  return (
    <div className="relative flex-1 flex flex-col bg-white dark:bg-[#0f1117] overflow-hidden">
      {/* ── Top bar: title + close btn ── */}
      <div className="flex items-start justify-between px-8 pt-6 pb-4 flex-shrink-0">
        <div className="flex-1 pr-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Cohort starting now
          </div>
          <h3 className="text-xl font-bold leading-snug mb-1 text-gray-900 dark:text-white">
            Start Your Tech Journey Today
          </h3>
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Book your free live class and explore industry-focused programs designed to make you job-ready.
          </p>
        </div>
        {/* Mini laptop SVG + close button */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white border border-slate-200 dark:border-white/10"
            aria-label="Close dialog"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="w-[90px] h-[72px]">
            <svg viewBox="0 0 140 110" fill="none" className="w-full h-full">
              <path d="M25 90 L35 75 L105 75 L115 90 Q105 98 70 101 Q35 98 25 90Z" fill="#475569" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
              <rect x="30" y="20" width="80" height="60" rx="4" fill="#1a1f3a" stroke="#334155" strokeWidth="1.8" />
              <text x="42" y="36" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#22c55e" opacity=".8">const x = 42</text>
              <text x="42" y="50" fontSize="8" fontFamily="monospace" fill="#22c55e" opacity=".7">await learn()</text>
              <text x="42" y="64" fontSize="8" fontFamily="monospace" fill="#06b6d4" opacity=".7">return 🚀</text>
              <circle cx="36" cy="26" r="1.8" fill="#ef4444" opacity=".7" />
              <circle cx="46" cy="26" r="1.8" fill="#eab308" opacity=".7" />
              <circle cx="56" cy="26" r="1.8" fill="#22c55e" opacity=".7" />
              <circle cx="112" cy="32" r="10" fill="#22c55e" opacity=".85" />
              <path d="M107 32 L111 36 L117 26" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      {/* ── Scrollable form area ── */}
      <div className="flex-1 overflow-y-auto px-8 pb-6">
        <CompactForm onClose={onFormDone} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE MODAL
   Works for BOTH portrait AND landscape.
   Portrait: normal scroll
   Landscape: maxHeight clamps to viewport, scrolls inside
───────────────────────────────────────────── */
function MobileModal({
  isSubmitted,
  onClose,
  onFormDone,
}: {
  isSubmitted: boolean;
  onClose: () => void;
  onFormDone: () => void;
}) {
  return (
    <div
      className="relative z-[100001] flex flex-col w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-[#0f1117]"
      style={{ maxHeight: "calc(100vh - 16px)" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Gradient header */}
      <div className="relative px-4 pt-4 pb-3 overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex-shrink-0">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-6 w-24 h-24 rounded-full bg-white/[0.05] pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/15 text-white border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {isSubmitted ? "Enrolled ✓" : "Live Now"}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-all"
            aria-label="Close dialog"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="shimmer-txt text-sm font-bold">
            {isSubmitted ? "You're In! 🎉" : "QUALIBYTES LEARNING PROGRAMS"}
          </h3>
          {!isSubmitted && (
            <div className="laptop-float flex-shrink-0 ml-2" style={{ transformOrigin: "40px 20px" }}>
              <svg viewBox="0 0 100 80" fill="none" className="w-14 h-10">
                <rect x="10" y="10" width="80" height="45" rx="3" fill="#86efac" stroke="#22c55e" strokeWidth="1.5" />
                <text x="20" y="32" fontSize="5" fontFamily="monospace" fontWeight="bold" fill="#000" opacity=".7">x=42</text>
                <circle cx="18" cy="14" r="1.2" fill="#ef4444" opacity=".8" />
                <circle cx="26" cy="14" r="1.2" fill="#eab308" opacity=".8" />
                <circle cx="34" cy="14" r="1.2" fill="#22c55e" opacity=".8" />
                <path d="M75 18 L80 23 L86 14" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isSubmitted ? (
          <div className="thanks-in flex flex-col items-center text-center py-2">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">You're In! 🚀</h3>
            <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">Session details in your email!</p>
            <div className="w-full flex flex-col gap-2">
              {[
                {
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  text: "Our academic counselor will reach out to you soon.",
                },
                {
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  text: "Get ready to discuss your career goals and choose the right program.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 border bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-100 dark:bg-green-500/15">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-left text-gray-600 dark:text-slate-400">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CompactForm onClose={onFormDone} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN MODAL EXPORT
───────────────────────────────────────────── */
export default function FormModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange?: any;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const deviceInfo = useDeviceInfo(); // null until measured

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setIsSubmitted(false);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const onClose = () => onOpenChange(false);
  const onFormDone = () => setIsSubmitted(true);

  // Wait for device detection — prevents wrong layout flash
  if (!deviceInfo) {
    return (
      <div className="fixed inset-0 z-[100000] flex items-center justify-center">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/70" onClick={onClose} />
      </div>
    );
  }

  const { isMobile } = deviceInfo;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden"
      style={{ padding: "16px" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/70" onClick={onClose} />

      {/* ── Mobile ── */}
      {isMobile && (
        <MobileModal
          isSubmitted={isSubmitted}
          onClose={onClose}
          onFormDone={onFormDone}
        />
      )}

      {/* ── Tablet / Desktop — full left panel layout ── */}
      {!isMobile && (
        <div
          className="relative z-[100001] flex w-full max-w-[900px] rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-[#0f1117] border border-green-100 dark:border-white/[0.08]"
          style={{ minHeight: "530px", maxHeight: "95vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatedLeftPanel />
          {isSubmitted ? (
            <ThanksRightPanel onClose={onClose} />
          ) : (
            <DesktopFormPanel onClose={onClose} onFormDone={onFormDone} />
          )}
        </div>
      )}
    </div>
  );
}