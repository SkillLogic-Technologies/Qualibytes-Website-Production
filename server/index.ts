import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupCSP } from "./csp";

const app = express();

/**
 * ----------------------------------------------------
 * BASIC APP CONFIG
 * ----------------------------------------------------
 */

// Trust proxy (important if behind reverse proxy / HTTPS at edge)
app.set("trust proxy", 1);

// Brotli (preferred, smaller) or gzip based on the client's Accept-Encoding,
// for every compressible response — prerendered HTML, JS/CSS bundles, JSON
// API responses, SVGs, sitemap.xml, llms.txt/robots.txt. Must run before
// anything that writes a response body. No reverse proxy/CDN in front of
// this app in production (deploys as a plain Node process — confirmed no
// Dockerfile, nginx.conf, vercel.json, netlify.toml, or Cloudflare config
// anywhere in the repo), so without this every response shipped completely
// uncompressed.
app.use(compression());

// Apply CSP (ONLY applies in production, skipped in dev)
setupCSP(app);

// Body parsers with safe limits
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

/**
 * ----------------------------------------------------
 * REQUEST LOGGING (API ONLY)
 * ----------------------------------------------------
 */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json.bind(res);
  res.json = (body: any) => {
    capturedJsonResponse = body;
    return originalResJson(body);
  };

  res.on("finish", () => {
    if (!path.startsWith("/api")) return;

    const duration = Date.now() - start;
    let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;

    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }

    if (logLine.length > 120) {
      logLine = logLine.slice(0, 119) + "…";
    }

    log(logLine);
  });

  next();
});

/**
 * ----------------------------------------------------
 * MAIN SERVER BOOTSTRAP
 * ----------------------------------------------------
 */
(async () => {
  const server = await registerRoutes(app);

  /**
   * ------------------------------------------------
   * CENTRALIZED ERROR HANDLER (NO STACK TRACE LEAK)
   * ------------------------------------------------
   */
  app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err?.status || err?.statusCode || 500;
      const message =
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message || "Internal Server Error";

      res.status(status).json({ message });

      // Log full error server-side only
      console.error(err);
    }
  );

  /**
   * ------------------------------------------------
   * DEV vs PROD CLIENT HANDLING
   * ------------------------------------------------
   */
  if (app.get("env") === "development") {
    // Vite dev server (NO CSP here)
    await setupVite(app, server);
  } else {
    // Static production build
    serveStatic(app);
  }

  /**
   * ------------------------------------------------
   * SERVER LISTEN
   * ------------------------------------------------
   */
  const port = process.env.PORT ? Number(process.env.PORT) : 5002;
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

  server.listen(port, host, () => {
    log(`🚀 Server running on http://${host}:${port}`);
    log(`Environment: ${process.env.NODE_ENV}`);
  });
})();
