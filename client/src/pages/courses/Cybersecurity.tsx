import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import FormModal from "@/components/FormModal";
import BrochureModal from "@/components/BrochureModal";
import { Button } from "@/components/ui/button";
import SEO from "@/seo/SEO";
import { COURSES } from "@/seo/seo-config";

interface PageProps {
  onRequestCall: () => void;
}

const Cybersecurity = ({ onRequestCall }: PageProps) => {
  const [showForm, setShowForm] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const courseSEO = COURSES.find((c) => c.path === "/courses/cybersecurity")!;

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const weeks = [
    { title: "Week 1: Cyber Security Fundamentals", points: ["Security Basics", "Types of Attacks", "CIA Triad"] },
    { title: "Week 2: Networking Basics", points: ["TCP/IP", "Ports & Protocols", "Firewalls & IDS"] },
    { title: "Week 3: Linux for Security", points: ["Linux Commands", "Bash Scripting", "File Permissions"] },
    { title: "Week 4: Ethical Hacking", points: ["Reconnaissance", "Scanning", "Enumeration"] },
    { title: "Week 5: Penetration Testing Tools", points: ["Nmap", "Metasploit", "Burp Suite"] },
    { title: "Week 6: Web App Security", points: ["OWASP Top 10", "SQL Injection", "XSS & CSRF"] },
    { title: "Week 7: Cloud & Network Security", points: ["Cloud Security Basics", "VPN", "Zero Trust"] },
    { title: "Week 8: Final Project & Job Prep", points: ["Real Case Studies", "Hacking Simulation", "Resume + Interview Prep"] },
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
        <div className="w-full bg-black">
          <img
            src="/cybersecurity.webp"
            alt="Cyber Security course banner"
            loading="eager"
            className="w-full h-auto object-contain max-h-[650px] mx-auto"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14 pb-28">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              About the Program
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-200">
              This Cyber Security course teaches you network security, ethical
              hacking, penetration testing, vulnerability scanning, and how to
              protect systems from cyber attacks.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeks.map((week, i) => (
              <div key={i} className="bg-card text-card-foreground p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">{week.title}</h3>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
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
          programName="Cyber Security"
        />
      </div>
    </>
  );
};

export default Cybersecurity;