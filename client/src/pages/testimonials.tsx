import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import OldFooter from "@/components/oldFooter";
import SEO from "@/seo/SEO";
import { PAGES } from "@/seo/seo-config";

interface TestimonialsProps {
  onRequestCall: () => void;
}

const testimonials = [
  {
    name: "Krishna Chaitanya",
    role: "Software Engineer III",
    location: "Hyderabad",
    hike: "250",
    message:
      "The structured DSA roadmap and system design mentorship helped me confidently crack product-based interviews.",
  },
  {
    name: "Manideep Siva",
    role: "Software Engineer",
    location: "Bangalore",
    hike: "300",
    message:
      "Mock interviews and real-world project reviews completely changed my preparation strategy.",
  },
  {
    name: "Jagasyeni Tripathy",
    role: "SDE1",
    location: "Kolkata",
    hike: "100",
    message:
      "As a fresher, I gained clarity on problem-solving patterns and industry expectations.",
  },
  {
    name: "Ashish Kumar",
    role: "Backend Developer",
    location: "Pune",
    hike: "138",
    message:
      "The backend architecture modules and mentorship sessions helped me scale my skills fast.",
  },
  {
    name: "Rahul Verma",
    role: "Full Stack Developer",
    location: "Noida",
    hike: "180",
    message:
      "Live coding sessions and debugging exercises improved my confidence in technical rounds.",
  },
  {
    name: "Sneha Reddy",
    role: "Frontend Engineer",
    location: "Chennai",
    hike: "210",
    message:
      "Hands-on React and performance optimization training gave me a strong edge in interviews.",
  },
  {
    name: "Arjun Mehta",
    role: "DevOps Engineer",
    location: "Ahmedabad",
    hike: "170",
    message:
      "Cloud and CI/CD focused modules aligned perfectly with real industry workflows.",
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    location: "Delhi",
    hike: "160",
    message:
      "The data projects and case studies helped me transition smoothly into analytics roles.",
  },
  {
    name: "Vikram Singh",
    role: "Software Developer",
    location: "Mumbai",
    hike: "190",
    message:
      "Regular assessments and structured revision cycles kept my preparation consistent.",
  },
  {
    name: "Neha Kapoor",
    role: "QA Engineer",
    location: "Jaipur",
    hike: "140",
    message:
      "Automation framework training helped me shift from manual testing to automation roles.",
  },
  {
    name: "Rohit Nair",
    role: "Cloud Engineer",
    location: "Kochi",
    hike: "220",
    message:
      "Real AWS deployment projects gave me production-level confidence.",
  },
  {
    name: "Ananya Das",
    role: "Machine Learning Engineer",
    location: "Bhubaneswar",
    hike: "260",
    message:
      "End-to-end ML pipelines and interview mentorship helped me land a strong product role.",
  },
];

export default function TestimonialsPage({ onRequestCall }: TestimonialsProps) {
  const handleScroll = () => {
    document
      .getElementById("success-stories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0B10] text-gray-900 dark:text-gray-100">
      <SEO page={PAGES.testimonials} />
      <ScrollToTop />

      {/* ================= MOBILE HERO ================= */}
      <header className="md:hidden relative w-full h-[190px] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Testimonials.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-4">
          <h2 className="text-white font-extrabold text-lg leading-tight">
            Learner Success
            <br />
            Stories
          </h2>

          <p className="text-yellow-400 text-xs mt-1">
            Real outcomes. Real salary growth.
          </p>

          <p className="text-gray-300 text-[11px] mt-2 max-w-xs">
            See how learners across India cracked top software roles with
            Qualibytes.
          </p>

          <button
            onClick={onRequestCall}
            className="mt-3 bg-yellow-400 text-black font-semibold px-3 py-1.5 text-xs rounded-md"
          >
            Talk to Counsellor
          </button>
        </div>
      </header>

      {/* ================= DESKTOP HERO ================= */}
      <header className="hidden md:block relative w-full">
        <motion.img
          src="/Testimonials.webp"
          alt="Success Stories"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-auto object-contain block"
        />

        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white font-extrabold text-5xl lg:text-6xl"
            >
              Success Stories
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 text-gray-200 text-lg"
            >
              See how learners across India cracked top software roles with
              Qualibytes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 flex justify-center gap-4"
            >
              <button
                onClick={handleScroll}
                className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-300 transition"
              >
                View Success Stories
              </button>

              <button
                onClick={onRequestCall}
                className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
              >
                Talk to a Counsellor
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ================= TESTIMONIAL GRID ================= */}
      <main
        id="success-stories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col min-h-[420px] rounded-2xl bg-white dark:bg-[#0f1115] border border-gray-200 dark:border-gray-800 p-6 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, idx) => (
                <span key={idx} className="text-blue-500 text-sm">
                  ★
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed min-h-[90px]">
              {t.message}
            </p>

            <div className="flex items-center gap-3 mt-6">
              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.role} · {t.location}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                <span>Career Growth</span>
                <span className="text-blue-600 font-bold">
                  +{t.hike}%
                </span>
              </div>

              <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(parseInt(t.hike), 300)}%` }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-green-400"
                />
              </div>

              <div className="mt-5 text-center">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  Career Boost After Joining Qualibytes
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      <OldFooter />
    </div>
  );
}
