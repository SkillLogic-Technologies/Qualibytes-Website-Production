import helmet from "helmet";
import type { Express } from "express";

const baseDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  imgSrc: ["'self'", "data:", "blob:", "https://cdn.brandfetch.io"],
  connectSrc: ["'self'", "https://script.google.com"],
  fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  frameAncestors: ["'none'"],
  frameSrc: ["'self'", "https://drive.google.com"],
};

// Ad landing pages (client/public/lp/*) also load the Meta Pixel and Google
// tag, and post leads to the Admission Apps Script. Only /lp/ gets these
// extra hosts — the rest of the site keeps the strict policy above.
const adHosts = [
  "https://www.facebook.com",
  "https://www.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://www.google.com",
  "https://googleads.g.doubleclick.net",
];

const landingDirectives = {
  ...baseDirectives,
  scriptSrc: ["'self'", "https://connect.facebook.net", "https://www.googletagmanager.com"],
  imgSrc: [...baseDirectives.imgSrc, ...adHosts],
  connectSrc: [...baseDirectives.connectSrc, "https://script.googleusercontent.com", ...adHosts],
};

export function setupCSP(app: Express) {
  const isProd = process.env.NODE_ENV === "production";

  // ❌ Never apply CSP in development (Vite needs inline scripts)
  if (!isProd) return;

  const siteCSP = helmet({ contentSecurityPolicy: { directives: baseDirectives } });
  const landingCSP = helmet({ contentSecurityPolicy: { directives: landingDirectives } });

  app.use((req, res, next) =>
    req.path.startsWith("/lp/") ? landingCSP(req, res, next) : siteCSP(req, res, next),
  );
}
