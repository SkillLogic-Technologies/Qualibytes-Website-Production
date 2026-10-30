import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import SEO from "@/seo/SEO";
import { PAGES } from "@/seo/seo-config";

interface OnlineDegreeProps {
  onRequestCall: () => void;
}

export default function OnlineDegree({ onRequestCall }: OnlineDegreeProps) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <SEO page={PAGES.onlineDegree} />

      {/* ⭐ Coming Soon Section */}
      <div
        className="
          flex flex-col items-center justify-center
          min-h-[75vh] text-center
          px-4 sm:px-6 md:px-8
        "
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          🎓 Online Degree Programs
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl">
          Our online degree programs are{" "}
          <span className="text-primary font-semibold">coming soon!</span>
        </p>

        {/* Card Box */}
        <div
          className="
            bg-card text-card-foreground
            backdrop-blur-md
            p-6 sm:p-8
            rounded-xl
            border border-border
            max-w-sm w-full
            shadow-lg
          "
        >
          <p className="text-muted-foreground leading-relaxed mb-5">
            Be the first to know when we launch.
            <br className="hidden sm:block" />
            Click below and our team will contact you.
          </p>

          {/* CTA Button */}
          <Button
            className="
              w-full bg-primary text-primary-foreground
              hover:bg-primary/90 transition-all font-medium
            "
            onClick={onRequestCall}
          >
            Notify Me
          </Button>
        </div>
      </div>
    </div>
  );
}
