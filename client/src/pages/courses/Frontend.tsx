import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import FormModal from "@/components/FormModal";
import BrochureModal from "@/components/BrochureModal";
import { Button } from "@/components/ui/button";
import SEO from "@/seo/SEO";
import { COURSES } from "@/seo/seo-config";

const FrontendDevelopment = ({ onRequestCall }: { onRequestCall: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const courseSEO = COURSES.find((c) => c.path === "/courses/frontend")!;

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const weeks = [
    { title: "Week 1: HTML & CSS Fundamentals", points: ["HTML5 semantic structure", "CSS styling techniques", "Box model & Flexbox"] },
    { title: "Week 2: Advanced CSS & Responsive Design", points: ["Media queries", "Grid layout", "CSS animations"] },
    { title: "Week 3: JavaScript Basics", points: ["Variables, functions, loops", "DOM manipulation", "Event handling"] },
    { title: "Week 4: JavaScript Advanced", points: ["ES6 features", "APIs and Fetch", "Form validation"] },
    { title: "Week 5: React Introduction", points: ["JSX, components", "Props and state", "React hooks"] },
    { title: "Week 6: React Router & Forms", points: ["Routing with React Router", "Handling forms", "Controlled components"] },
    { title: "Week 7: Project Work", points: ["Build a responsive web app", "Use public APIs", "Deploy on GitHub Pages"] },
    { title: "Week 8: Interview Prep & Portfolio", points: ["Mock interviews", "GitHub project showcase", "Resume support"] },
  ];

  return (
    <>
      <style>{`
        @keyframes btn-shimmer {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
        @keyframes btn-pulse-glow-day {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.5); }
          50%       { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
        }
        @keyframes btn-pulse-glow-night {
          0%, 100% { box-shadow: 0 0 8px rgba(139,92,246,0.6), 0 0 0 0 rgba(139,92,246,0.4); }
          50%       { box-shadow: 0 0 20px rgba(139,92,246,0.9), 0 0 0 8px rgba(139,92,246,0); }
        }
        @keyframes night-border-glow {
          0%, 100% { box-shadow: 0 0 6px rgba(99,102,241,0.4); }
          50%       { box-shadow: 0 0 16px rgba(139,92,246,0.7); }
        }
        .btn-apply-day {
          position: relative; overflow: hidden;
          border: 1.5px solid #6366f1 !important;
          color: #6366f1 !important; background: white !important;
          font-weight: 700; transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-apply-day::after {
          content: ''; position: absolute; top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent);
          transform: translateX(-100%);
        }
        .btn-apply-day:hover::after { animation: btn-shimmer 0.5s ease forwards; }
        .btn-apply-day:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(99,102,241,0.25) !important; background: rgba(99,102,241,0.05) !important; }

        .btn-brochure-day {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          color: white !important; border: none !important; font-weight: 700;
          transition: transform 0.2s ease;
          animation: btn-pulse-glow-day 2.5s ease-in-out infinite;
        }
        .btn-brochure-day::after {
          content: ''; position: absolute; top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-100%);
        }
        .btn-brochure-day:hover::after { animation: btn-shimmer 0.5s ease forwards; }
        .btn-brochure-day:hover { transform: translateY(-2px); animation: none; box-shadow: 0 8px 24px rgba(99,102,241,0.5) !important; }

        .btn-apply-night {
          position: relative; overflow: hidden;
          background: transparent !important;
          border: 1.5px solid rgba(139,92,246,0.7) !important;
          color: #a78bfa !important; font-weight: 700; transition: transform 0.2s ease;
          animation: night-border-glow 2.5s ease-in-out infinite;
        }
        .btn-apply-night::after {
          content: ''; position: absolute; top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent);
          transform: translateX(-100%);
        }
        .btn-apply-night:hover::after { animation: btn-shimmer 0.5s ease forwards; }
        .btn-apply-night:hover { transform: translateY(-2px); background: rgba(139,92,246,0.12) !important; animation: none; box-shadow: 0 0 20px rgba(139,92,246,0.5) !important; }

        .btn-brochure-night {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #7c3aed, #6366f1, #4f46e5) !important;
          color: white !important; border: none !important; font-weight: 700;
          transition: transform 0.2s ease;
          animation: btn-pulse-glow-night 2s ease-in-out infinite;
        }
        .btn-brochure-night::after {
          content: ''; position: absolute; top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
        }
        .btn-brochure-night:hover::after { animation: btn-shimmer 0.5s ease forwards; }
        .btn-brochure-night:hover { transform: translateY(-2px); animation: none; box-shadow: 0 0 28px rgba(139,92,246,0.8), 0 8px 24px rgba(99,102,241,0.5) !important; }
      `}</style>

      <div className="min-h-screen bg-qualibytes-background text-white">
        <SEO page={courseSEO} course />
          <h1 className="sr-only">{courseSEO.courseName} Course</h1>
        {/* BANNER */}
        <div className="w-full bg-black">
          <img
            src="/frontend.webp"
            alt="Frontend course banner"
            loading="eager"
            className="w-full h-auto object-contain max-h-[650px] mx-auto"
          />
        </div>

        {/* PAGE CONTENT */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14 pb-28">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              About the Program
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-200">
              This 8-week Frontend Development course provides the essential
              skills needed to design and develop responsive, interactive user
              interfaces.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeks.map((week, i) => (
              <div key={i} className="bg-card text-card-foreground p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold mb-2">{week.title}</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  {week.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex justify-center gap-4 pt-10">
            <Button
              className={isDark ? "btn-apply-night" : "btn-apply-day"}
              onClick={() => setShowForm(true)}
              aria-label={`Apply now for ${courseSEO.courseName}`}
            >
              Apply Now
            </Button>
            <Button
              className={isDark ? "btn-brochure-night" : "btn-brochure-day"}
              onClick={() => setShowBrochure(true)}
              aria-label={`Download ${courseSEO.courseName} brochure`}
            >
              Brochure
            </Button>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div
          className="sm:hidden fixed bottom-0 left-0 w-full p-4 flex gap-4 z-50"
          style={isDark ? {
            background: "linear-gradient(135deg, #0d0d1f 0%, #1a1040 100%)",
            borderTop: "1px solid rgba(139,92,246,0.3)",
            boxShadow: "0 -4px 24px rgba(109,40,217,0.3)",
          } : {
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(99,102,241,0.2)",
            boxShadow: "0 -4px 20px rgba(99,102,241,0.1)",
          }}
        >
          <Button
            className={`w-1/2 ${isDark ? "btn-apply-night" : "btn-apply-day"}`}
            onClick={() => setShowForm(true)}
            aria-label={`Apply now for ${courseSEO.courseName}`}
          >
            Apply Now
          </Button>
          <Button
            className={`w-1/2 ${isDark ? "btn-brochure-night" : "btn-brochure-day"}`}
            onClick={() => setShowBrochure(true)}
            aria-label={`Download ${courseSEO.courseName} brochure`}
          >
            Brochure
          </Button>
        </div>

        <FormModal open={showForm} onOpenChange={setShowForm} />
        <BrochureModal
          open={showBrochure}
          onClose={() => setShowBrochure(false)}
          programName="Frontend Development"
        />
      </div>
    </>
  );
};

export default FrontendDevelopment;