/**
 * Qualibytes – central SEO config (single source of truth)
 * ---------------------------------------------------------
 */

export const SITE = {
  name: "Qualibytes IT Academy",
  shortName: "Qualibytes",
  url: "https://qualibytes.com",
  logo: "https://qualibytes.com/logo.png", // TODO: actual logo path (min 112x112, square PNG)
  ogImage: "https://qualibytes.com/og-image.jpg", // TODO: 1200x630 banner banayein
  locale: "en_IN",
  foundingYear: "2020",
  founders: ["Akshit Giri", "Deepanshu Giri"],
  phone: "+91-XXXXXXXXXX", // TODO
  email: "info@qualibytes.com", // TODO
  whatsapp: "+91-XXXXXXXXXX", // TODO
  address: {
    streetAddress: "Ground Floor, B-91, B Block, Sector 2",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  geo: { latitude: 28.5847, longitude: 77.3156 }, // TODO
  openingHours: "Mo-Sa 10:00-19:00", // TODO
  stats: {
    studentsPlaced: "2000+",
    hiringPartners: "50+",
  },
  emiFrom: 2000,
  sameAs: [
    "https://www.instagram.com/qualibytes",
    "https://www.linkedin.com/company/qualibytes",
    "https://x.com/qualibytes",
    "https://www.youtube.com/@qualibytes",
  ],
};

export type FAQ = { q: string; a: string };

export type PageSEO = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noindex?: boolean;
  faqs?: FAQ[];
  /**
   * Set when this page is a duplicate of another page that should be
   * treated as the canonical version (e.g. two pages for the same course).
   * <SEO/> uses this path to build the canonical URL instead of the page's
   * own path, and the sitemap/llms.txt generators skip entries that set
   * this — the canonical page is listed instead.
   */
  canonicalPath?: string;
};

export type CourseSEO = PageSEO & {
  courseName: string;
  skills: string[];
  /** ISO 8601, e.g. "P4M" = 4 months. TODO: confirm per course */
  duration?: string;
  /** Full fee in INR, TODO: confirm */
  price?: number;
};

/* ---------- Common FAQs ---------- */
export const COMMON_FAQS: FAQ[] = [
  {
    q: "What is the fee at Qualibytes IT Academy?",
    a: `Qualibytes offers flexible EMIs starting at ₹${SITE.emiFrom.toLocaleString("en-IN")} per month with no hidden fees, so students can learn now and pay monthly.`,
  },
  {
    q: "Are Qualibytes classes live or recorded?",
    a: "All programs are taught through live interactive classes with industry experts, plus weekend mock interviews and doubt-clearing sessions.",
  },
  {
    q: "Does Qualibytes provide placement support?",
    a: "Yes. Learners get interview preparation, mock interviews, placement support and direct job referrals through the Qualibytes hiring network.",
  },
  {
    q: "Will I get an internship certificate?",
    a: "Yes. Every learner who completes the program and its real industry projects receives an internship certificate from Qualibytes.",
  },
  {
    q: "Who can join Qualibytes courses?",
    a: "Programs are designed for students, freshers and working professionals who want to start or switch to an IT career.",
  },
  {
    q: "What makes Qualibytes different from other IT training institutes?",
    a: "Qualibytes started in 2020 as a working IT company, so learners work on live client projects with real development, testing and deployment workflows instead of dummy assignments.",
  },
  {
    q: "Where is Qualibytes IT Academy located?",
    a: "Qualibytes IT Academy's office is at Ground Floor, B-91, B Block, Sector 2, Noida, Uttar Pradesh 201301. Classes are also available online across India.",
  },
];

/* ---------- Static pages ----------
 * Paths verified against client/src/App.tsx <Route> entries.
 */
