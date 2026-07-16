import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border pt-20 pb-10 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none dark:opacity-20" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16 border-b border-border pb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Logo size="md" className="mb-5" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-ui">
              The QR-powered restaurant SaaS platform transforming how people
              dine — and how restaurants operate.
            </p>
            {/* Theme-Adaptive SVG decoration */}
            <svg
              className="mt-6 opacity-40 text-brand"
              width="120"
              height="2"
              viewBox="0 0 120 2"
            >
              <line
                x1="0"
                y1="1"
                x2="120"
                y2="1"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Links Columns */}
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
              <h4 className="text-foreground font-ui font-bold text-xs uppercase tracking-widest mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-brand transition-colors font-ui"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-ui font-medium">
            &copy; {new Date().getFullYear()} Scan & Dine Inc. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-ui font-medium">
            <span>Built for the future of dining</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="ml-1 text-amber-500"
            >
              <path
                d="M8 2L9.8 6.2L14 6.9L11 9.8L11.6 14L8 12.1L4.4 14L5 9.8L2 6.9L6.2 6.2L8 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
