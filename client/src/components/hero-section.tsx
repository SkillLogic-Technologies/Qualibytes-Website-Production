import { useEffect, useRef, useState } from "react";
import EnhancedForm from "./enhanced-form";

/* ================= STATS DATA ================= */
const statsData = [
  { value: 2000, suffix: "+", label: "Placement Partners" },
  { value: 15000, suffix: "+", label: "Empowered" },
  { value: 100, suffix: "+", label: "Capstone Projects" },
];

/* ================= ANIMATED COUNTER ================= */
function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          let frame = 0;
          const duration = 2500;
          const fps = 1000 / 60;
          const totalFrames = duration / fps;
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

          const interval = setInterval(() => {
            frame++;
            const progress = easeOut(frame / totalFrames);
            setCount(Math.round(progress * end));
            if (frame >= totalFrames) clearInterval(interval);
          }, fps);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span
      ref={ref}
      className="font-extrabold leading-none whitespace-nowrap text-[clamp(1.6rem,2.8vw,2.4rem)]"
    >
      {count}
      {suffix}
    </span>
  );
}

/* ================= ICONS ================= */
function SoundOnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.98 2L21 18.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

/* ================= HERO SECTION ================= */
export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(true);

  /* ─────────────────────────────────────────
     1. MUTED AUTOPLAY ON PAGE LOAD
  ───────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.load();

    const startPlay = () => {
      video.play().catch(console.warn);
    };

    if (video.readyState >= 2) {
      startPlay();
    } else {
      video.addEventListener("canplay", startPlay, { once: true });
      return () => video.removeEventListener("canplay", startPlay);
    }
  }, []);

  /* ─────────────────────────────────────────
     2. CATCH THE FIRST USER GESTURE
  ───────────────────────────────────────── */
  useEffect(() => {
    if (audioUnlocked) return;

    const unlockAudio = () => {
      const video = videoRef.current;
      if (!video || audioUnlocked) return;

      video.muted = false;
      video
        .play()
        .then(() => {
          setIsMuted(false);
          setAudioUnlocked(true);
          setShowHint(false);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          setShowHint(false);
        });

      window.removeEventListener("scroll", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("scroll", unlockAudio, { once: true });
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("scroll", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, [audioUnlocked]);

  /* ─────────────────────────────────────────
     3. PAUSE / RESUME ON SCROLL
  ───────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(console.warn);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ─────────────────────────────────────────
     4. TAB SWITCH
  ───────────────────────────────────────── */
  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.visibilityState === "visible") {
        video.play().catch(console.warn);
      } else {
        video.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* ─────────────────────────────────────────
     5. MANUAL MUTE / UNMUTE BUTTON
  ───────────────────────────────────────── */
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!audioUnlocked && !video.muted) {
      setAudioUnlocked(true);
      setShowHint(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white dark:bg-black text-black dark:text-white py-8"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 lg:px-8">
        <h1 className="sr-only">
          IT Courses with Placement &amp; EMI — DevOps, Data Science, Full Stack &amp; Cyber Security
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-10 items-stretch">

          {/* ================= LEFT CARD ================= */}
          <div className="border border-gray-300 dark:border-transparent shadow-lg overflow-hidden flex flex-col dark:bg-neutral-900">

            {/* VIDEO WRAPPER */}
            <div className="relative w-full aspect-video">
              <video
                ref={videoRef}
                src="/home-hero-opt.mp4"
                poster="/home-hero-poster.webp"
                // fetchpriority="high": the poster is this page's actual LCP
                // element (confirmed via a real unthrottled browser's
                // PerformanceObserver — see commit e4c39e5's message), so it
                // should be fetched at the same priority a true LCP image
                // would get, not Chrome's default (lower) priority for video
                // poster images specifically. Spread as a plain DOM attribute
                // (not a typed JSX prop) because @types/react@18 predates
                // fetchPriority being added to VideoHTMLAttributes.
                {...{ fetchpriority: "high" }}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                // Native autoPlay attribute (not just the JS play() call in
                // the effect below): the browser's own media engine can
                // start playback the instant enough data is buffered,
                // without waiting for React to mount and run effects first
                // — closes the last bit of the gap between "data ready" and
                // "playback starts" on top of the preload="auto" change
                // above. The effect's own play() call is kept as a fallback
                // for browsers/cases where the autoPlay attribute alone
                // doesn't fire (and to handle re-entering the viewport,
                // tab-visibility changes, etc.), so this is additive, not a
                // replacement.
                autoPlay
                // preload="auto": "metadata" still left a visible ~1s gap
                // between the poster showing and real playback starting —
                // it only fetches enough to know duration/dimensions, not
                // actual frame data, so canplay (which gates the component's
                // own play() call below) couldn't fire until video.load()'s
                // post-mount request round-tripped AND enough video data
                // arrived to decode a frame. "auto" lets the browser start
                // that data fetch immediately from HTML-parse time, before
                // any JS even runs. Pairs with the optimized, much smaller
                // home-hero-opt.mp4 (see commit that introduced it) — the
                // original bandwidth-competition concern that motivated
                // moving off "auto" mattered far more for a 16MB file than
                // for this one.
                preload="auto"
              />

              {showHint && (
                <div
                  onClick={toggleMute}
                  className="
                    absolute top-3 left-1/2 -translate-x-1/2
                    flex items-center gap-2
                    bg-black/50 backdrop-blur-sm
                    text-white text-xs font-semibold
                    px-4 py-2 rounded-full
                    border border-white/20
                    cursor-pointer
                    animate-pulse
                  "
                >
                  <SoundOffIcon />
                  <span>Tap for Sound</span>
                </div>
              )}

              <button
                onClick={toggleMute}
                className="
                  absolute bottom-3 right-3
                  flex items-center gap-2
                  bg-black/60 hover:bg-black/80
                  text-white text-xs font-semibold
                  px-3 py-2 rounded-full
                  backdrop-blur-sm
                  transition-all duration-200
                  border border-white/20
                  cursor-pointer
                "
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>
            </div>

            {/* ================= STATS ================= */}
            <div className="px-4 sm:px-6 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {statsData.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    <span className="mt-1 text-sm sm:text-base font-semibold whitespace-nowrap">
                      {stat.label}
                    </span>
                    <span className="mt-1 w-14 border-b border-dotted border-gray-400 dark:border-gray-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT CARD (FORM) ================= */}
          <div className="border border-gray-300 dark:border-transparent shadow-lg dark:bg-neutral-900 px-4 sm:px-6 py-6 flex items-center">
            <EnhancedForm />
          </div>

        </div>
      </div>
    </section>
  );
}