export const PAGES: Record<string, PageSEO> = {
  home: {
    path: "/",
    title: "IT Courses with Placement & EMI | Qualibytes Noida",
    description:
      "Live IT courses in DevOps, Data Science, Full Stack, Testing & Cyber Security with real projects, internship and job referrals. EMI from ₹2,000/month.",
    keywords: [
      "IT courses with placement",
      "IT training institute in Noida",
      "online IT courses with EMI",
      "job oriented courses after graduation",
      "IT courses for freshers",
    ],
    faqs: COMMON_FAQS,
  },
  about: {
    path: "/about",
    title: "About Qualibytes IT Academy | IT Company Since 2020",
    description:
      "Qualibytes began in 2020 as a real IT company. Our academy trains students on live client projects in development, testing, DevOps and data analytics.",
    keywords: ["about Qualibytes", "Qualibytes IT Academy Noida", "Akshit Giri Qualibytes"],
  },
  programs: {
    path: "/programs",
    title: "All IT Programs & Courses | Qualibytes IT Academy",
    description:
      "Explore job-ready programs: DevOps, AI/ML, Data Analytics, MERN, Java & Python Full Stack, Testing, Cyber Security, Android, iOS and more.",
    keywords: ["IT courses list", "best IT courses 2026", "software courses with placement"],
  },
  testimonials: {
    path: "/testimonials",
    title: "Student Reviews & Placement Stories | Qualibytes",
    description:
      "Read real reviews and placement stories from Qualibytes alumni now working at companies like Amazon, PayPal, Adobe, NTT Data and Nykaa.",
    keywords: ["Qualibytes reviews", "Qualibytes placement", "Qualibytes student review"],
  },
  contact: {
    path: "/contact",
    title: "Contact Qualibytes IT Academy | Noida Sector 2",
    description:
      "Talk to a Qualibytes career counsellor. Visit us at B-91, Sector 2, Noida or request a free call for course, fee and EMI details.",
    keywords: ["Qualibytes contact number", "IT institute Noida sector 2"],
  },
  onlineDegree: {
    path: "/online-degree-programs",
    title: "Online Degree Programs | Qualibytes IT Academy",
    description:
      "Earn a UGC-recognised online degree alongside job-ready IT skills. Flexible schedule and EMI options for students and working professionals.", // TODO: verify "UGC-recognised" claim with client
    keywords: ["online degree India", "online degree for working professionals"],
    // Page currently renders only a "Coming soon" placeholder with no real content.
    // noindex until the page has actual program content — indexing a thin/empty
    // page can hurt overall site SEO. Remove once content is live.
    noindex: true,
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy | Qualibytes IT Academy",
    description: "How Qualibytes IT Academy collects, uses and protects your personal information.",
  },
};

/* ---------- Courses ----------
 * slug must equal the segment after /courses/ in App.tsx exactly.
 */
const course = (
  slug: string,
  courseName: string,
  title: string,
  description: string,
  skills: string[],
  keywords: string[],
  canonicalSlug?: string,
): CourseSEO => ({
  path: `/courses/${slug}`,
  courseName,
  title,
  description,
  skills,
  keywords,
  ...(canonicalSlug ? { canonicalPath: `/courses/${canonicalSlug}` } : {}),
  faqs: [
    {
      q: `Who should join the ${courseName} course at Qualibytes?`,
      a: `The ${courseName} program suits students, freshers and working professionals. It covers ${skills.slice(0, 4).join(", ")} through live classes and real projects.`,
    },
    {
      q: `Does the ${courseName} course include placement support?`,
      a: `Yes. ${courseName} learners get mock interviews, interview support, an internship certificate and direct job referrals.`,
    },
    {
      q: `Can I pay the ${courseName} course fee in EMI?`,
      a: `Yes. EMIs start at ₹${SITE.emiFrom.toLocaleString("en-IN")} per month with instant admission.`,
    },
  ],
});

