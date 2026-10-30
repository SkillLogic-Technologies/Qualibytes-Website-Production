import ContactForm from "@/components/ContactForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactFormPopup({ open, onOpenChange }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/60 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      {/* MODAL CARD */}
      <div
        className="
          relative
          z-[10001]
          w-[90%]
          max-w-lg
          max-h-[90vh]
          bg-white
          rounded-xl
          p-6
          overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-black"
          aria-label="Close dialog"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-900 select-none">
          Request a Call
        </h2>

        <ContactForm
          source="request-call"
          onSuccess={() => onOpenChange(false)}
          onClose={() => onOpenChange(false)}
        />
      </div>
    </div>
  );
}
