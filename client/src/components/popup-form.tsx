import { useState, useEffect } from "react";
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

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import PhoneVerification from "@/components/PhoneVerification";

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    program: "",
    name: "",
    email: "",
    phone: "",
  });

  const { toast } = useToast();

  // 🔥 AUTO OPEN (SAFE)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenPopup", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const submitLead = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your interest!",
        description: "We'll contact you soon with personalized guidance.",
      });
      setFormData({
        program: "",
        name: "",
        email: "",
        phone: "",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    submitLead.mutate(formData);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      modal={false}   // 🔥 CRITICAL FIX (DO NOT REMOVE)
    >
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
        <div className="relative flex bg-black rounded-2xl overflow-hidden">

          {/* ❌ CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 text-white hover:opacity-80"
            aria-label="Close popup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* LEFT SECTION */}
          <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white relative">
            <h2 className="text-3xl font-bold mb-6">
              Talk to our Advisor
            </h2>

            <ul className="space-y-3 text-lg">
              <li>✔ Personalized Career Roadmap</li>
              <li>✔ Free Career Counselling</li>
              <li>✔ Free Access to Events</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="w-[380px] bg-black p-8">
            <DialogTitle className="text-2xl font-bold text-white mb-6">
              Book Free Live Class
            </DialogTitle>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* PROGRAM */}
              <div>
                <Label className="text-white text-sm">
                  Topic of Interest*
                </Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) =>
                    setFormData((p) => ({ ...p, program: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800 text-white">
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* NAME */}
              <Input
                placeholder="Full Name"
                className="bg-gray-800 text-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                required
              />

              {/* EMAIL */}
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-gray-800 text-white"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                required
              />

              {/* PHONE */}
              <PhoneVerification
                onVerificationComplete={(phone) =>
                  setFormData((p) => ({ ...p, phone }))
                }
              />

              <Button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700"
                disabled={submitLead.isPending}
              >
                {submitLead.isPending ? "Submitting..." : "Continue"}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
