import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { CompanyLogo } from "@/lib/types";

/* ---------------------------------------
   COMPANY LISTS
---------------------------------------- */
const companiesRow3: CompanyLogo[] = [
  { name: "Zee", logoUrl: "https://cdn.brandfetch.io/zee.com/logo.png" },
  { name: "Target", logoUrl: "https://cdn.brandfetch.io/target.com/logo.png" },
  {
    name: "OnMobile",
    logoUrl: "https://cdn.brandfetch.io/onmobile.com/logo.png",
  },
  { name: "Amazon", logoUrl: "https://cdn.brandfetch.io/amazon.com/logo.png" },
  {
    name: "Epsilon",
    logoUrl: "https://cdn.brandfetch.io/epsilon.com/logo.png",
  },
  {
    name: "Landmark Group",
    logoUrl: "https://cdn.brandfetch.io/landmarkgroup.com/logo.png",
  },
  {
    name: "NTT Data",
    logoUrl: "https://cdn.brandfetch.io/nttdata.com/logo.png",
  },
  { name: "Akamai", logoUrl: "https://cdn.brandfetch.io/akamai.com/logo.png" },
  { name: "PayPal", logoUrl: "https://cdn.brandfetch.io/paypal.com/logo.png" },
  {
    name: "Home Icon",
    logoUrl: "https://cdn.brandfetch.io/homelane.com/logo.png",
  },
  { name: "IXB", logoUrl: "https://cdn.brandfetch.io/ixb.com/logo.png" },
  { name: "Nykaa", logoUrl: "https://cdn.brandfetch.io/nykaa.com/logo.png" },
  { name: "Vimeo", logoUrl: "https://cdn.brandfetch.io/vimeo.com/logo.png" },
  { name: "AJIO", logoUrl: "https://cdn.brandfetch.io/ajio.com/logo.png" },
  {
    name: "WorkSpan",
    logoUrl: "https://cdn.brandfetch.io/workspan.com/logo.png",
  },
  {
    name: "Wisetech Global",
    logoUrl: "https://cdn.brandfetch.io/wisetechglobal.com/logo.png",
  },
  {
    name: "Paymatrix",
    logoUrl: "https://cdn.brandfetch.io/paymatrix.in/logo.png",
  },
];

const companiesRow2: CompanyLogo[] = [
  {
    name: "Muthoot Finance",
    logoUrl: "https://cdn.brandfetch.io/muthootfinance.com/logo.png",
  },
  {
    name: "FirstHive",
    logoUrl: "https://cdn.brandfetch.io/firsthive.com/logo.png",
  },
  {
    name: "Rebel Foods",
    logoUrl: "https://cdn.brandfetch.io/rebelfoods.com/logo.png",
  },
  {
    name: "Stripe",
    logoUrl: "https://cdn.brandfetch.io/stripe.com/logo.svg",
  },
  {
    name: "Love Bonito",
    logoUrl: "https://cdn.brandfetch.io/lovebonito.com/logo.png",
  },
  { name: "Fyers", logoUrl: "https://cdn.brandfetch.io/fyers.in/logo.png" },
  { name: "Apna", logoUrl: "https://cdn.brandfetch.io/apna.co/logo.png" },
  {
    name: "Sigmoid",
    logoUrl: "https://cdn.brandfetch.io/sigmoid.com/logo.png",
  },
  { name: "ABM", logoUrl: "https://cdn.brandfetch.io/abm.com/logo.png" },
  {
    name: "Adobe",
    logoUrl: "https://cdn.brandfetch.io/adobe.com/logo.svg",
  },
  {
    name: "Superteam",
    logoUrl: "https://cdn.brandfetch.io/superteam.fun/logo.png",
  },
  {
    name: "Capri Loans",
    logoUrl: "https://cdn.brandfetch.io/capriloans.in/logo.png",
  },
];

