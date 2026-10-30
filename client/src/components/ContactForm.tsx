import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// 🔗 WEB APP URLS
const CONTACT_URL =
  "https://script.google.com/macros/s/AKfycbyugmLSGIGRfyHnIfutNCByuDf1PvYB3HdQV7WroDiYXGde5WlDpjoemjzjhRY0zOww/exec";

const REQUEST_CALL_URL =
  "https://script.google.com/macros/s/AKfycbxHYjOc2H_FH-Gf5sJ9LHrS2XpFvJiacoSRayL-C-dfeksSzU9_IAbjfqui0x34F3ce/exec";

interface ContactFormProps {
  source?: "contact" | "request-call";
  onSuccess?: () => void;
  onClose?: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm({
  source = "contact",
  onSuccess,
  onClose,
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.message) {
      alert("Please fill all required fields");
      return;
    }

    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    
    if(form.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)){
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const url = source === "request-call" ? REQUEST_CALL_URL : CONTACT_URL;

      const body = new URLSearchParams({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      await fetch(url, {
        method: "POST",
        body,
      });

      alert(
        source === "request-call"
          ? "Request submitted successfully!"
          : "Thanks! We'll contact you soon."
      );

      setForm({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });

      onSuccess?.();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* NAME */}
      <div>
        <label htmlFor="contact-form-fullName" className="sr-only">Full Name</label>
        <Input
          id="contact-form-fullName"
          name="fullName"
          placeholder="Full Name *"
          value={form.fullName}
          onChange={handleChange}
          required
        />
      </div>

      {/* EMAIL */}
      <div>
        <label htmlFor="contact-form-email" className="sr-only">Email Address</label>
        <Input
          id="contact-form-email"
          name="email"
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* PHONE */}
      <div>
        <label htmlFor="contact-form-phone" className="sr-only">Phone Number</label>
        <Input
          id="contact-form-phone"
          name="phone"
          placeholder="10-digit mobile number"
          value={form.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");

            if (value.length <= 10) {
              setForm((prev) => ({ ...prev, phone: value }));
            }
          }}
        />
      </div>

      {/* MESSAGE */}
      <div>
        <label htmlFor="contact-form-message" className="sr-only">Message</label>
        <Textarea
          id="contact-form-message"
          name="message"
          placeholder="Message *"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      {/* SUBMIT */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Sending..." : "Submit"}
      </Button>

      {/* ✅ CANCEL / CLOSE */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-sm text-gray-500 hover:text-black underline"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
