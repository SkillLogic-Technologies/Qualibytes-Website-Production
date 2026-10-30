/**
 * Node-only, statically-imported twin of App.tsx's lazy()-wrapped page
 * list. Used exclusively by scripts/prerender.tsx — never processed by
 * Vite, never part of the browser bundle (the build script runs `vite
 * build` and this script as two entirely separate steps; see package.json
 * "build"). Static imports here are what let renderToString() render each
 * route's full real component synchronously, without needing a
 * Suspense-aware renderer.
 *
 * Keyed by the exact path string used in App.tsx's <Route path="..."> and
 * scripts/prerender.tsx's route list (seo-config.ts's PAGES/COURSES paths).
 */
import type { ComponentType } from "react";

import About from "../client/src/pages/about";
import Contact from "../client/src/pages/contact";
import ProgramsPage from "../client/src/pages/programs";
import TestimonialsPage from "../client/src/pages/testimonials";

import DevOps from "../client/src/pages/courses/DevOps";
import AIML from "../client/src/pages/courses/AIML";
import ManualTesting from "../client/src/pages/courses/ManualTesting";
import AutomationTesting from "../client/src/pages/courses/AutomationTesting";
import JavaFullStack from "../client/src/pages/courses/JavaFullStack";
import PHPFullStack from "../client/src/pages/courses/PHPFullStack";
import Frontend from "../client/src/pages/courses/Frontend";
import Backend from "../client/src/pages/courses/Backend";
import MERN from "../client/src/pages/courses/MERN";
import BusinessAnalyst from "../client/src/pages/courses/BusinessAnalyst";
import MedicalBilling from "../client/src/pages/courses/MedicalBilling";
import USIT from "../client/src/pages/courses/USIT";
import Android from "../client/src/pages/courses/Android";
import Cybersecurity from "../client/src/pages/courses/Cybersecurity";
import DataAnalytics from "../client/src/pages/courses/DataAnalytics";
import DataScience from "../client/src/pages/courses/DataScience";
import FrontendDevelopment from "../client/src/pages/courses/FrontendDevelopment";
import IOSDevelopment from "../client/src/pages/courses/IOSDevelopment";
import MERNFullStack from "../client/src/pages/courses/MERNFullStack";
import PythonFullStack from "../client/src/pages/courses/PythonFullStack";
import SoftwareTesting from "../client/src/pages/courses/SoftwareTesting";

import OnlineDegree from "../client/src/pages/OnlineDegree";
import PrivacyPolicy from "../client/src/pages/privacy-policy";

type PageComponent = ComponentType<{ onRequestCall: () => void }>;

export const PRERENDER_PAGES: Record<string, PageComponent> = {
  "/about": About,
  "/contact": Contact,
  "/programs": ProgramsPage,
  "/testimonials": TestimonialsPage,
  "/courses/devops": DevOps,
  "/courses/aiml": AIML,
  "/courses/manual-testing": ManualTesting,
  "/courses/automation-testing": AutomationTesting,
  "/courses/java-fullstack": JavaFullStack,
  "/courses/php-fullstack": PHPFullStack,
  "/courses/frontend": Frontend,
  "/courses/backend": Backend,
  "/courses/mern": MERN,
  "/courses/business-analyst": BusinessAnalyst,
  "/courses/medical-billing": MedicalBilling,
  "/courses/usit": USIT,
  "/courses/android": Android,
  "/courses/cybersecurity": Cybersecurity,
  "/courses/data-analytics": DataAnalytics,
  "/courses/data-science": DataScience,
  "/courses/frontend-development": FrontendDevelopment,
  "/courses/ios-development": IOSDevelopment,
  "/courses/mern-fullstack": MERNFullStack,
  "/courses/python-fullstack": PythonFullStack,
  "/courses/software-testing": SoftwareTesting,
  "/online-degree-programs": OnlineDegree,
  "/privacy-policy": PrivacyPolicy,
};

/**
 * Matching source-file path (relative to Vite's `root: "client"`, exactly
 * as App.tsx's lazy(() => import("@/pages/...")) specifiers resolve, and
 * exactly as dist/public/.vite/manifest.json keys its entries) for each
 * route above — lets the prerender script look up that route's own built
 * chunk filename to add a per-route modulepreload hint.
 */
export const PAGE_SOURCE_PATHS: Record<string, string> = {
  "/about": "src/pages/about.tsx",
  "/contact": "src/pages/contact.tsx",
  "/programs": "src/pages/programs.tsx",
  "/testimonials": "src/pages/testimonials.tsx",
  "/courses/devops": "src/pages/courses/DevOps.tsx",
  "/courses/aiml": "src/pages/courses/AIML.tsx",
  "/courses/manual-testing": "src/pages/courses/ManualTesting.tsx",
  "/courses/automation-testing": "src/pages/courses/AutomationTesting.tsx",
  "/courses/java-fullstack": "src/pages/courses/JavaFullStack.tsx",
  "/courses/php-fullstack": "src/pages/courses/PHPFullStack.tsx",
  "/courses/frontend": "src/pages/courses/Frontend.tsx",
  "/courses/backend": "src/pages/courses/Backend.tsx",
  "/courses/mern": "src/pages/courses/MERN.tsx",
  "/courses/business-analyst": "src/pages/courses/BusinessAnalyst.tsx",
  "/courses/medical-billing": "src/pages/courses/MedicalBilling.tsx",
  "/courses/usit": "src/pages/courses/USIT.tsx",
  "/courses/android": "src/pages/courses/Android.tsx",
  "/courses/cybersecurity": "src/pages/courses/Cybersecurity.tsx",
  "/courses/data-analytics": "src/pages/courses/DataAnalytics.tsx",
  "/courses/data-science": "src/pages/courses/DataScience.tsx",
  "/courses/frontend-development": "src/pages/courses/FrontendDevelopment.tsx",
  "/courses/ios-development": "src/pages/courses/IOSDevelopment.tsx",
  "/courses/mern-fullstack": "src/pages/courses/MERNFullStack.tsx",
  "/courses/python-fullstack": "src/pages/courses/PythonFullStack.tsx",
  "/courses/software-testing": "src/pages/courses/SoftwareTesting.tsx",
  "/online-degree-programs": "src/pages/OnlineDegree.tsx",
  "/privacy-policy": "src/pages/privacy-policy.tsx",
};