/* ---------------------------------------
   MARQUEE RESPONSIVE LOGIC
---------------------------------------- */
function useMarqueeDuplication(logos: CompanyLogo[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dupCount, setDupCount] = useState(2);
  const [duration, setDuration] = useState(40);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;

      const temp = document.createElement("div");
      temp.style.display = "flex";
      temp.style.visibility = "hidden";

      logos.forEach((l) => {
        const img = document.createElement("img");
        img.src = l.logoUrl;
        img.style.height = "50px";
        img.style.marginRight = "48px";
        temp.appendChild(img);
      });

      document.body.appendChild(temp);
      const totalWidth = temp.offsetWidth;
      document.body.removeChild(temp);

      const need = Math.ceil(width / totalWidth) + 1;
      setDupCount(Math.max(2, need));

      const SPEED = 55;
      setDuration((totalWidth * need) / SPEED);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [logos]);

  return { containerRef, dupCount, duration };
}

/* ---------------------------------------
   MAIN COMPONENT
---------------------------------------- */
export default function CompanyLogos() {
  const marquee1 = useMarqueeDuplication(companiesRow3);
  const marquee2 = useMarqueeDuplication(companiesRow2);

  return (
    <section className="pb-20 px-4">

      {/* DESKTOP */}
      <div className="hidden md:block">
        {/* 
        <div
          className="
            w-full py-12 rounded-3xl relative overflow-hidden
            bg-transparent 
            shadow-none  
            border-none

            dark:bg-white dark:shadow-2xl dark:border dark:border-gray-200
          "
        > */}
        {/* Row 1 */}
        <div className="overflow-hidden whitespace-nowrap py-2 mb-12">
          <div
            ref={marquee1.containerRef}
            className="flex animate-marquee items-center gap-[48px]"
            style={{ ["--marquee-duration" as any]: `${marquee1.duration}s` }}
          >
            {Array.from({ length: marquee1.dupCount }).flatMap((_, d) =>
              companiesRow3.map((c, i) => (
                <motion.img
                  key={`r1-${d}-${i}`}
                  // d===0 is the one real, visible-on-load copy; d>0 only
                  // exist so the CSS marquee animation has enough width to
                  // scroll through seamlessly. Marked so the crawler-facing
                  // prerendered HTML keeps one copy of each logo instead of
                  // marquee1.dupCount repeats of the same 17 logos.
                  {...(d > 0 ? { "data-prerender-strip": "duplicate" } : {})}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.3 }}
                  src={c.logoUrl}
                  alt={`${c.name} logo`}
                  className="h-[50px] object-contain opacity-90 hover:opacity-100  dark:bg-white dark:p-2 dark:rounded-md"
                />
              )),
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden whitespace-nowrap py-2">
          <div
            ref={marquee2.containerRef}
            className="flex animate-marquee-reverse items-center gap-[48px]"
            style={{ ["--marquee-duration" as any]: `${marquee2.duration}s` }}
          >
            {Array.from({ length: marquee2.dupCount }).flatMap((_, d) =>
              companiesRow2.map((c, i) => (
                <motion.img
                  key={`r2-${d}-${i}`}
                  {...(d > 0 ? { "data-prerender-strip": "duplicate" } : {})}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.3 }}
                  src={c.logoUrl}
                  alt={`${c.name} logo`}
                  className="h-[50px] object-contain opacity-90 hover:opacity-100"
                />
              )),
            )}
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* MOBILE */}
      <div className="md:hidden px-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
          {[...companiesRow3, ...companiesRow2].map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              className="
                p-3 rounded-xl 
                bg-transparent
                border-none

                dark:bg-white dark:border dark:border-gray-300
                flex items-center justify-center
              "
            >
              <img
                src={c.logoUrl}
                alt={`${c.name} logo`}
                loading="lazy"
                className="h-[40px] sm:h-[50px] object-contain opacity-90
                dark:invert dark:brightness-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
