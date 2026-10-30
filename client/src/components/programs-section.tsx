/* ---------------------------------------------------------
   FINAL ProgramsSection.tsx (INFINITE LOOP + ZOOM FIXED)
--------------------------------------------------------- */

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "wouter";
import { BROCHURE_LINKS, GOOGLE_SHEET_URL } from "@/brochureLinks";
import BrochureModal from "./BrochureModal";

/* ---------------------------------------------------------
   CONSTANTS (CRITICAL FOR ALIGNMENT)
--------------------------------------------------------- */
const CARD_WIDTH = 300;
const GAP = 32;
const SCROLL_AMOUNT = CARD_WIDTH + GAP;

/* ---------------------------------------------------------
   MAIN SECTION COMPONENT
--------------------------------------------------------- */
export default function ProgramsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null); // ← NEW

  const [isPaused, setIsPaused] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  /* ---------------------------------------------------------
      HIDE BOTTOM BAR WHEN THIS SECTION IS VISIBLE
  --------------------------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent("toggleBottomBar", {
            detail: { hide: entry.isIntersecting },
          })
        );
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      window.dispatchEvent(
        new CustomEvent("toggleBottomBar", { detail: { hide: false } })
      );
    };
  }, []);

  /* ---------------------------------------------------------
      PROGRAMS DATA
  --------------------------------------------------------- */
  const normalizeKey = (key: string) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1$2")
      .replace(
        /([a-z])([a-z]+)/g,
        (m, a, b) => a + b.charAt(0).toUpperCase() + b.slice(1),
      )
      .replace(/-/g, "");
  };

  const originalPrograms = [
    {
      key: "devops",
      name: "DevOps",
      path: "devops",
      image: "thumbnail/devops.webp",
      description: "Master CI/CD, Docker, Kubernetes, AWS, automation & real projects.",
    },
    {
      key: "aiml",
      name: "AI/ML",
      path: "aiml",
      image: "thumbnail/ai&ml.webp",
      description: "Build ML models & deploy AI systems using Python, TensorFlow & PyTorch.",
    },
    {
      key: "manualTesting",
      name: "Manual Testing",
      path: "manual-testing",
      image: "thumbnail/manual.webp",
      description: "Learn software testing fundamentals & bug tracking tools.",
    },
    {
      key: "javaFullStack",
      name: "Java Full Stack",
      path: "java-fullstack",
      image: "thumbnail/java.webp",
      description: "Learn Java, Spring Boot, REST APIs & React for full-stack development.",
    },
    {
      key: "businessAnalyst",
      name: "Business Analyst",
      path: "business-analyst",
      image: "thumbnail/business_analytics.webp",
      description: "Master BRDs, user stories, Jira workflows & client communication.",
    },
    {
      key: "androidDevelopment",
      name: "Android Development",
      path: "android",
      image: "thumbnail/android.webp",
      description: "Build Android apps using Java/Kotlin, Jetpack, Firebase & APIs.",
    },
    {
      key: "cyberSecurity",
      name: "Cyber Security",
      path: "cybersecurity",
      image: "thumbnail/cybersecurity.webp",
      description: "Learn ethical hacking & cybersecurity tools.",
    },
    {
      key: "dataAnalytics",
      name: "Data Analytics",
      path: "data-analytics",
      image: "thumbnail/data_analytics.webp",
      description: "Master SQL, Excel, Power BI, dashboards & analytics workflows.",
    },
    {
      key: "dataScience",
      name: "Data Science",
      path: "data-science",
      image: "thumbnail/data_science.webp",
      description: "Learn ML, Deep Learning, Python & real-world DS projects.",
    },
    {
      key: "frontendDevelopment",
      name: "Frontend Development",
      path: "frontend-development",
      image: "thumbnail/frontend.webp",
      description: "Learn HTML, CSS, JavaScript, React, Tailwind & API Integration.",
    },
    {
      key: "iosDevelopment",
      name: "iOS App Development",
      path: "ios-development",
      image: "thumbnail/ios.webp",
      description: "Build iOS apps using Swift, SwiftUI & Xcode.",
    },
    {
      key: "mernFullStack",
      name: "MERN Full Stack",
      path: "mern-fullstack",
      image: "thumbnail/mern.webp",
      description: "Master MongoDB, Express, React, Node & full-stack project building.",
    },
    {
      key: "pythonFullStack",
      name: "Python Full Stack",
      path: "python-fullstack",
      image: "thumbnail/python.webp",
      description: "Learn Python, Django/Flask, REST APIs & full-stack apps.",
    },
    {
      key: "softwareTesting",
      name: "Software Testing",
      path: "software-testing",
      image: "thumbnail/software_testing.webp",
      description: "Manual + Automation + Performance testing.",
    },
  ];

  const programs = [...originalPrograms, ...originalPrograms, ...originalPrograms];

  /* ---------------------------------------------------------
      INFINITE SCROLL INIT
  --------------------------------------------------------- */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollLeft = originalPrograms.length * SCROLL_AMOUNT;
  }, []);

  /* ---------------------------------------------------------
      AUTO SLIDER LOGIC
  --------------------------------------------------------- */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      container.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

      const resetPoint = originalPrograms.length * SCROLL_AMOUNT * 2;
      if (container.scrollLeft >= resetPoint - SCROLL_AMOUNT) {
        setTimeout(() => {
          container.scrollLeft = originalPrograms.length * SCROLL_AMOUNT;
        }, 400);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  /* ---------------------------------------------------------
      ACTIVE ITEM TRACKER (ZOOM EFFECT)
  --------------------------------------------------------- */
  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    const onScroll = () => {
      const center = scroll.scrollLeft + scroll.clientWidth / 2;
      let nearestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const itemCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(center - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex % originalPrograms.length);
    };

    scroll.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroll.removeEventListener("scroll", onScroll);
  }, []);

  const setItemRef = (el: HTMLDivElement | null, idx: number) => {
    itemRefs.current[idx] = el;
  };

  /* ---------------------------------------------------------
      RENDER
  --------------------------------------------------------- */
  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden bg-white dark:bg-[#0f1115]"
    >
      {/* Scrollbar Hide CSS */}
      <style>{`
        .programs-scroll::-webkit-scrollbar { display: none; }
        .programs-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
          touch-action: pan-y;
        }
      `}</style>

      {/* ── Section Heading ── */}
      <motion.div
        className="text-center mb-16 px-4"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
      >
        {/* Pill badge */}
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
          · Explore Courses ·
        </motion.span>

        {/* Main heading */}
        <h2
          className="font-extrabold text-gray-900 dark:text-white"
          style={{
            fontSize: "clamp(22px,4vw,52px)",
            fontFamily: "'Georgia',serif",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
          }}
        >
          Our{" "}
          <span
            style={{
              background: "linear-gradient(120deg,#2563eb,#6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Programs
          </span>
        </h2>

        {/* Animated gradient underline */}
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

        {/* Subheading */}
        <p
          className="mt-3 text-gray-500 dark:text-slate-400 max-w-lg mx-auto"
          style={{
            fontSize: "clamp(11px,1.5vw,14px)",
            fontFamily: "system-ui,sans-serif",
            fontWeight: 400,
          }}
        >
          Programs To Help You Upskill
        </p>
      </motion.div>

      {/* ---------------------------------------------------------
          DESKTOP HORIZONTAL SLIDER
      --------------------------------------------------------- */}
      <div className="hidden md:block relative group">
        {/* LEFT ARROW */}
        <button
          onClick={() => {
            setIsPaused(true);
            scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
            setTimeout(() => {
              scrollRef.current?.dispatchEvent(new Event("scroll"));
            }, 300);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 flex items-center justify-center border bg-white shadow-lg rounded-full dark:bg-gray-800 dark:border-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          <span className="text-2xl font-bold">←</span>
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => {
            setIsPaused(true);
            scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
            setTimeout(() => {
              scrollRef.current?.dispatchEvent(new Event("scroll"));
            }, 300);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 flex items-center justify-center border bg-white shadow-lg rounded-full dark:bg-gray-800 dark:border-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          <span className="text-2xl font-bold">→</span>
        </button>

        {/* CARD CONTAINER */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto px-16 py-10 scroll-smooth programs-scroll"
        >
          {programs.map((program, i) => {
            const isActive = i % originalPrograms.length === activeIndex;
            return (
              <div
                key={i}
                // programs = originalPrograms repeated 3x so the CSS/JS
                // auto-scroll has room to loop seamlessly; i < length is the
                // one real, visible-on-load set. Marked so the prerendered
                // HTML for crawlers keeps one card per course instead of 3.
                {...(i >= originalPrograms.length ? { "data-prerender-strip": "duplicate" } : {})}
                ref={(el) => setItemRef(el, i)}
                onMouseEnter={() => {
                  setIsPaused(true);
                  setActiveIndex(i % originalPrograms.length);
                }}
                onMouseLeave={() => setIsPaused(false)}
                className={`min-w-[300px] max-w-[300px] bg-white dark:bg-[#191c24]
                  rounded-xl shadow-md flex flex-col h-[420px]
                  transition-all duration-500 ease-out transform-gpu ${
                    isActive
                      ? "scale-105 shadow-[0_10px_40px_rgba(37,99,235,0.3)] border border-blue-500/20 z-10 opacity-100"
                      : "scale-95 opacity-70 blur-[0.5px] z-0"
                  }`}
              >
                {/* IMAGE */}
                <div className="w-full bg-gray-100 dark:bg-[#23272f]">
                  <img
                    src={program.image}
                    alt={`${program.name} course thumbnail`}
                    width={300}
                    height={169}
                    className="w-full aspect-[16/9] object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-xl font-bold dark:text-white mb-2">
                    {program.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 line-clamp-3">
                    {program.description}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                      <Link href={`/courses/${program.path}`} aria-label={`View ${program.name} program`}>
                        View Program
                      </Link>
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedProgram(program.key);
                        setSelectedName(program.name);
                        setShowBrochure(true);
                      }}
                      variant="outline"
                      aria-label={`Download ${program.name} brochure`}
                      className="w-full border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      BROCHURE ↓
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------
          MOBILE GRID VIEW (STACKED)
      --------------------------------------------------------- */}
      <div className="block md:hidden w-full px-4">
        <div className="grid grid-cols-1 gap-6 w-full">
          {originalPrograms.map((program, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#191c24] border dark:border-gray-800 rounded-xl shadow-md flex flex-col w-full overflow-hidden"
            >
              <div className="w-full">
                <img
                  src={program.image}
                  alt={`${program.name} course thumbnail`}
                  width={300}
                  height={169}
                  loading="lazy"
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-lg font-bold dark:text-white">
                  {program.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 mb-4">
                  {program.description}
                </p>
                <div className="flex flex-col gap-2">
                  <Button asChild className="w-full bg-blue-600 text-white font-bold">
                    <Link href={`/courses/${program.path}`} aria-label={`View ${program.name} program`}>
                      View Program
                    </Link>
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedProgram(
                        program.key.replace(/\s+/g, "").toLowerCase(),
                      );
                      setSelectedName(program.name);
                      setShowBrochure(true);
                    }}
                    variant="outline"
                    aria-label={`Download ${program.name} brochure`}
                    className="w-full border-blue-600 text-blue-600 font-bold"
                  >
                    Download Brochure
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BROCHURE MODAL */}
      {showBrochure && (
        <BrochureModal
          open={showBrochure}
          onClose={() => setShowBrochure(false)}
          programName={selectedName || ""}
          programKey={selectedProgram || ""}
          autoSubmit={true}
        />
      )}
    </section>
  );
}