import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { BROCHURE_LINKS, GOOGLE_SHEET_URL } from "@/brochureLinks";
import { submitFormData } from "@/services/SheetDBService";

const BrochureModal = ({
  open,
  onClose,
  programName,
  programKey = "",
  autoSubmit = false,
}: {
  open: boolean;
  onClose: () => void;
  programName: string;
  programKey?: string;
  autoSubmit?: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  // Shown instead of the form when the lead was submitted successfully but
  // this program has no brochure PDF on file (BROCHURE_LINKS has no entry
  // for it) — same inline-success-panel pattern as PhoneVerification's
  // "✓ Phone Verified" state, instead of closing the modal with just a
  // browser alert() and no record of what the visitor saw.
  const [noBrochureAvailable, setNoBrochureAvailable] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (open && autoSubmit && formRef.current) {
      // Only auto-submit if all fields are filled (simulate for demo, or require prefill)
      // If you want to require user input, remove this and let user fill manually
      if (formData.name && formData.email && formData.phone) {
        formRef.current.requestSubmit();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, autoSubmit]);

  if (!open) return null;

  // Component stays mounted across opens (parent always renders it, toggling
  // only the `open` prop), so without this the success panel would stay
  // stuck visible if the same modal instance is reused for another program.
  const handleClose = () => {
    setNoBrochureAvailable(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, ""); // letters remove
      setFormData({
        ...formData,
        phone: onlyNumbers.slice(0, 10), // max 10 digits
      });
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      alert("⚠️ Please fill all details before downloading.");
      return;
    }
    if (phone && phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // ✅ FORM SUBMIT TO GOOGLE SHEET
      const body = new URLSearchParams();
      body.append("name", name);
      body.append("email", email);
      body.append("phone", phone);
      body.append("program", programName);

      // Submit to Google Apps Script (original)
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body,
      });

      // Also submit to SheetDB for reliability
      await submitFormData({
        name,
        email,
        phone,
        program: programName,
      });

      // Normalize key to match BROCHURE_LINKS (case-insensitive, remove spaces)
      const normalizedKey = (programKey || "")
        .replace(/\s+/g, "")
        .toLowerCase();
      const foundKey = Object.keys(BROCHURE_LINKS).find(
        (k) => k.toLowerCase() === normalizedKey,
      );
      // Debug: Show which key is being used and what link is found
      console.log("Brochure lookup:", {
        programKey,
        normalizedKey,
        foundKey,
        BROCHURE_LINKS,
      });
      const driveLink = foundKey ? BROCHURE_LINKS[foundKey] : undefined;
      // Debug: Show which key is being used and what link is found
      // console.log('Brochure lookup:', programKey, normalizedKey, foundKey, driveLink);
      if (!driveLink) {
        // Lead is already submitted above (Google Sheet + SheetDB) — just no
        // PDF to hand over automatically, so tell the counsellor team will
        // follow up instead of a plain error alert.
        setNoBrochureAvailable(true);
        setLoading(false);
        return;
      }

      onClose();

      // Force download using hidden iframe to avoid redirect
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = driveLink;
      document.body.appendChild(iframe);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 5000);

      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong, please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="
          bg-white dark:bg-gray-900 rounded-2xl shadow-2xl relative 
          w-full max-w-md p-6 sm:p-8
          max-h-[90vh] overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
          onClick={handleClose}
          aria-label="Close brochure dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {noBrochureAvailable ? (
          /* SUCCESS (no PDF on file) — same inline-confirmation style as
             PhoneVerification's "✓ Phone Verified" panel, adapted to this
             modal's light/dark theme, instead of a plain alert(). */
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-green-600 dark:text-green-400 text-lg font-semibold mb-2">
              ✓ Thank You!
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Our counsellor will send you the brochure within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* TITLE */}
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-5 text-gray-800 dark:text-white leading-tight">
              Download {programName} Brochure
            </h2>

            {/* FORM */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor="brochure-modal-name" className="sr-only">Full Name</label>
                <input
                  id="brochure-modal-name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-700 rounded p-2 text-sm sm:text-base bg-transparent text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="brochure-modal-email" className="sr-only">Email Address</label>
                <input
                  id="brochure-modal-email"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-700 rounded p-2 text-sm sm:text-base bg-transparent text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="brochure-modal-phone" className="sr-only">Phone Number</label>
                <input
                  id="brochure-modal-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-700 rounded p-2 text-sm sm:text-base bg-transparent text-black dark:text-white"
                  maxLength={10}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-2 text-sm sm:text-base"
              >
                {loading ? "Submitting..." : "Submit & Download"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BrochureModal;
