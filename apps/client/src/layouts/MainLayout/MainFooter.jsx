import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Restaurants", href: "/restaurants" },
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    heading: "For Restaurants",
    links: [
      {
        label: "Partner With Us",
        href:
          import.meta.env.VITE_RESTAURANT_ADMIN_URL || "http://localhost:5174",
        external: true,
      },
      {
        label: "Restaurant Dashboard",
        href:
          import.meta.env.VITE_RESTAURANT_ADMIN_URL || "http://localhost:5174",
        external: true,
      },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const MainFooter = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border pt-20 pb-10 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none dark:opacity-20" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* ─── Main Footer Grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand & Developer Column */}
          <div className="col-span-2">
            <Logo size="md" className="mb-5" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-ui mb-8">
              Scan & Dine is a modern QR-powered restaurant ecosystem helping
              restaurants streamline operations and elevate guest experiences.
            </p>

            <div className="space-y-1.5 p-5 bg-card border border-border inline-block rounded-none-force shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-ui font-bold">
                Developed By
              </p>
              <p className="font-display font-bold text-foreground text-lg tracking-tight">
                Sukharanjan Jana
              </p>
              <a
                href="https://github.com/sukh767"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-brand hover:underline text-sm font-ui font-medium transition-all"
              >
                github.com/sukh767
                <ArrowUpRight
                  size={14}
                  className="text-muted-foreground group-hover:text-brand transition-colors"
                />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-foreground font-ui font-bold text-xs uppercase tracking-widest mb-6">
                {col.heading}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand transition-colors font-ui"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                        />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-brand transition-colors font-ui"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Restaurant Partner CTA ─── */}
        <div className="mb-16 border border-border bg-card p-8 sm:p-10 rounded-none-force shadow-sm relative overflow-hidden group">
          {/* Subtle Hover Accent */}
          <div className="absolute inset-0 bg-brand/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">
                Own a Restaurant?
              </h3>
              <p className="text-muted-foreground font-ui text-sm sm:text-base max-w-lg">
                Join Scan & Dine and start accepting QR-powered orders,
                reservations, and streamline your table management today.
              </p>
            </div>

            <a
              href={
                import.meta.env.VITE_RESTAURANT_ADMIN_URL ||
                "http://localhost:5174"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand text-brand-foreground font-ui font-bold text-xs uppercase tracking-widest transition-all hover:opacity-90 shadow-brand-sm rounded-none-force shrink-0 group/btn"
            >
              List Your Restaurant
              <ArrowRight
                size={16}
                className="ml-3 group-hover/btn:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground font-ui font-medium">
            &copy; {new Date().getFullYear()} Scan & Dine. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-ui font-medium">
            <span>Built with</span>
            <Heart
              size={12}
              className="text-red-500 fill-red-500 animate-pulse"
            />
            <span>by Sukharanjan Jana</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
