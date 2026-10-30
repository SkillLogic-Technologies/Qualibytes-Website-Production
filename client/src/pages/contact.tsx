// src/pages/Contact.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import OldFooter from "@/components/oldFooter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SEO from "@/seo/SEO";
import { PAGES } from "@/seo/seo-config";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyugmLSGIGRfyHnIfutNCByuDf1PvYB3HdQV7WroDiYXGde5WlDpjoemjzjhRY0zOww/exec";

interface ContactProps {
  onRequestCall?: () => void;
}

export default function Contact({ onRequestCall = () => {} }: ContactProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.message) {
      alert("Please fill required fields");
      return;
    }

    if (form.phone && form.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    if (
      form.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      alert("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Thanks! We'll contact you soon.");
      setForm({ fullName: "", email: "", phone: "", message: "" });
    } catch {
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0B10] text-gray-900 dark:text-gray-100">
      <SEO page={PAGES.contact} />
      <ScrollToTop />

      {/* ================= MOBILE HERO ================= */}
      <header className="md:hidden relative w-full h-[180px] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/ContactUsbanner.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 px-4 max-w-xs">
          <h2 className="text-white font-extrabold text-lg leading-tight">
            Let’s Talk
          </h2>

          <p className="text-gray-300 text-[11px] mt-2">
            Our counsellors are here to guide you.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("contact-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-3 bg-yellow-400 text-black font-semibold px-3 py-1.5 text-xs rounded-md"
          >
            Contact Us
          </button>
        </div>
      </header>

      {/* ================= DESKTOP HERO ================= */}
      <header className="hidden md:block relative w-full">
        <motion.img
          src="/ContactUsbanner.webp"
          alt="Contact Qualibytes"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-auto object-contain block"
        />

        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white font-extrabold text-4xl lg:text-6xl"
            >
              Let’s Talk
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 text-gray-200 text-lg"
            >
              Have questions? Our counsellors are here to guide you.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-300 transition"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </header>

      {/* ================= MAIN SECTION ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid gap-12 grid-cols-1 lg:grid-cols-2 lg:items-stretch">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col min-w-0"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Noida Office
          </h2>

          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Ground Floor, B-91,
            <br />
            B Block, Sector 2,
            <br />
            Noida, Uttar Pradesh 201301
          </p>

          <div className="mt-8 border rounded-2xl shadow-xl overflow-hidden flex-1">
            <iframe
              title="Qualibytes Noida Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.964875660666!2d77.3133076!3d28.5830904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4488b7d1f27%3A0xeff0e0d09e1e7c2!2sB-91%2C%20B%20Block%2C%20Sector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1707041000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[450px] border-0"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex min-w-0"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#111827] border dark:border-gray-700 shadow-xl rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col w-full min-w-0 max-w-full"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Reach Out to Us
            </h3>

            <div className="grid md:grid-cols-2 gap-5 min-w-0">
              <div className="min-w-0">
                <label htmlFor="contact-fullName" className="text-sm font-medium">Full Name *</label>
                <Input
                  id="contact-fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="contact-email" className="text-sm font-medium">Email *</label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="min-w-0">
              <label htmlFor="contact-phone" className="text-sm font-medium">Phone</label>
              <Input
                id="contact-phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="min-w-0">
              <label htmlFor="contact-message" className="text-sm font-medium">Message *</label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Type your message..."
              />
            </div>

            <div className="text-center pt-6 mt-auto">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
              >
                {submitting ? "Sending..." : "Submit"}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>

      <OldFooter />
    </div>
  );
}
