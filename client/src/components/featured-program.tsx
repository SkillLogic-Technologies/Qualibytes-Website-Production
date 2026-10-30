"use client";

import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useRef, useState } from "react";
import ContactFormPopup from "@/components/ContactFormPopup";

function useCounter(target: number, dur = 1.8) {
  const [val, setVal] = useState(0);
  const fired = useRef(false);
  return {
    val,
    trigger: () => {
      if (fired.current) return;
      fired.current = true;
      animate(0, target, { duration: dur, ease: "easeOut", onUpdate: v => setVal(Math.round(v)) });
    },
  };
}

const TICKER = ["Flexible EMIs", "Instant Admission", "Early Batch Access", "Job Referrals", "Starting ₹2,000", "Internship Certificate", "Live Classes", "Mock Interviews", "50+ Hiring Partners"];

/* ── Ticker ── */
function Ticker() {
  const all = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div
      className="overflow-hidden py-2.5"
      style={{
        background: "linear-gradient(90deg,#1e1b4b,#4c1d95,#2563eb,#1e40af,#4c1d95,#1e1b4b)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {all.map((t, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-bold uppercase"
              style={{
                fontSize: "clamp(10px,1.1vw,12px)",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.90)",
                padding: "0 24px",
              }}
            >
              {t}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(165,180,252,0.50)", flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Stat ── */
function Stat({ num, pre = "", suf = "", label, color, glowColor, delay }: {
  num: number; pre?: string; suf?: string; label: string; color: string; glowColor: string; delay: number;
}) {
  const c = useCounter(num);
  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      viewport={{ once: true }}
      onViewportEnter={c.trigger}
    >
      <span style={{
        fontSize: "clamp(24px,5vw,52px)",
        fontFamily: "'Georgia',serif",
        fontWeight: 900,
        letterSpacing: "-2px",
        lineHeight: 1,
        color,
        textShadow: `0 0 22px ${glowColor}, 0 0 48px ${glowColor}`,
        filter: "brightness(1.15)",
      }}>
        {pre}{c.val}{suf}
      </span>
      <span style={{
        fontSize: "clamp(8px,1.8vw,11px)",
        fontFamily: "system-ui,sans-serif",
        fontWeight: 800,
        letterSpacing: "0.16em",
        textTransform: "uppercase" as const,
        color: "rgba(255,255,255,0.88)",
      }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ── Feature row ── */
function FeatRow({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-2.5"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <span className="flex-shrink-0 rounded-md flex items-center justify-center text-amber-400"
        style={{
          width: "clamp(22px,4vw,26px)",
          height: "clamp(22px,4vw,26px)",
          background: "rgba(251,191,36,0.13)",
          border: "1px solid rgba(251,191,36,0.22)"
        }}>
        {icon}
      </span>
      <span style={{
        fontSize: "clamp(11px,1.8vw,15px)",
        fontFamily: "system-ui,sans-serif",
        fontWeight: 600,
        color: "rgba(255,255,255,0.90)",
        letterSpacing: "0.005em",
        lineHeight: 1.4,
      }}>
        {text}
      </span>
    </motion.div>
  );
}

/* ── Bento card ── */
function Bento({ children, bg, border, delay, span2 = false }: {
  children: React.ReactNode; bg: string; border: string; delay: number; span2?: boolean;
}) {
  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${span2 ? "col-span-2" : ""}`}
      style={{ background: bg, border: `1px solid ${border}`, backdropFilter: "blur(14px)" }}
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, type: "spring", stiffness: 150 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.026, transition: { duration: 0.18 } }}
    >
      {children}
    </motion.div>
  );
}

const BT: React.CSSProperties = {
  fontFamily: "'Georgia',serif",
  fontWeight: 800,
  letterSpacing: "-0.3px",
  lineHeight: 1.3,
  color: "#ffffff",
  fontSize: "clamp(11px,1.8vw,16px)",
  textShadow: "0 1px 8px rgba(0,0,0,0.18)",
};
const BS: React.CSSProperties = {
  fontFamily: "system-ui,sans-serif",
  fontWeight: 500,
  fontSize: "clamp(9px,1.4vw,11.5px)",
  letterSpacing: "0.02em",
  color: "rgba(255,255,255,0.62)",
  marginTop: "3px",
};

function IconBox({ color, bg, border, children }: { color: string; bg: string; border: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "clamp(28px,5vw,36px)",
      height: "clamp(28px,5vw,36px)",
      borderRadius: 9,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: bg,
      border: `1px solid ${border}`,
      color,
      marginBottom: 8,
      flexShrink: 0
    }}>
      {children}
    </div>
  );
}
function Bar({ color }: { color: string }) {
  return <div style={{ width: 20, height: 2.5, borderRadius: 99, background: color, marginBottom: 10 }} />;
}

const I = {
  card:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  zap:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  book:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  job:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  cert:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="8" r="5"/><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5"/></svg>,
  users:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  arrow:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  monitor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  mic:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
};

export default function FeaturedProgram() {
  const [popupOpen, setPopupOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rY = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const go = () => setPopupOpen(true);

  return (
    <section className="w-full overflow-hidden bg-slate-50 dark:bg-[#080d1c]">

      {/* ✅ ContactFormPopup render */}
      <ContactFormPopup open={popupOpen} onOpenChange={setPopupOpen} />

      {/* ── Section Heading ── */}
      <motion.div
        className="text-center pt-8 sm:pt-10 lg:pt-12 pb-4 sm:pb-5 px-4"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
      >
        <motion.span
          className="inline-block mb-2 sm:mb-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400"
          style={{
            fontSize: "clamp(9px,2vw,12px)",
            background: "rgba(37,99,235,0.08)",
            border: "1px solid rgba(37,99,235,0.18)"
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >· Featured Program ·</motion.span>

        <h2
          className="font-extrabold text-gray-900 dark:text-white"
          style={{
            fontSize: "clamp(20px,5vw,52px)",
            fontFamily: "'Georgia',serif",
            letterSpacing: "-1.5px",
            lineHeight: 1.1
          }}
        >
          Learn Now.{" "}
          <span style={{ background: "linear-gradient(120deg,#2563eb,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Pay Monthly.
          </span>{" "}
          Succeed in IT.
        </h2>

        <motion.div
          className="mx-auto mt-2 sm:mt-3 rounded-full"
          style={{ height: 2, background: "linear-gradient(90deg,transparent,#2563eb,#6366f1,transparent)" }}
          initial={{ width: 0 }}
          whileInView={{ width: 130 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          viewport={{ once: true }}
        />

        <p
          className="mt-2 sm:mt-3 text-gray-500 dark:text-slate-400 max-w-lg mx-auto"
          style={{ fontSize: "clamp(11px,2vw,14px)" }}
        >
          Easy EMIs, instant admission, and career-focused programs for students and working professionals.
        </p>
      </motion.div>

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Banner ── */}
      <div
        ref={ref}
        className="relative mx-2 sm:mx-4 lg:mx-8 mt-3 sm:mt-4 mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 dark:hidden" style={{ background: "linear-gradient(130deg,#0b1640 0%,#1240c0 38%,#1a52d8 58%,#142fa8 80%,#080e2c 100%)" }} />
        <div className="absolute inset-0 hidden dark:block" style={{ background: "linear-gradient(130deg,#030610 0%,#071030 28%,#0e2280 52%,#170f6a 76%,#04070e 100%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "26px 26px" }} />

        {[
          { s: 340, t: "-130px", l: "-80px", c: "rgba(37,99,235,0.30)"  },
          { s: 280, b: "-100px", r: "-60px", c: "rgba(109,40,217,0.32)" },
          { s: 200, t: "28%",    l: "44%",   c: "rgba(79,70,229,0.18)"  },
        ].map((o, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width: o.s, height: o.s, top: (o as any).t, bottom: (o as any).b, left: (o as any).l, right: (o as any).r, background: `radial-gradient(circle,${o.c} 0%,transparent 65%)` }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.88, 0.55] }}
            transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
          />
        ))}

        <div className="relative z-10 flex flex-col lg:flex-row">

          {/* ══ LEFT ══ */}
          <motion.div
            className="flex flex-col justify-center px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 pt-6 sm:pt-10 lg:pt-12 pb-4 sm:pb-6 lg:pb-8 lg:w-[50%]"
            style={{ y: lY }}
          >
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "system-ui,sans-serif",
                fontWeight: 700,
                fontSize: "clamp(10px,2vw,13px)",
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "rgb(247,247,247)",
                marginBottom: 4
              }}
            >
              Start Your IT Career at Just
            </motion.p>

            <motion.div
              className="relative mb-2 sm:mb-3"
              initial={{ opacity: 0, x: -28, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.65, type: "spring", stiffness: 115, delay: 0.14 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 blur-3xl opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse,#fbbf24,#f97316)", transform: "scale(0.55)" }} />
              <span
                className="relative block font-black leading-none"
                style={{
                  fontSize: "clamp(44px,12vw,128px)",
                  fontFamily: "'Georgia',serif",
                  letterSpacing: "-4px",
                  background: "linear-gradient(128deg,#fef9c3 0%,#fbbf24 28%,#f97316 55%,#fbbf24 80%,#fef9c3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >₹2,000</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Georgia',serif",
                fontWeight: 800,
                fontSize: "clamp(14px,3.5vw,30px)",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
                color: "#fff",
                marginBottom: 16
              }}
            >
              Upskill. Grow.{" "}
              <span style={{ background: "linear-gradient(90deg,#93c5fd,#a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Succeed in IT.
              </span>
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {[
                { i: I.card, t: "Flexible EMI starting at ₹2,000/month"   },
                { i: I.zap,  t: "Instant admission — zero waiting period"  },
                { i: I.book, t: "Live classes with industry experts"        },
                { i: I.job,  t: "Placement support & direct job referrals" },
              ].map((f, idx) => <FeatRow key={idx} icon={f.i} text={f.t} delay={0.28 + idx * 0.07} />)}
            </div>

            <motion.div
              className="flex flex-wrap gap-1.5 mb-4 sm:mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.48 }}
              viewport={{ once: true }}
            >
              {["Students", "Freshers", "Working Professionals"].map((p, i) => (
                <span key={i} style={{
                  padding: "3px 10px",
                  borderRadius: 6,
                  fontFamily: "system-ui,sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(9px,1.8vw,12px)",
                  letterSpacing: "0.04em",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.62)",
                  border: "1px solid rgba(255,255,255,0.15)"
                }}>{p}</span>
              ))}
            </motion.div>

            <motion.button
              onClick={go}
              className="relative w-full sm:w-auto sm:self-start flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#f59e0b,#ea580c)",
                color: "#0c0f1e",
                border: "none",
                borderRadius: 12,
                padding: "clamp(10px,2.5vw,13px) clamp(20px,5vw,36px)",
                fontFamily: "system-ui,sans-serif",
                fontWeight: 900,
                fontSize: "clamp(12px,2vw,15px)",
                letterSpacing: "0.02em",
                boxShadow: "0 6px 32px rgba(245,158,11,0.38), inset 0 1px 0 rgba(255,255,255,0.22)"
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 44px rgba(245,158,11,0.55), 0 0 0 4px rgba(245,158,11,0.12)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(108deg,transparent 38%,rgba(255,255,255,0.38) 50%,transparent 62%)" }}
                animate={{ x: ["-130%","230%"] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
              />
              {/* ✅ Button text change: "Enroll Today" → "Request a Call" */}
              <span className="relative z-10">Request a Call</span>
              <span className="relative z-10">{I.arrow}</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.56 }}
              viewport={{ once: true }}
              style={{
                marginTop: 8,
                fontFamily: "system-ui,sans-serif",
                fontWeight: 600,
                fontSize: "clamp(10px,1.8vw,12px)",
                letterSpacing: "0.02em",
                color: "rgb(255,255,255)"
              }}
            >
              No financial stress — learn now, pay monthly
            </motion.p>
          </motion.div>

          {/* ══ RIGHT — Bento Grid ══ */}
          <motion.div
            className="px-3 xs:px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-2 sm:pt-4 lg:pt-10 lg:w-[50%] flex items-center"
            style={{ y: rY }}
          >
            <div className="w-full grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
              <Bento bg="rgba(251,191,36,0.16)" border="rgba(251,191,36,0.40)" delay={0.16}>
                <div className="p-3 sm:p-4 lg:p-5">
                  <Bar color="#fbbf24" />
                  <Stat num={2000} suf="+" label="Students Placed" color="#fbbf24" glowColor="rgba(251,191,36,0.70)" delay={0.20} />
                </div>
              </Bento>
              <Bento bg="rgba(16,185,129,0.16)" border="rgba(16,185,129,0.40)" delay={0.22}>
                <div className="p-3 sm:p-4 lg:p-5">
                  <Bar color="#34d399" />
                  <Stat num={95} suf="%" label="Placement Rate" color="#34d399" glowColor="rgba(52,211,153,0.70)" delay={0.26} />
                </div>
              </Bento>
              <Bento bg="rgba(255,255,255,0.12)" border="rgba(255,255,255,0.22)" delay={0.30} span2>
                <div className="p-3 sm:p-4 lg:p-5 flex items-center gap-3">
                  <IconBox color="#fbbf24" bg="rgba(251,191,36,0.18)" border="rgba(251,191,36,0.32)">{I.card}</IconBox>
                  <div>
                    <p style={BT}>Start at <span style={{ color: "#fbbf24" }}>₹2,000</span> / month — Zero Barrier</p>
                    <p style={BS}>Pay as you earn · No hidden fees · Instant access</p>
                  </div>
                </div>
              </Bento>
              <Bento bg="rgba(99,102,241,0.18)" border="rgba(99,102,241,0.40)" delay={0.38}>
                <div className="p-3 sm:p-4 lg:p-5">
                  <IconBox color="#818cf8" bg="rgba(99,102,241,0.22)" border="rgba(99,102,241,0.36)">{I.monitor}</IconBox>
                  <p style={BT}>Live Interactive Classes</p>
                  <p style={BS}>Real-time with experts</p>
                </div>
              </Bento>
              <Bento bg="rgba(16,185,129,0.15)" border="rgba(16,185,129,0.36)" delay={0.44}>
                <div className="p-3 sm:p-4 lg:p-5">
                  <IconBox color="#34d399" bg="rgba(16,185,129,0.20)" border="rgba(16,185,129,0.36)">{I.mic}</IconBox>
                  <p style={BT}>Mock Interviews & Job Support</p>
                  <p style={BS}>Direct referrals</p>
                </div>
              </Bento>
              <Bento bg="rgba(129,140,248,0.22)" border="rgba(165,180,252,0.50)" delay={0.50}>
                <div className="p-3 sm:p-4 lg:p-5">
                  <Bar color="#a5b4fc" />
                  <Stat num={500} suf="+" label="Hiring Network" color="#e0e7ff" glowColor="rgba(199,210,254,0.80)" delay={0.54} />
                </div>
              </Bento>
              <Bento bg="rgba(251,191,36,0.14)" border="rgba(251,191,36,0.36)" delay={0.56}>
                <div className="p-3 sm:p-4 lg:p-5">
                  <IconBox color="#fbbf24" bg="rgba(251,191,36,0.18)" border="rgba(251,191,36,0.32)">{I.cert}</IconBox>
                  <p style={BT}>Internship Certificate</p>
                  <p style={BS}>Industry recognised</p>
                </div>
              </Bento>
            </div>
          </motion.div>
        </div>

        {/* ══ BOTTOM BAR ══ */}
        <div
          className="relative z-10 border-t grid grid-cols-1 sm:grid-cols-3"
          style={{
            borderColor: "rgba(255,255,255,0.10)",
            background: "rgba(0,0,0,0.36)",
            backdropFilter: "blur(16px)",
          }}
        >
          {[
            { icon: I.users, text: "For Students, Freshers & Working Professionals", accent: "#a5b4fc" },
            { icon: I.book,  text: "Real Projects · Mock Interviews · Job Referrals", accent: "#6ee7b7" },
            { icon: I.card,  text: "No Financial Stress — Learn Now, Pay Monthly",    accent: "#fcd34d" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 lg:px-6 py-3 sm:py-4"
              style={{
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              <span style={{ flexShrink: 0, color: item.accent, filter: `drop-shadow(0 0 6px ${item.accent}88)` }}>
                {item.icon}
              </span>
              <span style={{
                fontFamily: "system-ui,sans-serif",
                fontWeight: 700,
                fontSize: "clamp(10px,1.6vw,13px)",
                letterSpacing: "0.015em",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.35,
              }}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}