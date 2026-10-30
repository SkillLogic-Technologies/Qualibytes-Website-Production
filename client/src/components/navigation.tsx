import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "../hooks/use-theme";
import { programs } from "@/data/programs-list";
import { Link } from "wouter";

interface NavigationProps {
  onRequestCall?: () => void;
}

// Scroll helper
const scrollTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

export default function Navigation({ onRequestCall }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPrograms, setOpenPrograms] = useState(false);
  const { theme, setTheme } = useTheme();

  /* ---------------- SCROLL LOCK (NEW) ---------------- */
  useEffect(() => {
    if (openPrograms) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openPrograms]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto">
        <div className="h-16 flex items-center justify-between px-4 sm:px-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="/QualibytesLogo.webp"
              alt="Qualibytes Logo"
              loading="eager"
              className="h-12 sm:h-12 object-contain"
            />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              onClick={() => { setOpenPrograms(false); scrollTop(); }}
              className={baseLink}
            >
              HOME
            </Link>
            {/* PROGRAMS (BUTTON + ARROW SEPARATE) */}
            <div className="flex items-center gap-1">
              {/* PROGRAMS BUTTON → ROUTE */}
              <Link
                onClick={() => { setOpenPrograms(false); scrollTop(); }}
                to="/programs"
                className="
                    px-5 py-2
                    text-sm font-medium
                    bg-blue-800 text-white
                    rounded-full
                  "
              >
                PROGRAMS
              </Link>

              {/* ARROW → DROPDOWN TOGGLE */}
              <button
                type="button"
                onClick={() => setOpenPrograms((prev) => !prev)}
                className="p-1"
                aria-label={openPrograms ? "Collapse programs menu" : "Expand programs menu"}
                aria-expanded={openPrograms}
              >
                <ChevronDown
                  className={`
    transition-transform duration-300
    w-5 h-5
    text-neutral-800
    ${openPrograms ? "rotate-180" : "rotate-0"}
  `}
                />
              </button>
            </div>

            <Link
              to="/about"
              onClick={() => { setOpenPrograms(false); scrollTop(); }}
              className={baseLink}
            >
              ABOUT US
            </Link>
            <Link
              to="/contact"
              onClick={() => { setOpenPrograms(false); scrollTop(); }}
              className={baseLink}
            >
              CONTACT
            </Link>
            <Link
              to="/testimonials"
              onClick={() => { setOpenPrograms(false); scrollTop(); }}
              className={baseLink}
            >
              TESTIMONIALS
            </Link>

            <Link
              to="/online-degree-programs"
              onClick={() => { setOpenPrograms(false); scrollTop(); }}
              className={baseLink}
            >
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 rounded-full">
                ONLINE DEGREE
              </Button>
            </Link>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Sun className="h-5 w-5 text-gray-800" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </Button>

            <Button asChild className="bg-blue-600 text-white px-4">
              <a href="tel:+918920942738">Talk to Us</a>
            </Button>

            <Button
              onClick={onRequestCall}
              className="bg-yellow-500 text-black hover:bg-yellow-600 px-4"
            >
              Request a Call
            </Button>
          </div>

          {/* ================= MOBILE ================= */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Sun className="h-5 w-5 text-gray-800" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-6 w-6 text-gray-800" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="
                    w-[80%] h-full overflow-y-auto pb-24
                    bg-white text-gray-900
                    dark:bg-[#0f1115] dark:text-gray-100
                  "
              >
                <MobileMenu setMobileOpen={setMobileOpen} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ================= PROGRAMS FULL PAGE PANEL ================= */}
      {openPrograms && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 top-16 bg-black/40 z-40"
            onClick={() => setOpenPrograms(false)}
          />

          {/* PANEL */}
          <div
            className="
              fixed top-16 left-0 w-screen h-[calc(100vh-64px)]
              bg-white dark:bg-[#0f1115]
              text-gray-900 dark:text-gray-100
              z-50 overflow-y-auto
            "
          >
            <div className="max-w-6xl mx-auto px-10 py-12 pb-24">
              <h3 className="text-sm font-semibold text-gray-500 mb-8">
                OUR PROGRAMS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program) => (
                  <Link
                    key={program.path}
                    to={`/courses/${program.path}`}
                    onClick={() => { setOpenPrograms(false); scrollTop(); }}
                    className="
                        flex items-center gap-5 p-5 rounded-xl
                        border border-gray-200 dark:border-gray-700
                        bg-white dark:bg-[#161a22]
                        hover:shadow-lg transition
                      "
                  >
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      {program.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {program.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Industry-focused program
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

/* ================= MOBILE MENU ================= */
function MobileMenu({ setMobileOpen }: any) {
  return (
    <div className="flex flex-col pt-20 space-y-4 text-lg">
      <a
        href="tel:+918920942738"
        onClick={() => setMobileOpen(false)}
        className="mt-4 block text-center bg-blue-600 text-white py-3 rounded-lg font-medium"
      >
        Talk to Us
      </a>

      <MobileLink label="HOME" href="/" onClick={() => { setMobileOpen(false); scrollTop(); }} />
      <MobileLink
        label="ABOUT US"
        href="/about"
        onClick={() => { setMobileOpen(false); scrollTop(); }}
      />
      <MobileLink
        label="CONTACT"
        href="/contact"
        onClick={() => { setMobileOpen(false); scrollTop(); }}
      />
      <MobileLink
        label="TESTIMONIALS"
        href="/testimonials"
        onClick={() => { setMobileOpen(false); scrollTop(); }}
      />

      <Link
        to="/online-degree-programs"
        onClick={() => { setMobileOpen(false); scrollTop(); }}
        className="mt-2 block text-center bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold"
      >
        Online Degree
      </Link>

      <Link
        to="/programs"
        onClick={() => { setMobileOpen(false); scrollTop(); }}
        className="w-full text-center px-5 py-3 text-sm font-medium rounded-lg bg-black text-white dark:bg-white dark:text-black"
      >
        PROGRAMS
      </Link>

      <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
        {programs.map((program) => (
          <Link
            key={program.path}
            to={`/courses/${program.path}`}
            onClick={() => { setMobileOpen(false); scrollTop(); }}
            className="block py-1 text-gray-700 dark:text-gray-300"
          >
            {program.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileLink({ href, label, onClick }: any) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="
  text-gray-800 dark:text-gray-200
  hover:text-black dark:hover:text-white
"
    >
      {label}
    </Link>
  );
}

/* ================= SHARED LINK STYLE ================= */
const baseLink = `
  text-gray-700
  hover:text-black
  text-sm font-medium transition
`;