/**
 * One-off conversion script: client/public's JPEG/PNG images -> WebP.
 * Run manually (`node scripts/convert-to-webp.mjs`) — not part of the build
 * pipeline, since these are source assets checked into the repo, not
 * build output. Originals are kept; this only adds .webp siblings.
 *
 * Max width is role-dependent (resizing never upscales — withoutEnlargement
 * leaves already-smaller images untouched):
 *   - thumbnails (course cards, team/advisor photos): 800px
 *   - banners/hero images (course page banners, section backgrounds): 1920px
 *   - logos: 400px
 * Quality 80 for all. home-hero.png is excluded: it's a <video poster>,
 * wired up with its own fetchpriority/preload handling elsewhere — not an
 * <img>, and out of scope here.
 */
import sharp from "sharp";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "client/public");
const QUALITY = 80;

const THUMBNAIL_MAX_WIDTH = 800;
const BANNER_MAX_WIDTH = 1920;
const LOGO_MAX_WIDTH = 400;

const EXCLUDE = new Set(["home-hero.png", "favicon.png"]);

const LOGO_FILES = new Set([
  "QualibytesLogo.png",
  "Qualibytes Logo 3.png",
  "Qualibytes Logo Icon.jpg",
  "Qualibytes Logo Icon.png",
  "Qualibytes Logo.jpg",
  "Qualibytes Logo.png",
]);

const THUMBNAIL_DIRS = new Set(["thumbnail"]);

const THUMBNAIL_FILES = new Set([
  "akshit.jpg",
  "deepanshu.jpeg",
  "deepanshu.jpg",
  "aditi.png",
]);

function classify(relPath) {
  const name = basename(relPath);
  const dir = relPath.includes("/") ? relPath.split("/")[0] : "";
  if (LOGO_FILES.has(name)) return { role: "logo", maxWidth: LOGO_MAX_WIDTH };
  if (THUMBNAIL_DIRS.has(dir) || THUMBNAIL_FILES.has(name)) {
    return { role: "thumbnail", maxWidth: THUMBNAIL_MAX_WIDTH };
  }
  return { role: "banner", maxWidth: BANNER_MAX_WIDTH };
}

function walk(dir, baseDir = dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walk(full, baseDir));
    } else {
      const ext = extname(entry).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const rel = full.slice(baseDir.length + 1).replace(/\\/g, "/");
        files.push(rel);
      }
    }
  }
  return files;
}

async function convertOne(relPath) {
  const name = basename(relPath);
  if (EXCLUDE.has(name)) {
    console.log(`skip (excluded): ${relPath}`);
    return null;
  }

  const srcPath = join(PUBLIC_DIR, relPath);
  const outPath = srcPath.replace(/\.(jpe?g|png)$/i, ".webp");

  if (existsSync(outPath)) {
    console.log(`skip (already exists): ${relPath}`);
    return null;
  }

  const { role, maxWidth } = classify(relPath);
  const srcSize = statSync(srcPath).size;

  await sharp(srcPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);

  const outSize = statSync(outPath).size;
  console.log(
    `${relPath} [${role}, max ${maxWidth}px]: ${(srcSize / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB`,
  );
  return { srcSize, outSize };
}

async function main() {
  const files = walk(PUBLIC_DIR);
  let totalSrc = 0;
  let totalOut = 0;
  let converted = 0;

  for (const relPath of files) {
    const result = await convertOne(relPath);
    if (result) {
      totalSrc += result.srcSize;
      totalOut += result.outSize;
      converted++;
    }
  }

  console.log(`\nConverted ${converted} images.`);
  console.log(`Total: ${(totalSrc / 1024 / 1024).toFixed(2)}MB -> ${(totalOut / 1024 / 1024).toFixed(2)}MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
