"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { label: "Join Us Enrollment",                    icon: "" },
  { label: "Attend Live Interactive Classes",        icon: "" },
  { label: "Work On Real Major Projects",            icon: "" },
  { label: "Weekend Mock Interviews & Doubt Sessions", icon: "" },
  { label: "Internship Certificate",                 icon: "" },
  { label: "Interview Support & Job Referrals",      icon: "" },
];

const nodes = [
  { x: 160,  y: 490, above: false },
  { x: 370,  y: 445, above: true  },
  { x: 590,  y: 400, above: false },
  { x: 820,  y: 358, above: true  },
  { x: 1040, y: 318, above: false },
  { x: 1260, y: 280, above: true  },
];

const ROAD   = "M-20 518 C160 508 360 452 580 398 C800 346 1020 310 1240 282 C1420 260 1560 252 1820 240";
const CR     = 36;
const AL     = 80;
const BW     = 210;
const GAP    = 10;
const BORDw  = 2;

const COLORS  = ["#2563eb","#6366f1","#0ea5e9","#8b5cf6","#06b6d4","#3b82f6"];
const COLORS2 = ["#6366f1","#0ea5e9","#8b5cf6","#06b6d4","#2563eb","#6366f1"];

function splitLines(text: string): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length <= 22) { cur = test; }
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

function MobileCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      className="flex items-start gap-3 w-full"
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 180 }}
      viewport={{ once: true }}
    >
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          className="relative flex items-center justify-center rounded-full text-white font-extrabold"
          style={{
            width: 48, height: 48,
            background: `linear-gradient(135deg, ${COLORS[index]}, ${COLORS2[index]})`,
            boxShadow: `0 4px 20px ${COLORS[index]}55`,
            fontFamily: "Georgia, serif",
            fontSize: 14,
          }}
          animate={{
            boxShadow: [
              `0 4px 20px ${COLORS[index]}44`,
              `0 4px 28px ${COLORS[index]}88`,
              `0 4px 20px ${COLORS[index]}44`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
        >
          {String(index + 1).padStart(2, "0")}
          <motion.div
            className="absolute rounded-full border-2 pointer-events-none"
            style={{ inset: -5, borderColor: COLORS[index], opacity: 0.3 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.05, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            className="w-0.5 mt-1"
            style={{
              height: 36,
              background: `linear-gradient(to bottom, ${COLORS[index]}, ${COLORS[index + 1]})`,
            }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
          />
        )}
      </div>

      <motion.div
        className="flex-1 rounded-2xl mb-2 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.95)",
          border: `2px solid ${COLORS[index]}33`,
          boxShadow: `0 4px 24px ${COLORS[index]}22`,
        }}
        whileHover={{ scale: 1.02, boxShadow: `0 8px 32px ${COLORS[index]}44` }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${COLORS[index]}, ${COLORS2[index]})` }}
        />
        <div className="px-4 py-3 flex items-center gap-3">
          <span style={{ fontSize: 22 }}>{step.icon}</span>
          <p
            className="font-black text-slate-900 leading-tight"
            style={{ fontFamily: "system-ui, sans-serif", fontSize: 14 }}
          >
            {step.label}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CareerRoadmap() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 80%"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const Heading = (
    <motion.div
      className="text-center mb-6 px-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.span
        className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase"
        style={{
          background: "rgba(37,99,235,0.09)", color: "#2563eb",
          border: "1px solid rgba(37,99,235,0.22)", letterSpacing: "0.13em",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
      >● Your Journey Starts Here</motion.span>

      <h2
        className="font-extrabold text-gray-900 dark:text-white"
        style={{ fontSize: "clamp(26px,3.5vw,52px)", fontFamily: "'Georgia',serif", letterSpacing: "-1.5px", lineHeight: 1.1 }}
      >
        Our{" "}
        <span style={{ background: "linear-gradient(120deg,#2563eb,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Career Roadmap
        </span>
      </h2>

      <motion.div
        className="mx-auto mt-4 rounded-full"
        style={{ height: 3, background: "linear-gradient(90deg,transparent,#2563eb,#6366f1,transparent)" }}
        initial={{ width: 0 }}
        whileInView={{ width: 180 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      />
      <p className="mt-4 text-gray-500 dark:text-slate-400 max-w-xl mx-auto" style={{ fontSize: 15 }}>
        A structured journey designed to transform your skills into real job opportunities.
      </p>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      className="w-full pt-10 pb-6 bg-gradient-to-b from-[#eef2f7] to-[#e2e8f0] dark:from-[#0f172a] dark:to-[#1e293b]"
      style={{ overflow: "hidden" }}
    >
      {Heading}

      {/* MOBILE: Vertical Timeline */}
      <div className="block md:hidden px-4 pb-6">
        <div className="flex flex-col max-w-sm mx-auto">
          {steps.map((step, i) => (
            <MobileCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* DESKTOP: Road SVG */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 1800 730"
          style={{ width: "100%", display: "block", height: "auto" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2d3748" />
              <stop offset="45%"  stopColor="#1a202c" />
              <stop offset="100%" stopColor="#2d3748" />
            </linearGradient>
            <radialGradient id="cg" cx="38%" cy="32%">
              <stop offset="0%"  stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </radialGradient>
            <filter id="cf" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="bf" x="-10%" y="-20%" width="120%" height="150%">
              <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="rgba(37,99,235,0.20)"/>
            </filter>
            {nodes.map((_, i) => (
              <linearGradient key={i} id={`bg${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor={COLORS[i]} />
                <stop offset="100%" stopColor={COLORS2[i]} />
              </linearGradient>
            ))}
            {nodes.map((n, i) => {
              const lineY1 = n.above ? n.y - CR      : n.y + CR;
              const lineY2 = n.above ? n.y - CR - AL : n.y + CR + AL;
              const y1 = Math.min(lineY1, lineY2);
              const y2 = Math.max(lineY1, lineY2);
              return (
                <linearGradient key={`ag${i}`} id={`ag${i}`} x1="0" y1={y1} x2="0" y2={y2} gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor={COLORS[i]} stopOpacity="0" />
                  <stop offset="50%"  stopColor="white"     stopOpacity="0.85" />
                  <stop offset="100%" stopColor={COLORS[i]} stopOpacity="0" />
                </linearGradient>
              );
            })}
          </defs>

          <path d={ROAD} fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="126" strokeLinecap="butt"/>
          <path d={ROAD} fill="none" stroke="url(#rg)" strokeWidth="112" strokeLinecap="butt"
            style={{ filter: "drop-shadow(0 16px 34px rgba(0,0,0,0.40))" }}/>
          <path d={ROAD} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" strokeLinecap="butt"/>
          <motion.path
            d={ROAD} fill="none" stroke="rgba(255,255,255,0.52)"
            strokeWidth="4.5" strokeDasharray="26 20" strokeLinecap="round"
            style={{ pathLength }}
          />

          {nodes.map((n, i) => {
            const lineY1   = n.above ? n.y - CR      : n.y + CR;
            const lineY2   = n.above ? n.y - CR - AL : n.y + CR + AL;
            const lines    = splitLines(steps[i].label);
            const lineH    = 22;
            const padV     = 16;
            const boxH     = lines.length * lineH + padV * 2;
            const boxX     = n.x - BW / 2;
            const boxY     = n.above ? lineY2 - GAP - boxH : lineY2 + GAP;
            const textY0   = boxY + padV + lineH * 0.80;
            const arrowLen = Math.abs(lineY2 - lineY1);

            return (
              <g key={i}>
                <motion.circle cx={n.x} cy={n.y} r={CR + 13}
                  fill="none" stroke={COLORS[i]} strokeWidth="2" opacity={0.20}
                  animate={{ r: [CR+13, CR+22, CR+13], opacity: [0.20, 0.04, 0.20] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                />
                <motion.circle cx={n.x} cy={n.y} r={CR}
                  fill="url(#cg)"
                  style={{ filter: "url(#cf)", transformOrigin: `${n.x}px ${n.y}px` }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.13, type: "spring", stiffness: 220 }}
                  viewport={{ once: true }}
                />
                <motion.text x={n.x} y={n.y}
                  textAnchor="middle" dominantBaseline="central"
                  fill="white" fontSize="16" fontWeight="800" fontFamily="Georgia,serif"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.13 + 0.15 }}
                  viewport={{ once: true }}
                >{String(i + 1).padStart(2, "0")}</motion.text>

                <motion.line
                  x1={n.x} y1={lineY1} x2={n.x} y2={lineY2}
                  stroke={COLORS[i]} strokeWidth="2.5" strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.55, delay: i * 0.13 + 0.28 }}
                  viewport={{ once: true }}
                />
                <motion.rect
                  x={n.x - 3} y={Math.min(lineY1, lineY2)}
                  width={6} height={arrowLen} rx={3}
                  fill={`url(#ag${i})`}
                  animate={{
                    y: n.above
                      ? [lineY2 - arrowLen, lineY1, lineY2 - arrowLen]
                      : [lineY1 - arrowLen, lineY2, lineY1 - arrowLen],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.28 + 1.2, ease: "easeInOut" }}
                />
                <motion.polygon
                  points={
                    n.above
                      ? `${n.x},${lineY2-2} ${n.x-7},${lineY2+11} ${n.x+7},${lineY2+11}`
                      : `${n.x},${lineY2+2} ${n.x-7},${lineY2-11} ${n.x+7},${lineY2-11}`
                  }
                  fill={COLORS[i]}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.13 + 0.78, type: "spring" }}
                  viewport={{ once: true }}
                />

                <motion.rect
                  x={boxX - BORDw} y={boxY - BORDw}
                  width={BW + BORDw * 2} height={boxH + BORDw * 2}
                  rx={15} ry={15}
                  fill={`url(#bg${i})`} filter="url(#bf)"
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.13 + 0.36, type: "spring", stiffness: 180 }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: `${n.x}px ${boxY + boxH / 2}px` }}
                />
                <motion.rect
                  x={boxX} y={boxY} width={BW} height={boxH} rx={13} ry={13}
                  fill="rgba(255,255,255,0.95)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.13 + 0.42 }}
                  viewport={{ once: true }}
                />
                <motion.rect
                  x={boxX + 12} y={boxY + 5} width={BW - 24} height={7} rx={3.5} ry={3.5}
                  fill="rgba(255,255,255,0.55)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.13 + 0.50 }}
                  viewport={{ once: true }}
                />
                {lines.map((line, li) => (
                  <motion.text
                    key={li} x={n.x} y={textY0 + li * lineH}
                    textAnchor="middle" fill="#0f172a"
                    fontSize="15" fontWeight="900" fontFamily="system-ui,sans-serif"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.13 + 0.50 + li * 0.04 }}
                    viewport={{ once: true }}
                  >{line}</motion.text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}