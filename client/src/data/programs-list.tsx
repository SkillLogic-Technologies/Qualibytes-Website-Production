import type React from "react";
import {
  BrainCog,
  Code,
  Network,
  FlaskConical,
  BarChart4,
  Shield,
} from "lucide-react";

/**
 * Shared programs-menu data — used by both Navigation (always loaded, part
 * of the global chrome in App.tsx) and the /programs page itself (lazy-
 * loaded). Kept in its own module, separate from pages/programs.tsx: when
 * this lived inside programs.tsx, Navigation's static import of `programs`
 * pulled the whole programs.tsx module (including its page component) into
 * the main bundle, defeating that page's React.lazy() code-splitting —
 * Rollup can't split one module into two chunks depending on who's asking.
 */
export interface Program {
  name: string;
  path: string;
  icon: React.ReactNode;
  image: string;
  description: string;
  tags: string[];
}

export const programs: Program[] = [
  {
    name: "DevOps",
    path: "devops",
    icon: <Network className="h-10 w-10 text-blue-500" />,
    image: "thumbnail/devops.webp",
    description:
      "Master CI/CD, Docker, Kubernetes, AWS, and automation in this hands-on DevOps training.",
    tags: ["Self-paced", "Real Projects", "Lifetime Access"],
  },

  {
    name: "Data Analytics",
    path: "data-analytics",
    icon: <BarChart4 className="h-10 w-10 text-blue-500" />,
    image: "thumbnail/data_analytics.webp",
    description: "Master Excel, SQL, Power BI & real-world analytics.",
    tags: ["Excel", "SQL", "Power BI"],
  },

  {
    name: "Data Science",
    path: "data-science",
    icon: <BrainCog className="h-10 w-10 text-blue-500" />,
    image: "thumbnail/data_science.webp",
    description: "Learn Python, ML, Deep Learning & real-world Data Science.",
    tags: ["Python", "ML", "Data Visualization"],
  },

  {
    name: "Software Testing (Manual+Automation)",
    path: "software-testing",
    icon: <FlaskConical className="h-10 w-10 text-blue-500" />,
    image: "thumbnail/software_testing.webp",
    description:
      "Learn Manual Testing + Automation, API, Database & Performance testing.",
    tags: ["Manual", "Automation", "Selenium"],
  },

  {
    name: "Manual Testing",
    path: "manual-testing",
    icon: <FlaskConical className="h-10 w-10 text-blue-500" />,
    image: "/thumbnail/manual.webp",
    description:
      "Learn software testing fundamentals, techniques, test cases, bug reporting.",
    tags: ["Bug Reports", "Test Cases", "Foundational"],
  },

  {
    name: "Automation Testing",
    path: "automation-testing",
    icon: <FlaskConical className="h-10 w-10 text-blue-500" />,
    image: "/thumbnail/automation.webp",
    description:
      "Automate Web & API tests using Selenium, Maven, TestNG, real-world projects.",
    tags: ["Selenium", "Automation", "API Testing"],
  },

  {
    name: "AI/ML",
    path: "aiml",
    icon: <BrainCog className="h-10 w-10 text-blue-500" />,
    image: "/thumbnail/ai&ml.webp",
    description:
      "Learn Machine Learning, Python, TensorFlow, PyTorch and deploy AI models.",
    tags: ["Python", "TensorFlow", "Project Based"],
  },

  {
    name: "Java Full Stack",
    path: "java-fullstack",
    icon: <Code className="h-10 w-10 text-blue-500" />,
    image: "/thumbnail/java.webp",
    description:
      "Learn Java, Spring Boot, REST APIs & React. Become a full-stack developer.",
    tags: ["Java", "Spring Boot", "Full Stack"],
  },



  {
    name: "Android Development",
    path: "android",
    icon: <Code className="h-10 w-10 text-blue-500" />,
    image: "/thumbnail/android.webp",
    description:
      "Learn Android Development using Java/Kotlin, Android Studio, Jetpack, APIs & Firebase.",
    tags: ["Kotlin", "Java", "Firebase"],
  },

  {
    name: "iOS App Development",
    path: "ios-development",
    icon: <Code className="h-10 w-10 text-blue-500" />,
    image: "thumbnail/ios.webp",
    description: "Learn Swift, SwiftUI, Xcode & build real iOS applications.",
    tags: ["Swift", "Xcode", "SwiftUI"],
  },


  {
    name: "Frontend Development",
    path: "frontend-development",
    icon: <Code className="h-10 w-10 text-blue-500" />,
    image: "thumbnail/frontend.webp",
    description:
      "Learn HTML, CSS, JS, React, Tailwind, APIs & modern UI development.",
    tags: ["React", "JavaScript", "Tailwind CSS"],
  },

  {
    name: "Backend Development",
    path: "backend",
    icon: <Code className="h-10 w-10 text-blue-500" />,
    image: "/thumbnail/backend.webp",
    description:
      "Learn Backend Development using Node.js, Express, Databases, APIs, Authentication, Deployment.",
    tags: ["Node.js", "Express", "MongoDB"],
  },

  {
    name: "Cyber Security",
    path: "cybersecurity",
    icon: <Shield className="h-10 w-10 text-blue-500" />,
    image: "/thumbnail/cybersecurity.webp",
    description:
      "Learn ethical hacking, penetration testing & network security.",
    tags: ["Ethical Hacking", "Network Security", "Tools"],
  },




  {
    name: "MERN Full Stack",
    path: "mern-fullstack",
    icon: <Code className="h-10 w-10 text-blue-500" />,
    image: "thumbnail/mern.webp",
    description:
      "Learn MongoDB, Express, React, Node & full-stack project building.",
    tags: ["React", "Node.js", "MongoDB"],
  },

  {
    name: "Python Full Stack",
    path: "python-fullstack",
    icon: <Code className="h-10 w-10 text-blue-500" />,
    image: "thumbnail/python.webp",
    description:
      "Learn Python, Django/Flask, REST APIs & full stack development.",
    tags: ["Python", "Django", "Flask"],
  },
  {
    name: "Business Analyst",
    path: "business-analyst",
    icon: <BarChart4 className="h-10 w-10 text-blue-500" />,
    image: "/thumbnail/business_analytics.webp",
    description:
      "Master BRDs, Jira, requirement gathering & stakeholder management.",
    tags: ["Jira", "BRD", "Stakeholder Mgmt"],
  },
];