export const COURSES: CourseSEO[] = [
  course("devops", "DevOps",
    "DevOps Course with Placement | AWS, Docker, K8s – Qualibytes",
    "Learn DevOps live: CI/CD, Docker, Kubernetes, AWS, Terraform & automation on real projects. Internship certificate, job referrals, EMI from ₹2,000.",
    ["CI/CD", "Docker", "Kubernetes", "AWS", "Jenkins", "Terraform", "Linux"],
    ["DevOps course in Noida", "DevOps course with placement", "DevOps training online", "AWS DevOps course"]),
  course("aiml", "AI/ML",
    "AI & Machine Learning Course with Projects | Qualibytes",
    "Build and deploy ML and Generative AI models with Python, TensorFlow & PyTorch. Live classes, real projects, placement support, EMI available.",
    ["Python", "Machine Learning", "TensorFlow", "PyTorch", "Generative AI", "LLMs", "MLOps"],
    ["AI ML course with placement", "machine learning course Noida", "generative AI course India"]),
  course("data-analytics", "Data Analytics",
    "Data Analytics Course: SQL & Power BI | Qualibytes",
    "Master SQL, Excel, Power BI, Python & dashboards with real business datasets. Live mentor-led classes, job referrals and EMI from ₹2,000/month.",
    ["SQL", "Excel", "Power BI", "Tableau", "Python", "Dashboards"],
    ["data analytics course in Noida", "data analyst course with placement", "Power BI course"]),
  course("data-science", "Data Science",
    "Data Science Course with Placement | Python, ML – Qualibytes",
    "Learn Python, statistics, Machine Learning & Deep Learning through real-world data science projects. Live classes, internship certificate, EMI.",
    ["Python", "Statistics", "Machine Learning", "Deep Learning", "Pandas", "SQL"],
    ["data science course in Noida", "data science course with placement", "online data science course"]),
  course("software-testing", "Software Testing (Manual + Automation)",
    "Software Testing Course: Manual + Automation | Qualibytes",
    "Complete software testing course: manual, Selenium automation, API & performance testing on live projects. Placement support and EMI options.",
    ["Manual Testing", "Selenium", "Java", "API Testing", "JMeter", "Jira"],
    ["software testing course in Noida", "software testing course with placement", "QA course"]),
  course("manual-testing", "Manual Testing",
    "Manual Testing Course for Freshers | Qualibytes Noida",
    "Learn manual testing fundamentals, SDLC/STLC, test cases and bug tracking with Jira on real projects. Ideal first IT job course for freshers.",
    ["SDLC", "STLC", "Test Case Design", "Jira", "Bug Tracking", "Agile"],
    ["manual testing course", "manual testing course for freshers", "QA testing course Noida"]),
  course("automation-testing", "Automation Testing",
    "Automation Testing Course: Selenium, Playwright | Qualibytes",
    "Learn Selenium, Playwright, TestNG, API automation and CI integration on live projects. Mock interviews, job referrals, EMI from ₹2,000/month.",
    ["Selenium", "Playwright", "TestNG", "Rest Assured", "Java", "CI/CD"],
    ["automation testing course", "Selenium course with placement", "Playwright course India"]),
  course("java-fullstack", "Java Full Stack",
    "Java Full Stack Course with Spring Boot | Qualibytes",
    "Become a Java full stack developer: Core Java, Spring Boot, REST APIs, React & SQL with real projects. Live classes, job referrals, EMI.",
    ["Core Java", "Spring Boot", "REST APIs", "React", "MySQL", "Microservices"],
    ["Java full stack course in Noida", "Java full stack course with placement", "Spring Boot course"]),
  course("python-fullstack", "Python Full Stack",
    "Python Full Stack Course with Django | Qualibytes",
    "Learn Python, Django/Flask, REST APIs, React and databases by building full-stack apps. Live mentor-led classes, internship, EMI available.",
    ["Python", "Django", "Flask", "REST APIs", "React", "PostgreSQL"],
    ["Python full stack course", "Python course with placement Noida", "Django course"]),
  course("mern", "MERN Backend",
    "MERN Backend Development Course: Node, Express, MongoDB | Qualibytes",
    "Learn Node.js, Express.js, MongoDB, authentication and REST APIs with a hands-on capstone project. 10-week course with interview preparation and EMI.",
    ["Node.js", "Express.js", "MongoDB", "JWT Authentication", "REST APIs", "File Uploads"],
    ["MERN backend course", "Node.js Express MongoDB course", "backend course with placement Noida"]),
  course("mern-fullstack", "MERN Full Stack",
    "MERN Stack Course with Placement | Qualibytes Noida",
    "Master MongoDB, Express, React & Node.js by building production-grade full-stack projects. Live classes, mock interviews, job referrals, EMI.",
    ["MongoDB", "Express.js", "React", "Node.js", "TypeScript", "REST APIs"],
    ["MERN stack course in Noida", "MERN stack course with placement", "full stack web development course"]),
  course("php-fullstack", "PHP Full Stack",
    "PHP Full Stack Course with Laravel | Qualibytes",
    "Learn HTML, CSS, JavaScript, PHP, MySQL and Laravel by building and deploying a full-stack PHP application. Live classes, job prep, EMI from ₹2,000/month.",
    ["PHP", "Laravel", "MySQL", "JavaScript", "REST APIs", "Authentication"],
    ["PHP full stack course", "Laravel course with placement", "PHP developer course Noida"]),
  // "frontend" and "frontend-development" are the same course published on
  // two routes (same curriculum/banner/BrochureModal programName).
  // frontend-development is linked from the main nav/programs list, so it's
  // canonical — "frontend" points its <link rel="canonical"> at it via
  // canonicalSlug, and is excluded from the sitemap/llms.txt generators below.
  course("frontend", "Frontend",
    "Frontend Web Development Course: HTML, CSS, React | Qualibytes",
    "Learn HTML5, CSS3, JavaScript and React by building and deploying a responsive web app. A foundational 8-week course with mock interviews and portfolio support.",
    ["HTML", "CSS", "JavaScript", "React", "React Router", "Responsive Design"],
    ["frontend course for beginners", "HTML CSS JS course Noida", "React basics course"],
    "frontend-development"),
  course("frontend-development", "Frontend Development",
    "Frontend Development Course: React, Tailwind | Qualibytes",
    "Learn HTML, CSS, JavaScript, React, Tailwind and API integration by building real web apps. Live classes, portfolio projects, EMI options.",
    ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "API Integration"],
    ["frontend development course", "React JS course Noida", "web development course with placement"]),
  course("backend", "Backend Development",
    "Backend Development Course: Node.js, APIs | Qualibytes",
    "Learn backend development with Node.js, databases, REST APIs, authentication and deployment on live projects. Placement support and EMI.",
    ["Node.js", "Express.js", "SQL", "MongoDB", "REST APIs", "Authentication"],
    ["backend development course", "Node.js course with placement"]),
  course("android", "Android Development",
    "Android App Development Course: Kotlin | Qualibytes",
    "Build Android apps with Kotlin, Java, Jetpack Compose, Firebase and APIs. Publish real apps, get mock interviews and job referrals. EMI available.",
    ["Kotlin", "Java", "Jetpack Compose", "Firebase", "REST APIs"],
    ["Android development course Noida", "Kotlin course", "app development course with placement"]),
  course("ios-development", "iOS App Development",
    "iOS App Development Course: Swift, SwiftUI | Qualibytes",
    "Build iPhone apps using Swift, SwiftUI and Xcode with real projects and App Store deployment. Live classes, job referrals, EMI options.",
    ["Swift", "SwiftUI", "Xcode", "UIKit", "App Store Deployment"],
    ["iOS development course India", "Swift course", "iOS app development training"]),
  course("cybersecurity", "Cyber Security",
    "Cyber Security & Ethical Hacking Course | Qualibytes",
    "Learn ethical hacking, network security, VAPT and SOC tools with hands-on labs. Internship certificate, placement support, EMI from ₹2,000/month.",
    ["Ethical Hacking", "Network Security", "VAPT", "Kali Linux", "SOC", "SIEM"],
    ["cyber security course in Noida", "ethical hacking course", "cyber security course with placement"]),
  course("business-analyst", "Business Analyst",
    "Business Analyst Course with Placement | Qualibytes",
    "Master BRDs, user stories, Jira workflows, Agile and stakeholder communication with real case studies. Live classes, job referrals, EMI.",
    ["BRD", "User Stories", "Jira", "Agile/Scrum", "SQL", "Stakeholder Management"],
    ["business analyst course Noida", "business analyst course with placement", "IT business analyst training"]),
  course("medical-billing", "Medical Billing",
    "US Medical Billing & Coding Course | Qualibytes",
    "Learn U.S. healthcare billing workflow, CPT/ICD-10/HCPCS coding, claims processing and Revenue Cycle Management. Mock calls, resume guidance, EMI.",
    ["Medical Billing Workflow", "CPT", "ICD-10", "HCPCS", "Claims Processing", "Revenue Cycle Management"],
    ["medical billing course", "medical billing and coding course India", "US healthcare billing training"]),
  course("usit", "US IT Recruitment",
    "US IT Recruitment & Staffing Course | Qualibytes",
    "Learn end-to-end US IT staffing: sourcing, Boolean search, ATS, visa types (H1B/GC/OPT) and pay terms (W2/C2C/1099) with mock recruiter calls.",
    ["IT Staffing Lifecycle", "Boolean Sourcing", "ATS", "Visa Types", "W2/C2C/1099", "Cold Calling"],
    ["US IT recruiter course", "IT staffing training India", "US IT recruitment course with placement"]),
  // NOTE: US Healthcare Staffing (USHealthcare.tsx) exists under client/src/pages/courses
  // but has no <Route> registered in App.tsx (unreachable). Intentionally left out of
  // this config — add an entry here once routing for it is added.
  //
  // NOTE: MERN ("/courses/mern") and MERN Full Stack ("/courses/mern-fullstack") look
  // similar by name but are NOT duplicates — mern is a 10-week backend-only course
  // (Node/Express/MongoDB/JWT, no React at all) while mern-fullstack is an 8-week
  // HTML/CSS/JS/React + Node/Express/MongoDB curriculum. Both are kept, both routed,
  // both indexable, with distinct titles/descriptions.
];

/** Looks up SEO data by path */
export function getSEO(path: string): PageSEO | CourseSEO | undefined {
  return Object.values(PAGES).find((p) => p.path === path) ?? COURSES.find((c) => c.path === path);
}
