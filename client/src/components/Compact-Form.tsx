import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// ---------------------
// Types
// ---------------------
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

export default function CompactForm({ onClose }: FormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    topicOfInterest: "",
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

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
    <div className="w-full p-1 mt-3 h-[97%] flex justify-center items-center pt-3 ">
      <div
        className="
          relative
          bg-white
          w-[95%] max-w-md sm:max-w-lg
          bg-white/40 dark:bg-black/40
          backdrop-blur-xl
          border border-white/60 dark:border-white/10
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          rounded-3xl
          p-6 sm:p-8 md:p-6
          mt-4 sm:mt-0
        "
      >
        <h2 className="text-2xl  sm:text-3xl md:text-xl font-bold text-gray-900 dark:text-white text-center">
          Book a Free Live Class
        </h2>

        <p className="text-center  text-gray-600  dark:text-gray-300 text-xs sm:text-[13px] mt-2 mb-6 sm:mb-6">
          Enter your details to reserve your seat in the next session.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 pl-8  sm:space-y-3">
          {/* Topic */}
          <div>
            <Label htmlFor="compact-form-topic" className="text-gray-700  dark:text-gray-200 font-medium text-sm sm:text-sm">
              Topic of Interest *
            </Label>

            <Select
              value={formData.topicOfInterest}
              onValueChange={(value: string) =>
                handleChange("topicOfInterest", value)
              }
            >
              <SelectTrigger id="compact-form-topic" className="mt-[2px] h-8 bg-white w-[90%]  rounded-xl border-gray-300 dark:border-gray-600  dark:bg-gray-800 text-black dark:text-white text-[13px] shadow-sm">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>

              {/* 🔥 MAIN FIX HERE */}
              <SelectContent
                className="
                  z-[100002]
                  max-h-64
                  bg-white dark:bg-gray-800
                  text-black dark:text-white
                "
              >
                {[
                  "DevOps",
                  "AI/ML",
                  "Manual Testing",
                  "Automation Testing",
                  "Java Full Stack",
                  "PHP Full Stack",
                  "Frontend Development",
                  "Backend Development",
                  "MERN Stack",
                  "Business Analyst",
                ].map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="compact-form-name" className="text-gray-700 dark:text-gray-200 font-medium  text-sm sm:text-sm">
              Full Name *
            </Label>

            <Input
              id="compact-form-name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className=" mt-[2px] w-[90%] h-8 rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="compact-form-email" className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-sm">
              Email Address *
            </Label>

            <Input
              id="compact-form-email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className=" mt-[2px] rounded-xl w-[90%] h-8 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="compact-form-phone" className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-sm">
              Phone Number *
            </Label>

            <Input
              id="compact-form-phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phone}
              maxLength={10}
              onChange={(e) =>
                handleChange("phone", e.target.value.replace(/[^0-9]/g, ""))
              }
              className=" mt-[2px] rounded-xl h-8 w-[90%] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm"
            />
          </div>

          {/* Submit */}
          <Button
            disabled={loading}
            type="submit"
            className="w-[90%] h-10 rounded-xl  bg-black text-white dark:bg-white dark:text-black"
          >
            {loading ? "Submitting..." : "Book Free Class"}
          </Button>
        </form>

        <p className="text-center  text-xs sm:text-[12px] text-gray-500 dark:text-gray-300 mt-6 sm:mt-2">
          By continuing, you agree to our{" "}
          <a className="text-blue-600 underline">Terms</a> and{" "}
          <a className="text-blue-600 underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
