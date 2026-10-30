import React, { useEffect, useState } from "react";
import PhoneVerification from "./PhoneVerification";
import { submitFormData } from "@/services/SheetDBService";
import { toast } from "@/hooks/use-toast";

interface AdvisorPopupProps {
  onClose?: () => void;
  hideImage?: boolean;
  preselectedProgram?: string;
}

const AdvisorPopup: React.FC<AdvisorPopupProps> = ({
  onClose,
  hideImage = false,
  preselectedProgram,
}) => {
  const [show, setShow] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!onClose) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [onClose]);

  if (!show) return null;

  const handleClose = () => {
    if (onClose) onClose();
    else setShow(false);
  };

  const handlePhoneVerification = (phone: string) => {
    setVerifiedPhone(phone);
    setFormData((prev) => ({ ...prev, phone }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verifiedPhone) {
      toast({
        title: "Error",
        description: "Please verify your phone number before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        timestamp: new Date().toISOString(),
        source: "Advisor Popup",
      };

      const response = await submitFormData(submissionData);

      if (response.success) {
        toast({
          title: "Success",
          description: "Your information has been submitted successfully!",
        });
        handleClose();
      } else {
        throw new Error(response.error || "Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        className="
          w-full max-w-[800px]
          rounded-xl overflow-hidden shadow-xl border border-gray-700 bg-black
          flex flex-col md:flex-row
          max-h-[90vh]
        "
      >
        {/* IMAGE SECTION */}
        {!hideImage && (
          <div className="w-full md:w-1/2 h-48 md:h-auto">
            <img
              src="https://i.postimg.cc/52n9x1b3/counsellor.png"
              alt="Qualibytes career counsellor"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        {/* FORM SECTION */}
        <div
          className={`
            w-full ${!hideImage ? "md:w-1/2" : "md:w-full"}
            bg-black text-white relative
            p-5 md:p-6 overflow-y-auto
          `}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white text-lg bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Close dialog"
          >
            ✕
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            {hideImage ? "Book your live session" : "Talk to our Advisor!"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="advisor-name" className="sr-only">Your Name</label>
              <input
                id="advisor-name"
                type="text"
                placeholder="Your Name"
                className="w-full p-2 rounded bg-gray-800"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="advisor-email" className="sr-only">Email Address</label>
              <input
                id="advisor-email"
                type="email"
                placeholder="Email Address"
                className="w-full p-2 rounded bg-gray-800"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <PhoneVerification
              onVerificationComplete={handlePhoneVerification}
            />

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 w-full p-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvisorPopup;
