// App.tsx
import { useEffect, useState, Suspense, lazy, type ComponentType } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./hooks/use-theme";

// Layout
import Navigation from "@/components/navigation";
import TopTicker from "@/components/TopTicker";
import BottomHelpBar from "@/components/BottomHelpBar";
import ScrollToTop from "@/components/ScrollToTop";

// Pages — every route below "/" is React.lazy()'d for browser code-splitting
// (each becomes its own chunk, fetched only when that route is visited).
// None of this can be rendered by the prerender script's synchronous
// renderToString() (lazy() needs an async resolve/Suspense boundary that
// renderToString doesn't wait for) — scripts/prerender.tsx instead imports
// every page a second time itself, via statically-imported components in
// scripts/prerender-pages.tsx (a Node-only module, never part of Vite's
// client bundle), and passes the *currently-rendering* route's eager
// component in via the pageOverride prop below. This generalizes the same
// pattern already used for Home (home.server.tsx + homeOverride) to every
// other route instead of writing 27 near-duplicate *.server.tsx twins.
import HomeBrowser from "@/pages/home";
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const ProgramsPage = lazy(() => import("@/pages/programs"));
const TestimonialsPage = lazy(() => import("@/pages/testimonials"));
import NotFound from "@/pages/not-found";

// Courses
const DevOps = lazy(() => import("@/pages/courses/DevOps"));
const AIML = lazy(() => import("@/pages/courses/AIML"));
const ManualTesting = lazy(() => import("@/pages/courses/ManualTesting"));
const AutomationTesting = lazy(() => import("@/pages/courses/AutomationTesting"));
const JavaFullStack = lazy(() => import("@/pages/courses/JavaFullStack"));
const PHPFullStack = lazy(() => import("@/pages/courses/PHPFullStack"));
const Frontend = lazy(() => import("@/pages/courses/Frontend"));
const Backend = lazy(() => import("@/pages/courses/Backend"));
const MERN = lazy(() => import("@/pages/courses/MERN"));
const BusinessAnalyst = lazy(() => import("@/pages/courses/BusinessAnalyst"));
const MedicalBilling = lazy(() => import("@/pages/courses/MedicalBilling"));
const USIT = lazy(() => import("@/pages/courses/USIT"));
const Android = lazy(() => import("@/pages/courses/Android"));
const Cybersecurity = lazy(() => import("@/pages/courses/Cybersecurity"));
const DataAnalytics = lazy(() => import("@/pages/courses/DataAnalytics"));
const DataScience = lazy(() => import("@/pages/courses/DataScience"));
const FrontendDevelopment = lazy(() => import("@/pages/courses/FrontendDevelopment"));
const IOSDevelopment = lazy(() => import("@/pages/courses/IOSDevelopment"));
const MERNFullStack = lazy(() => import("@/pages/courses/MERNFullStack"));
const PythonFullStack = lazy(() => import("@/pages/courses/PythonFullStack"));
const SoftwareTesting = lazy(() => import("@/pages/courses/SoftwareTesting"));

// Extra
const OnlineDegree = lazy(() => import("@/pages/OnlineDegree"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));

// Popup
import ContactFormPopup from "@/components/ContactFormPopup";
import { useLocation } from "wouter";

export interface AppProps {
  // Lets scripts/prerender.tsx substitute its own Node-only, statically-
  // imported component for whichever route is currently being prerendered
  // (home.server.tsx for "/", scripts/prerender-pages.tsx's exports for
  // everything else) without App.tsx ever statically importing any of
  // those modules itself — see the Pages comment above. Unused in the
  // browser build (main.tsx renders <App /> with no props), where every
  // route always uses its lazy()-wrapped component instead.
  homeOverride?: ComponentType;
  pageOverride?: ComponentType<{ onRequestCall: () => void }>;
}

