import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1400);
    const hideTimer = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-900 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Fork + knife icon (SVG inline) */}
      <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-500/30">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4v8c0 2.2 1.8 4 4 4v10a2 2 0 0 0 4 0V4"
            stroke="#422AFB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 4v24"
            stroke="#422AFB"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22 4c0 0 4 2 4 8h-4"
            stroke="#422AFB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold text-white font-poppins">Scan</span>
        <span className="text-2xl font-bold text-brand-500 font-poppins">
          &
        </span>
        <span className="text-2xl font-bold text-white font-poppins">Dine</span>
      </div>
      <p className="text-gray-600 text-sm mb-8">Restaurant Admin</p>

      {/* Progress bar */}
      <div className="w-40 h-1 bg-navy-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-brand-500 to-brandLinear rounded-full animate-[preload_1.4s_ease-in-out_forwards]" />
      </div>
    </div>
  );
}
