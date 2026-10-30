import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import OldFooter from "@/components/oldFooter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { X, Sun, Moon } from "lucide-react";
import { Link } from "wouter";
import { BROCHURE_LINKS, GOOGLE_SHEET_URL } from "@/brochureLinks";
import SEO from "@/seo/SEO";
import { PAGES } from "@/seo/seo-config";
import { programs, type Program } from "@/data/programs-list";

interface ProgramsProps {
  onRequestCall?: () => void;
}



/* ---------------------- DARK MODE TOGGLE ---------------------- */
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = saved === "dark" || (!saved && prefers);

    setIsDark(shouldDark);
    document.documentElement.classList.toggle("dark", shouldDark);
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg border hover:scale-110 transition"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
};

/* ---------------------- BROCHURE MODAL ---------------------- */
const BrochureModal = ({
  open,
  onClose,
  programName,
}: {
  open: boolean;
  onClose: () => void;
  programName: string | null;
}) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  // Shown instead of the form when the lead was submitted but this program
  // has no brochure PDF on file — same inline-confirmation pattern as
  // PhoneVerification's "✓ Phone Verified" panel, instead of a plain
  // alert() + immediately closing the modal.
  const [noBrochureAvailable, setNoBrochureAvailable] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    setNoBrochureAvailable(false);
    onClose();
  };

  // Normalize programName to match BROCHURE_LINKS keys (e.g., DevOps -> devops, Manual Testing -> manualTesting)
  const normalizeKey = (name: string | null) => {
    if (!name) return "";
    // If single word, just lowercase (DevOps -> devops)
    if (!name.includes(" ")) return name.toLowerCase();
    // For multi-word: Manual Testing -> manualTesting
    return name
      .replace(/\s+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/^(.)/, (m, chr) => chr.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      alert("⚠️ Please fill all details before downloading.");
      return;
    }
    if (phone && phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    try {
      // ✅ FORM SUBMIT TO GOOGLE SHEET
      const body = new URLSearchParams();
      body.append("name", name);
      body.append("email", email);
      body.append("phone", phone);
      body.append("program", programName || "");

      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body,
      });

      // PDF Download
      const key = normalizeKey(programName);
      const link = BROCHURE_LINKS[key];

      if (link) {
        const a = document.createElement("a");
        a.href = link;
        a.download = `${programName}-Brochure.pdf`;
        a.click();
        onClose();
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setNoBrochureAvailable(true);
      }
    } catch (err) {
      console.error(err);
      alert("Error! Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#111] rounded-2xl shadow-xl p-6 border dark:border-gray-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          aria-label="Close brochure dialog"
        >
          <X className="w-6 h-6" />
        </button>

        {noBrochureAvailable ? (
          /* SUCCESS (no PDF on file) — same inline-confirmation style as
             PhoneVerification's "✓ Phone Verified" panel, instead of a
             plain alert() that immediately closed the modal. */
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-green-600 dark:text-green-400 text-lg font-semibold mb-2">
              ✓ Thank You!
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Our counsellor will send you the brochure within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-center mb-4">
              Download {programName} Brochure
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label htmlFor={`brochure-${field}`} className="sr-only">{field}</label>
                  <input
                    id={`brochure-${field}`}
                    name={field}
                    required
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, [field]: e.target.value }))
                    }
                    placeholder={field.toUpperCase()}
                    className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800"
                  />
                </div>
              ))}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {submitting ? "Submitting..." : "Submit & Download"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------------------- MAIN_PAGE ---------------------- */
const ProgramsPage = ({ onRequestCall }: ProgramsProps) => {
  const [showBrochure, setShowBrochure] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  /* PAIR PROGRAMS */
  const pairs: Program[][] = [];
  for (let i = 0; i < programs.length; i += 2) {
    pairs.push(programs.slice(i, i + 2));
  }

  return (
    <div>
      <SEO page={PAGES.programs} courseList />
      {/* ================= MOBILE HERO ======================= */}
      <header className="md:hidden relative w-full h-[180px] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Program.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-100 px-4 max-w-xs">
          <h2 className="text-white font-extrabold text-lg leading-tight">
            Our <span className="text-yellow-400">Programs</span>
          </h2>
          <p className="text-gray-300 text-[11px] mt-2">
            Industry-focused training programs designed to make you job-ready.
          </p>
          <Button
            onClick={onRequestCall}
            className="mt-3 bg-yellow-400 text-black font-semibold px-3 py-1.5 text-xs rounded-md"
          >
            Talk to a Counsellor
          </Button>
        </div>
      </header>

      {/* ================= DESKTOP HERO ====================== */}
      <section className="hidden md:block relative w-full">
        <motion.img
          src="/Program.webp"
          alt="Our Programs Banner"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-auto object-contain block"
        />

        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-white font-extrabold text-4xl lg:text-6xl">
              Our Programs
            </h1>
            <p className="mt-4 text-gray-200 text-lg lg:text-2xl">
              Industry-focused training programs designed to make you job-ready
            </p>
            <Button
              onClick={onRequestCall}
              className="mt-6 bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              Talk to a Counsellor
            </Button>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ====================== */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 py-12 md:py-20 grid gap-12 grid-cols-1">
        <div className="flex flex-col gap-20">
          {pairs.map((pair, pIndex) => (
            <div key={pIndex} className="flex flex-col lg:flex-row gap-10">
              {pair.map((program, index) => {
                const isEven = (pIndex * 2 + index) % 2 === 0;
                return (
                  <div
                    key={program.name}
                    className={`flex flex-col lg:flex-row ${!isEven ? "lg:flex-row-reverse" : ""
                      } bg-white dark:bg-[#111] border rounded-xl w-full p-6 items-center gap-6 shadow-lg transition`}
                  >
                    {/* IMAGE */}
                    <div className="w-full lg:w-2/2 flex justify-center">
                      <img
                        src={program.image}
                        alt={`${program.name} course thumbnail`}
                        loading={pIndex === 0 && index === 0 ? "eager" : "lazy"}
                        className="w-full max-w-[600px] rounded-xl shadow-lg object-contain"
                      />
                    </div>
                    {/* TEXT CONTENT */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                      <div className="flex justify-center lg:justify-start items-center gap-3 mb-3">
                        {program.icon}
                        <h2 className="text-2xl md:text-3xl font-semibold">
                          {program.name}
                        </h2>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-base md:text-lg">
                        {program.description}
                      </p>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                        {program.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-200 dark:bg-[#1e2228] text-sm px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-center lg:justify-start gap-3">
                        <Button
                          asChild
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Link
                            href={`/courses/${program.path}`}
                            aria-label={`View ${program.name} program`}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                          >
                            View Program
                          </Link>
                        </Button>
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          aria-label={`Download ${program.name} brochure`}
                          onClick={() => {
                            setSelectedProgram(program.name);
                            setShowBrochure(true);
                          }}
                        >
                          Brochure
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </main>

      {/* BROCHURE MODAL */}
      {showBrochure && (
        <BrochureModal
          open={showBrochure}
          onClose={() => setShowBrochure(false)}
          programName={selectedProgram}
        />
      )}

      <OldFooter />
    </div>
  );
};

export default ProgramsPage;
