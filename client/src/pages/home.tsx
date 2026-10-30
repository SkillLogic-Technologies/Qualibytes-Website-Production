import { useState, lazy, Suspense, type ComponentType } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";
import FeaturedProgram from "@/components/featured-program";
import CompanyLogos from "@/components/company-logos";
import ProgramsSection from "@/components/programs-section";
import GrowthFormula from "@/components/growth-formula";
import LeadershipTeam from "@/components/leadership-team";
import OldFooter from "@/components/oldFooter";
import WhatsAppFloat from "@/components/whatsapp-float";
import AdvisorPopup from "@/components/AdvisorPopup";
import SEO from "@/seo/SEO";
import { PAGES } from "@/seo/seo-config";
import { useDeferredMount } from "@/hooks/use-deferred-mount";

/* Lazy load heavy sections (browser code-splitting). React.lazy() can't be
   rendered by the prerender script's synchronous renderToString() call —
   see client/src/pages/home.server.tsx, which the prerender script renders
   for "/" instead of this component, using plain static imports of these
   same two components. */
const SuccessStories = lazy(() => import("@/components/success-stories"));
const IndustriesPieSection = lazy(() =>
  import("@/components/industries-pie-section")
);

interface HomeProps {
  onRequestCall: () => void;
}

/* ── Reusable Section Heading — pixel-perfect match to FeaturedProgram ── */
function SectionHeading({
  badge,
  title,
  highlight,
  after,
  sub,
}: {
  badge: string;
  title: string;
  highlight?: string;
  after?: string;
  sub: string;
}) {
  return (
    <motion.div
      className="text-center px-4"
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true }}
    >
      {/* ── Pill badge — exact copy from FeaturedProgram ── */}
      <motion.span
        className="inline-block mb-3 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400"
        style={{
          fontSize: "clamp(9px,1vw,12px)",
          background: "rgba(37,99,235,0.08)",
          border: "1px solid rgba(37,99,235,0.18)",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        · {badge} ·
      </motion.span>

      {/* ── Main heading — exact copy from FeaturedProgram h2 ── */}
      <h2
        className="font-extrabold text-gray-900 dark:text-white"
        style={{
          fontSize: "clamp(22px,4vw,52px)",
          fontFamily: "'Georgia',serif",
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
        }}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span
              style={{
                background: "linear-gradient(120deg,#2563eb,#6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {highlight}
            </span>
          </>
        )}
        {after && <>{" "}{after}</>}
      </h2>

      {/* ── Animated gradient underline — exact copy from FeaturedProgram ── */}
      <motion.div
        className="mx-auto mt-3 rounded-full"
        style={{
          height: 2,
          background:
            "linear-gradient(90deg,transparent,#2563eb,#6366f1,transparent)",
        }}
        initial={{ width: 0 }}
        whileInView={{ width: 130 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        viewport={{ once: true }}
      />

      {/* ── Subheading — exact copy from FeaturedProgram p ── */}
      <p
        className="mt-3 text-gray-500 dark:text-slate-400 max-w-lg mx-auto"
        style={{
          fontSize: "clamp(11px,1.5vw,14px)",
          fontFamily: "system-ui,sans-serif",
          fontWeight: 400,
        }}
      >
        {sub}
      </p>
    </motion.div>
  );
}

const container = "max-w-5xl mx-auto";

/**
 * Shared page body. Takes IndustriesPieSection/SuccessStories as props so the
 * browser entry (Home, below) can pass the lazy()-wrapped versions for
 * code-splitting, while the prerender-only entry (home.server.tsx) can pass
 * the plain components directly — React.lazy() can't be rendered by the
 * synchronous renderToString() the prerender script uses.
 */
export function HomeBody({
  IndustriesPieSection,
  SuccessStories,
  showAdvisorPopup,
  onCloseAdvisorPopup,
}: {
  IndustriesPieSection: ComponentType;
  SuccessStories: ComponentType;
  showAdvisorPopup: boolean;
  onCloseAdvisorPopup: () => void;
}) {
  // WhatsAppFloat is a fixed-position overlay with its own continuous CSS
  // pulse/float animations — purely decorative chrome, not part of page
  // layout (position: fixed doesn't affect document flow, so delaying its
  // mount can't shift anything else). Deferring it to idle/after-load frees
  // the main thread during the initial render/hydration window instead of
  // competing with it. useDeferredMount returns false on both the server
  // prerender and the client's first render, then true once idle — so
  // there's no hydration mismatch, just the same final DOM a few hundred ms
  // later than before.
  const showWhatsAppFloat = useDeferredMount();

  return (
    <div className="w-full bg-background text-foreground font-sans">
      <SEO page={PAGES.home} />

      <HeroSection />

      <Suspense fallback={<div className="py-10 text-center">Loading...</div>}>
        <IndustriesPieSection />
      </Suspense>

      <FeaturedProgram />

      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#080d1c]">
        <div className={container}>
          <SectionHeading
            badge="Our Placements"
            title="Our Alumni"
            highlight="Work At"
            sub="Empowering Talent, Delivering Industry Leaders"
          />
        </div>
      </section>

      <section className="py-8 bg-gray-100 dark:bg-neutral-900">
        <div className="w-full px-4">
          <CompanyLogos />
        </div>
      </section>

      <ProgramsSection />

      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#080d1c]">
        <div className={container}>
          <SectionHeading
            badge="Success Stories"
            title="Where Talent"
            highlight="Meets Opportunity"
            sub="Delivering industry-ready training and shaping confident professionals since day one."
          />
        </div>
      </section>

      <Suspense fallback={<div className="py-10 text-center">Loading...</div>}>
        <SuccessStories />
      </Suspense>

      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#080d1c]">
        <div className={container}>
          <SectionHeading
            badge="Upskill Now"
            title="Formula For"
            highlight="Growth"
            sub="Why should you upskill now?"
          />
        </div>
      </section>

      <GrowthFormula />

      <LeadershipTeam />

      <OldFooter />

      {showWhatsAppFloat && <WhatsAppFloat />}

      {showAdvisorPopup && <AdvisorPopup onClose={onCloseAdvisorPopup} />}
    </div>
  );
}

export default function Home({ onRequestCall }: HomeProps) {
  const [showAdvisorPopup, setShowAdvisorPopup] = useState(false);

  return (
    <HomeBody
      IndustriesPieSection={IndustriesPieSection}
      SuccessStories={SuccessStories}
      showAdvisorPopup={showAdvisorPopup}
      onCloseAdvisorPopup={() => setShowAdvisorPopup(false)}
    />
  );
}