import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string | null;
}

export default function LeadershipTeam() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Akshit Giri",
      position: "CEO & Founder of Qualibytes",
      bio: "Founder and visionary leader of Qualibytes.",
      imageUrl: "/akshit.webp",
    },
    {
      id: 2,
      name: "Deepanshu Giri",
      position: "Co-Founder & COO of Qualibytes",
      bio: "Co-founder supporting strategy and growth.",
      imageUrl: "/deepanshu.webp",
    },
    {
      id: 3,
      name: "Aditi",
      position: "Operations Head",
      bio: "Leads operations and execution.",
      imageUrl: "/aditi.webp",
    },
  ];

  useEffect(() => {
    if (window.innerWidth >= 640) return;

    const container = scrollRef.current;
    if (!container || !teamMembers.length) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (maxScrollLeft <= 0) return;

      const progress = scrollLeft / maxScrollLeft;
      const index = Math.round(progress * (teamMembers.length - 1));
      setActiveIndex(index);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-slate-50 dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section Heading — exact match to FeaturedProgram ── */}
        <motion.div
          className="text-center mb-12 px-4"
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
            · Meet The Team ·
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
              Leadership
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
            Meet the people behind Qualibytes
          </p>
        </motion.div>

        {/* ── Team Cards ── */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible"
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="snap-center shrink-0 w-full max-w-[420px] bg-white dark:bg-[#0b1220] rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg px-8 pt-10 pb-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-[#0b1220] shadow-md">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={`${member.name}, ${member.position}`}
                      width={200}
                      height={200}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {member.name}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {member.position}
              </p>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile dots ── */}
      <div className="mt-6 flex justify-center gap-2 sm:hidden">
        {teamMembers.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition ${
              index === activeIndex
                ? "bg-blue-600"
                : "bg-slate-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}