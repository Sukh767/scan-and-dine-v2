import { Logo } from "@/components/Logo";

const MainFooter = () => {
  return (
    <footer className="bg-brand-dark-bg text-white/60 border-t border-white/8 pt-20 pb-10 mt-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16 border-b border-white/8 pb-16">
          <div className="col-span-2">
            <Logo size="md" theme="dark" className="mb-5" />
            <p className="text-sm text-white/40 leading-relaxed max-w-xs font-body">
              The QR-powered restaurant SaaS platform transforming how people
              dine — and how restaurants operate.
            </p>
            {/* SVG decoration */}
            <svg
              className="mt-6 opacity-20"
              width="120"
              height="2"
              viewBox="0 0 120 2"
            >
              <line
                x1="0"
                y1="1"
                x2="120"
                y2="1"
                stroke="#C2440A"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
          {[
            {
              heading: "Product",
              links: ["Features", "Pricing", "Changelog", "Docs", "Status"],
            },
            {
              heading: "Company",
              links: ["About", "Blog", "Careers", "Press"],
            },
            {
              heading: "Legal",
              links: ["Privacy", "Terms", "Security", "Cookies"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-ui font-semibold text-xs uppercase tracking-widest mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/40 hover:text-white transition-colors font-body"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-ui">
            &copy; {new Date().getFullYear()} Scan & Dine Inc. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/30 font-ui">
            <span>Built for the future of dining</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="ml-1 opacity-60"
            >
              <path
                d="M8 2L9.8 6.2L14 6.9L11 9.8L11.6 14L8 12.1L4.4 14L5 9.8L2 6.9L6.2 6.2L8 2Z"
                fill="#C9A830"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
