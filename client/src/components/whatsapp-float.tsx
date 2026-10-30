import { useState } from "react";

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "918920942738";
    const message =
      "Hi, I'm interested in learning more about Qualibytes programs!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes wa-pulse2 {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes wa-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes wa-slide-in {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .wa-wrapper {
          position: fixed;
          right: 24px;
          bottom: 110px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wa-tooltip {
          background: #111827;
          color: #f9fafb;
          font-family: 'Segoe UI', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 10px;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          animation: wa-slide-in 0.25s ease forwards;
          pointer-events: none;
          letter-spacing: 0.01em;
          line-height: 1.4;
        }
        .wa-tooltip::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 0 6px 7px;
          border-style: solid;
          border-color: transparent transparent transparent #111827;
        }
        .wa-tooltip { position: relative; }

        .wa-btn-container {
          position: relative;
          width: 58px;
          height: 58px;
          cursor: pointer;
          animation: wa-float 3s ease-in-out infinite;
        }

        .wa-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #25d366;
          animation: wa-pulse 2.2s ease-out infinite;
        }
        .wa-ring2 {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #25d366;
          animation: wa-pulse2 2.2s ease-out infinite;
          animation-delay: 0.4s;
        }

        .wa-btn {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          border: none;
          box-shadow:
            0 4px 15px rgba(37, 211, 102, 0.5),
            0 8px 30px rgba(37, 211, 102, 0.25),
            inset 0 1px 0 rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .wa-btn:hover {
          transform: scale(1.1);
          box-shadow:
            0 6px 22px rgba(37, 211, 102, 0.65),
            0 12px 40px rgba(37, 211, 102, 0.3),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .wa-btn:active {
          transform: scale(0.97);
        }

        .wa-icon {
          width: 30px;
          height: 30px;
          fill: white;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
        }
      `}</style>

      <div className="wa-wrapper">
        {hovered && (
          <div className="wa-tooltip">
            💬 Chat with us on WhatsApp
          </div>
        )}

        <div
          className="wa-btn-container"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleWhatsAppClick}
          role="button"
          aria-label="Chat on WhatsApp"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleWhatsAppClick()}
        >
          <div className="wa-ring" />
          <div className="wa-ring2" />
          <button className="wa-btn" tabIndex={-1}>
            <svg className="wa-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.463.666 4.768 1.822 6.756L2 30l7.454-1.794A13.93 13.93 0 0 0 16.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.472a11.43 11.43 0 0 1-5.836-1.598l-.418-.25-4.422 1.064 1.11-4.308-.275-.44A11.432 11.432 0 0 1 4.527 16c0-6.326 5.15-11.477 11.477-11.477S27.48 9.674 27.48 16c0 6.327-5.15 11.472-11.476 11.472zm6.29-8.583c-.344-.172-2.037-1.005-2.352-1.12-.316-.113-.545-.172-.775.172-.23.343-.888 1.12-1.09 1.35-.2.23-.402.258-.746.086-.344-.172-1.452-.534-2.766-1.706-1.022-.912-1.712-2.037-1.912-2.38-.2-.344-.022-.53.15-.7.155-.154.344-.402.516-.602.172-.2.23-.344.344-.574.114-.23.057-.43-.028-.602-.086-.172-.775-1.87-1.063-2.56-.278-.67-.562-.578-.775-.588l-.66-.012a1.265 1.265 0 0 0-.917.43c-.315.343-1.205 1.178-1.205 2.873s1.233 3.333 1.405 3.562c.172.23 2.427 3.707 5.88 5.198.822.355 1.462.567 1.963.726.823.262 1.572.225 2.164.137.66-.1 2.037-.832 2.323-1.636.287-.804.287-1.492.2-1.636-.083-.143-.314-.23-.66-.402z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}