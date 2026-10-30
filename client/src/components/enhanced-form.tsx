import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormProps {
  onClose?: () => void;
  isPopup?: boolean;
  onOpenChange?: any;
}

interface FormDataType {
  topicOfInterest: string;
  name: string;
  phone: string;
  email: string;
}

const topics = [
  "DevOps + AWS",
  "Data Analytics",
  "Data Science",
  "Software Testing (Manual + Automation)",
  "Manual Testing",
  "Automation Testing",
  "AI & Machine Learning",
  "Java Full Stack",
  "PHP Full Stack",
  "Frontend Development",
  "Backend Development",
  "MERN Stack",
  "Business Analyst",
  
];

export default function CompactForm({ onClose }: FormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    topicOfInterest: "",
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { topicOfInterest, name, phone, email } = formData;

    if (!topicOfInterest || !name || !phone || !email) {
      toast({
        title: "⚠️ Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast({
        title: "⚠️ Enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const scriptURL =
        "https://script.google.com/macros/s/AKfycbzNxBzSwVMF3uMia2KfBMxpR-oau_b-3V7G2KXFhLfa-EorK6JJX5wJZQUMtNEgJl_6Tg/exec";

      const data = { ...formData, remark: "Demo Class Enquiry" };

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      toast({
        title: "✅ Form Submitted",
        description: "We will contact you shortly!",
      });

      setFormData({
        topicOfInterest: "",
        name: "",
        phone: "",
        email: "",
      });

      if (onClose) onClose();
    } catch {
      toast({
        title: "❌ Submission Failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
        Book a Live Class, For Free!
      </h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Topic Dropdown */}
        <div className="relative">
          <Label htmlFor="hero-form-topic" className="text-sm text-gray-700 dark:text-gray-300">
            Your Topic of Interest*
          </Label>

          {/* Trigger Button */}
          <button
            id="hero-form-topic"
            type="button"
            onClick={() => setOpen((p) => !p)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="
              mt-1 h-12 w-full
              rounded-md border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              px-3
              text-left text-sm
              text-gray-900 dark:text-white
              flex items-center justify-between
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-colors duration-200
            "
          >
            <span className={formData.topicOfInterest ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}>
              {formData.topicOfInterest || "Select Program"}
            </span>
            <ChevronDown
              className={`
                w-5 h-5 text-gray-500 dark:text-gray-400
                transition-transform duration-300 ease-in-out
                ${open ? "rotate-180" : "rotate-0"}
              `}
            />
          </button>

          {/* Dropdown List */}
          {open && (
            <div
              role="listbox"
              className="
                absolute left-0 right-0
                mt-2 max-h-56 overflow-y-auto
                rounded-md border border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-800
                shadow-lg z-50
              "
            >
              {topics.map((item) => (
                <div
                  key={item}
                  role="option"
                  aria-selected={formData.topicOfInterest === item}
                  tabIndex={0}
                  onClick={() => {
                    handleChange("topicOfInterest", item);
                    setOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleChange("topicOfInterest", item);
                      setOpen(false);
                    }
                  }}
                  className="
                    px-4 py-3 text-sm cursor-pointer
                    text-gray-800 dark:text-gray-100
                    hover:bg-blue-50 dark:hover:bg-gray-700
                    hover:text-blue-600 dark:hover:text-white
                    transition-colors duration-150
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="hero-form-name" className="sr-only">Name</label>
          <Input
            id="hero-form-name"
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="h-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="hero-form-email" className="sr-only">Email</label>
          <Input
            id="hero-form-email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="h-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-md"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="hero-form-phone" className="sr-only">Phone</label>
          <Input
            id="hero-form-phone"
            type="tel"
            placeholder="Enter Phone"
            value={formData.phone}
            maxLength={10}
            onChange={(e) =>
              handleChange("phone", e.target.value.replace(/[^0-9]/g, ""))
            }
            className="h-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-md"
          />
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          By creating an account I have read and agree to{" "}
          <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Terms</span>{" "}
          and{" "}
          <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Privacy Policy</span>
        </p>

        {/* Submit Button */}
        <Button
          disabled={loading}
          type="submit"
          className="
            mt-2 w-full h-12
            bg-blue-600 hover:bg-blue-700
            dark:bg-blue-600 dark:hover:bg-blue-700
            text-white font-semibold
            rounded-md
            transition-colors duration-200
          "
        >
          {loading ? "Submitting..." : "BOOK FREE LIVE CLASS"}
        </Button>
      </form>
    </div>
  );
}