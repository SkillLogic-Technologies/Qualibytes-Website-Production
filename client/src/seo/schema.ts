/**
 * JSON-LD structured data builders (schema.org)
 * Validate: https://search.google.com/test/rich-results and https://validator.schema.org
 */
import { SITE, type CourseSEO, type FAQ, type PageSEO } from "./seo-config";

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** Brand entity (EducationalOrganization + LocalBusiness) */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: [SITE.shortName, "Qualibytes Academy"],
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.ogImage,
    description:
      "Qualibytes IT Academy is a Noida-based IT training institute, started in 2020 as an IT company, offering live job-oriented courses with real projects, internship certificates and placement support.",
    foundingDate: SITE.foundingYear,
    founder: SITE.founders.map((name) => ({ "@type": "Person", name })),
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹",
    address: { "@type": "PostalAddress", ...SITE.address },
    geo: { "@type": "GeoCoordinates", ...SITE.geo },
    openingHours: SITE.openingHours,
    areaServed: { "@type": "Country", name: "India" },
    sameAs: SITE.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "admissions",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

export function webPageSchema(page: PageSEO) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}${page.path}#webpage`,
    url: `${SITE.url}${page.path}`,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-IN",
    dateModified: new Date().toISOString().slice(0, 10), // build date = freshness signal
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

/** Google "Course info" rich result eligible format */
export function courseSchema(c: CourseSEO) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE.url}${c.path}#course`,
    name: `${c.courseName} Course`,
    description: c.description,
    url: `${SITE.url}${c.path}`,
    provider: { "@id": ORG_ID, "@type": "EducationalOrganization", name: SITE.name, sameAs: SITE.url },
    teaches: c.skills,
    inLanguage: "en",
    educationalCredentialAwarded: "Internship Certificate",
    offers: {
      "@type": "Offer",
      category: "Paid",
      priceCurrency: "INR",
      ...(c.price ? { price: c.price } : {}),
      availability: "https://schema.org/InStock",
      url: `${SITE.url}${c.path}`,
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: c.duration ?? "P4M", // TODO: per-course duration confirm
        location: "Online (Live Classes)",
      },
      {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        courseWorkload: c.duration ?? "P4M",
        location: {
          "@type": "Place",
          name: SITE.name,
          address: { "@type": "PostalAddress", ...SITE.address },
        },
      },
    ],
  };
}

/** For the programs listing page */
export function courseListSchema(courses: CourseSEO[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}${c.path}`,
      name: c.courseName,
    })),
  };
}
