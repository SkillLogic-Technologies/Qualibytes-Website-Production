import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import FormModal from "@/components/FormModal";
import BrochureModal from "@/components/BrochureModal";
import { Button } from "@/components/ui/button";
import SEO from "@/seo/SEO";
import { COURSES } from "@/seo/seo-config";

const AIML = ({ onRequestCall }: { onRequestCall: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const courseSEO = COURSES.find((c) => c.path === "/courses/aiml")!;

  // Detect dark mode
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const weeks = [
    { title: "Week 1: Python for AI", points: ["Python basics & libraries", "NumPy, Pandas introduction"] },
    { title: "Week 2: Math for ML", points: ["Linear algebra, probability", "Basic statistics"] },
    { title: "Week 3: Data Preprocessing", points: ["Cleaning, normalization", "Exploratory data analysis"] },
    { title: "Week 4: Supervised Learning", points: ["Regression & classification", "Model evaluation"] },
    { title: "Week 5: Unsupervised Learning", points: ["Clustering & dimensionality reduction", "K-Means, PCA"] },
    { title: "Week 6: Model Validation", points: ["Cross-validation", "Hyperparameter tuning"] },
    { title: "Week 7: Deep Learning Basics", points: ["Neural networks intro", "Activation functions"] },
    { title: "Week 8: CNNs & Computer Vision", points: ["Convolutional layers", "Image classification"] },
    { title: "Week 9: NLP & Text Processing", points: ["Tokenization, TF-IDF", "Text classification"] },
    { title: "Week 10: Model Deployment", points: ["Flask API for ML models", "Using Docker for serving"] },
    { title: "Week 11: AI Ethics & Explainability", points: ["Bias & fairness in models", "Model interpretation"] },
    { title: "Week 12: Capstone & Interview Prep", points: ["Final project demo", "Mock interviews & resume prep"] },
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

        /* ── DAY MODE BUTTONS ── */
        .aiml-btn-apply-day {
          position: relative;
          overflow: hidden;
          border: 1.5px solid #6366f1 !important;
          color: #6366f1 !important;
          background: white !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-weight: 700;
        }
        .aiml-btn-apply-day::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent);
          transform: translateX(-100%);
        }
        .aiml-btn-apply-day:hover::after { animation: btn-shimmer 0.5s ease forwards; }
        .aiml-btn-apply-day:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.25) !important;
          background: rgba(99,102,241,0.05) !important;
        }

        .aiml-btn-brochure-day {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          color: white !important;
          border: none !important;
          font-weight: 700;
          transition: transform 0.2s ease;
          animation: btn-pulse-glow-day 2.5s ease-in-out infinite;
        }
        .aiml-btn-brochure-day::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-100%);
        }
        .aiml-btn-brochure-day:hover::after { animation: btn-shimmer 0.5s ease forwards; }
        .aiml-btn-brochure-day:hover {
          transform: translateY(-2px);
          animation: none;
          box-shadow: 0 8px 24px rgba(99,102,241,0.5) !important;
        }

        /* ── NIGHT MODE BUTTONS ── */
        .aiml-btn-apply-night {
          position: relative;
          overflow: hidden;
          background: transparent !important;
          border: 1.5px solid rgba(139,92,246,0.7) !important;
          color: #a78bfa !important;
          font-weight: 700;
          transition: transform 0.2s ease;
          animation: night-border-glow 2.5s ease-in-out infinite;
        }
        .aiml-btn-apply-night::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent);
          transform: translateX(-100%);
        }
        .aiml-btn-apply-night:hover::after { animation: btn-shimmer 0.5s ease forwards; }
        .aiml-btn-apply-night:hover {
          transform: translateY(-2px);
          background: rgba(139,92,246,0.12) !important;
          animation: none;
          box-shadow: 0 0 20px rgba(139,92,246,0.5) !important;
        }

        .aiml-btn-brochure-night {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #7c3aed, #6366f1, #4f46e5) !important;
          color: white !important;
          border: none !important;
          font-weight: 700;
          transition: transform 0.2s ease;
          animation: btn-pulse-glow-night 2s ease-in-out infinite;
        }
        .aiml-btn-brochure-night::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
        }
        .aiml-btn-brochure-night:hover::after { animation: btn-shimmer 0.5s ease forwards; }
        .aiml-btn-brochure-night:hover {
          transform: translateY(-2px);
          animation: none;
          box-shadow: 0 0 28px rgba(139,92,246,0.8), 0 8px 24px rgba(99,102,241,0.5) !important;
        }
      `}</style>

      <div className="min-h-screen bg-qualibytes-background text-white">
        <SEO page={courseSEO} course />

          <h1 className="sr-only">{courseSEO.courseName} Course</h1>
        {/* ================== BANNER ================== */}
        <div className="w-full bg-black">
          <img
            src="/ai&ml.webp"
            alt="AI/ML course banner"
            loading="eager"
            className="w-full h-auto object-contain max-h-[650px] mx-auto"
          />
        </div>

        {/* ================== PAGE CONTENT ================== */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14 pb-28">

          {/* About Section */}
          <section>
            <h2 className="text-2xl text-gray-900 dark:text-white font-semibold mb-3">
              About the Program
            </h2>
            <p className="text-gray-900 dark:text-white text-lg leading-relaxed">
              This course offers a structured 12-week journey into Artificial
              Intelligence and Machine Learning. You'll gain strong foundations
              in Python, data preprocessing, model training, deployment, and
              real-world AI/ML applications.
            </p>
          </section>

          {/* Weekly Modules */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeks.map((week, index) => (
              <div key={index} className="bg-card text-card-foreground p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">{week.title}</h3>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                  {week.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex justify-center gap-4 pt-10">
            <Button
              className={isDark ? "aiml-btn-apply-night" : "aiml-btn-apply-day"}
              onClick={() => setShowForm(true)}
              aria-label={`Apply now for ${courseSEO.courseName}`}
            >
              Apply Now
            </Button>
            <Button
              className={isDark ? "aiml-btn-brochure-night" : "aiml-btn-brochure-day"}
              onClick={() => setShowBrochure(true)}
              aria-label={`Download ${courseSEO.courseName} brochure`}
            >
              Brochure
            </Button>
          </div>
        </div>

        {/* MOBILE FIXED BOTTOM BUTTONS */}
        <div
          className="sm:hidden fixed bottom-0 left-0 w-full p-4 flex justify-between gap-4 z-50"
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
            className={`w-1/2 ${isDark ? "aiml-btn-apply-night" : "aiml-btn-apply-day"}`}
            onClick={() => setShowForm(true)}
            aria-label={`Apply now for ${courseSEO.courseName}`}
          >
            Apply Now
          </Button>
          <Button
            className={`w-1/2 ${isDark ? "aiml-btn-brochure-night" : "aiml-btn-brochure-day"}`}
            onClick={() => setShowBrochure(true)}
            aria-label={`Download ${courseSEO.courseName} brochure`}
          >
            Brochure
          </Button>
        </div>

        {/* Modals */}
        <FormModal open={showForm} onOpenChange={setShowForm} />
        <BrochureModal
          open={showBrochure}
          onClose={() => setShowBrochure(false)}
          programName="AI/ML"
        />
      </div>
    </>
  );
};

export default AIML;