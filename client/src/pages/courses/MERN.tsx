import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import FormModal from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import SEO from "@/seo/SEO";
import { COURSES } from "@/seo/seo-config";

//  PROPS
interface CourseProps {
  onRequestCall: () => void;
}

const BackendMERN = ({ onRequestCall }: CourseProps) => {
  const [showForm, setShowForm] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const courseSEO = COURSES.find((c) => c.path === "/courses/mern")!;

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const weeks = [
    {
      title: "Week 1: JavaScript Refresher",
      points: ["Functions, scopes, ES6", "Async/await, promises"],
    },
    {
      title: "Week 2: Node.js Fundamentals",
      points: ["Core modules", "npm & scripts", "File system"],
    },
    {
      title: "Week 3: Express.js Basics",
      points: ["Routing", "Middleware", "Request/response cycle"],
    },
    {
      title: "Week 4: MongoDB & Mongoose",
      points: ["CRUD operations", "Schema & models", "Database design"],
    },
    {
      title: "Week 5: Authentication & JWT",
      points: ["User login/register", "JWT generation & middleware"],
    },
    {
      title: "Week 6: REST APIs & Postman",
      points: ["RESTful principles", "Testing with Postman", "Error handling"],
    },
    {
      title: "Week 7: Advanced CRUD & Validation",
      points: ["Populate, relations", "Validation & sanitization"],
    },
    {
      title: "Week 8: File Uploads & Image Handling",
      points: ["Multer setup", "Cloudinary integration"],
    },
    {
      title: "Week 9: Roles & Deployment",
      points: ["Admin/user roles", "Deploy on Render / Railway"],
    },
    {
      title: "Week 10: Capstone Project & Interview Prep",
      points: [
        "Build & present REST API project",
        "Mock interview + GitHub portfolio",
      ],
    },
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
            src="/mern-backend.jpeg"
            alt="MERN Backend course banner"
            loading="eager"
            className="w-full h-auto object-contain max-h-[650px] mx-auto"
          />
        </div>

        {/* CONTENT */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28 space-y-14">
          {/* ABOUT SECTION */}
          <section>
            <h2 className="text-2xl text-gray-900 dark:text-white font-semibold mb-3">
              About the Program
            </h2>
            <p className="text-gray-900 dark:text-white text-lg leading-relaxed">
              This backend-focused MERN stack course takes you from JavaScript
              fundamentals to building scalable REST APIs with Node.js, Express,
              and MongoDB. Ideal for learners dedicating 5–7 hours/week.
            </p>
          </section>

          {/* WEEKLY MODULES */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeks.map((week, index) => (
              <div
                key={index}
                className="bg-card text-card-foreground p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">{week.title}</h3>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                  {week.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* DESKTOP CTA */}
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
              onClick={onRequestCall}
            >
              Request a Call
            </Button>
          </div>
        </div>

        {/* MOBILE CTA (FIXED) */}
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
            onClick={onRequestCall}
          >
            Request a Call
          </Button>
        </div>

        {/* FORM MODAL */}
        <FormModal open={showForm} onOpenChange={setShowForm} />
      </div>
    </>
  );
};

export default BackendMERN;