export default function App({ homeOverride: HomeOverride, pageOverride: PageOverride }: AppProps = {}) {
  const [showForm, setShowForm] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  // Global event to open popup
  useEffect(() => {
    const handler = () => setShowForm(true);
    window.addEventListener("request-call", handler);
    return () => window.removeEventListener("request-call", handler);
  }, []);

  const [location] = useLocation();

  useEffect(() => {
    if (location === "/") {
      const onScroll = () => {
        setShowFooter(window.scrollY > 100);
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }

    setShowFooter(true);
  }, [location]);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          {/* NORMAL HEADER FLOW */}
          <TopTicker />

          <div className="sticky top-0 z-[9999] bg-white shadow">
            <Navigation onRequestCall={() => setShowForm(true)} />
          </div>

          <main>
            {/* 🔁 ROUTES */}
            {/* Suspense fallback is only ever visible in the browser, only
                for the instant between a route's chunk being requested and
                arriving — modulepreload (see client/index.html head
                injection) and the prefetch-on-idle/hover added to
                Navigation/course-card links mean this almost never actually
                paints on a real navigation. Prerendering never sees it:
                PageOverride (when set) always renders synchronously, no
                lazy()/Suspense involved. */}
            <Suspense fallback={null}>
              <Switch>
                <Route
                  path="/"
                  component={() =>
                    HomeOverride ? (
                      <HomeOverride />
                    ) : (
                      <HomeBrowser onRequestCall={() => setShowForm(true)} />
                    )
                  }
                />

                <Route
                  path="/about"
                  component={() => {
                    const C = PageOverride ?? About;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/contact"
                  component={() => {
                    const C = PageOverride ?? Contact;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/programs"
                  component={() => {
                    const C = PageOverride ?? ProgramsPage;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/testimonials"
                  component={() => {
                    const C = PageOverride ?? TestimonialsPage;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/devops"
                  component={() => {
                    const C = PageOverride ?? DevOps;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/aiml"
                  component={() => {
                    const C = PageOverride ?? AIML;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/manual-testing"
                  component={() => {
                    const C = PageOverride ?? ManualTesting;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/automation-testing"
                  component={() => {
                    const C = PageOverride ?? AutomationTesting;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/java-fullstack"
                  component={() => {
                    const C = PageOverride ?? JavaFullStack;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/php-fullstack"
                  component={() => {
                    const C = PageOverride ?? PHPFullStack;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/frontend"
                  component={() => {
                    const C = PageOverride ?? Frontend;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/backend"
                  component={() => {
                    const C = PageOverride ?? Backend;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/mern"
                  component={() => {
                    const C = PageOverride ?? MERN;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/business-analyst"
                  component={() => {
                    const C = PageOverride ?? BusinessAnalyst;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/medical-billing"
                  component={() => {
                    const C = PageOverride ?? MedicalBilling;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/usit"
                  component={() => {
                    const C = PageOverride ?? USIT;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/android"
                  component={() => {
                    const C = PageOverride ?? Android;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/cybersecurity"
                  component={() => {
                    const C = PageOverride ?? Cybersecurity;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/data-analytics"
                  component={() => {
                    const C = PageOverride ?? DataAnalytics;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/data-science"
                  component={() => {
                    const C = PageOverride ?? DataScience;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/frontend-development"
                  component={() => {
                    const C = PageOverride ?? FrontendDevelopment;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/ios-development"
                  component={() => {
                    const C = PageOverride ?? IOSDevelopment;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/mern-fullstack"
                  component={() => {
                    const C = PageOverride ?? MERNFullStack;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/python-fullstack"
                  component={() => {
                    const C = PageOverride ?? PythonFullStack;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/courses/software-testing"
                  component={() => {
                    const C = PageOverride ?? SoftwareTesting;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/online-degree-programs"
                  component={() => {
                    const C = PageOverride ?? OnlineDegree;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route
                  path="/privacy-policy"
                  component={() => {
                    const C = PageOverride ?? PrivacyPolicy;
                    return <C onRequestCall={() => setShowForm(true)} />;
                  }}
                />

                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </main>
          {/* 🟢 CONTACT POPUP (always on top) */}
          <ContactFormPopup open={showForm} onOpenChange={setShowForm} />

          {showFooter && (
            <BottomHelpBar onRequestCall={() => setShowForm(true)} />
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
