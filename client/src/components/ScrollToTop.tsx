import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const ScrollToTop = () => {
  const [location] = useLocation();
  const prevLocation = useRef<string | null>(null);

  useEffect(() => {
    if (prevLocation.current !== location) {
      prevLocation.current = location;

      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return null;
};

export default ScrollToTop;