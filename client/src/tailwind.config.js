/**
 * Not used by the build: PostCSS/Tailwind resolve configuration from the
 * root `tailwind.config.ts` (discovered by convention from the project
 * root, where `postcss.config.js` and `package.json` also live). This file
 * is kept in sync for reference only — edit `../../tailwind.config.ts` for
 * anything that affects the actual build.
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ["../index.html", "./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

