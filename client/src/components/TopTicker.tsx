import React from "react";
import { motion } from "framer-motion";

export default function TopTicker() {
  const text =
    "Connect a call with our counsellor • Get Career Guidance • Qualibytes IT Academy • ";

  return (
    <div className="w-full bg-[#d1105a] text-white h-[38px] overflow-hidden flex items-center">
      <motion.div
        className="whitespace-nowrap text-sm font-medium"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 90,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {text.repeat(10)}
      </motion.div>
    </div>
  );
}
