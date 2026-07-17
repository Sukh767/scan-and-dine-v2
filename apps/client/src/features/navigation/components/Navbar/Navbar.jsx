import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ArrowUpRight,
  X,
  ArrowRight,
  Menu,
  LogOut,
  User,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import { ThemeSwitcher } from "@/shared/components/ThemeSwitcher";

// 1. Import your auth store
import { useAuth } from "@scan/auth";
import { toast } from "sonner";

const featuresDropdown = [
  {
    label: "QR Dining Sessions",
    desc: "Scan-to-order flow",
    href: "/features",
  },
  {
    label: "Kitchen Display",
    desc: "Real-time order board",
    href: "/features",
  },
  {
    label: "Analytics Dashboard",
    desc: "Revenue & insights",
    href: "/features",
  },
  {
    label: "Table Management",
    desc: "Visual floor management",
    href: "/features",
  },
];

const blogsDropdown = [
  { label: "The Future of QR Dining", desc: "Trends & insights", href: "#" },
  { label: "Increasing Table Turnover", desc: "Operational guide", href: "#" },
  {
    label: "Restaurant Tech Stack 2025",
    desc: "Tools & integrations",
    href: "#",
  },
];

const navLinks = [
  { label: "Discovery", to: "/app" },
  { label: "Features", to: "/features", dropdown: featuresDropdown },
  { label: "Restaurants", to: "/#restaurants" },
  { label: "Blog", to: "#", dropdown: blogsDropdown },
  { label: "Contact", to: "#contact" },
];

// ─── Desktop Nav Dropdown Component ────────────────────────────
function NavDropdown({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 mt-2 w-64 bg-card border border-border shadow-xl overflow-hidden z-50 rounded-none-force"
          initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top" }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={item.href}
                className="group flex items-start gap-3 px-5 py-4 hover:bg-accent transition-colors border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-ui font-semibold text-foreground group-hover:text-brand transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <ArrowUpRight
                  size={12}
                  className="text-muted-foreground group-hover:text-brand mt-0.5 transition-colors shrink-0"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Authenticated Profile Dropdown ────────────────────────────
function ProfileDropdown({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  // Get first letter of name for Avatar fallback
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div
      className="relative ml-2"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button className="flex items-center gap-2 p-1.5 hover:bg-accent transition-colors rounded-none-force border border-transparent hover:border-border">
        <div className="w-8 h-8 bg-brand/10 text-brand flex items-center justify-center font-ui font-bold text-sm">
          {initial}
        </div>
        <ChevronDown size={14} className="text-muted-foreground mr-1" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-56 bg-card border border-border shadow-xl overflow-hidden z-50 rounded-none-force"
            initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top right" }}
          >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <p className="text-sm font-ui font-semibold text-foreground truncate">
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "guest@restaurant.com"}
              </p>
            </div>

            {/* Links */}
            <div className="py-1 flex flex-col">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-ui text-foreground/80 hover:text-brand hover:bg-accent transition-colors"
              >
                <User size={15} /> My Profile
              </Link>
              <Link
                to="/orders"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-ui text-foreground/80 hover:text-brand hover:bg-accent transition-colors"
              >
                <ShoppingBag size={15} /> Orders
              </Link>
              <Link
                to="/bookings"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-ui text-foreground/80 hover:text-brand hover:bg-accent transition-colors border-b border-border"
              >
                <Calendar size={15} /> Bookings
              </Link>

              {/* Logout Action */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-ui text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-colors w-full text-left"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Full-screen mobile menu ───────────────────────────────────
function FullScreenMenu({ open, onClose, isAuthenticated, user, logout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log("Logout response:", response);

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to logout");

      throw error;
    }

    onClose();
    navigate("/");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 bg-background/98 backdrop-blur-xl text-foreground overflow-hidden flex flex-col"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Base Textures and Overlays */}
          <div className="absolute inset-0 bg-noise opacity-25 pointer-events-none" />
          <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none animate-grain" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 blur-3xl pointer-events-none transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/15 blur-3xl pointer-events-none transition-colors duration-500" />

          {/* Header Area */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border relative z-10 bg-transparent">
            <Logo size="md" />
            <motion.button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-border text-foreground hover:border-brand hover:text-brand transition-colors rounded-none-force"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col px-6 pt-8 space-y-1 relative z-10 overflow-y-auto flex-1 scrollbar-thin">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="group flex items-center justify-between py-5 border-b border-border hover:border-brand/40 transition-colors"
                >
                  <span className="font-display text-3xl text-foreground/80 group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground group-hover:text-brand transition-colors"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Conditional Bottom Layout CTAs (Auth vs Unauth) */}
          <motion.div
            className="relative z-10 px-6 py-8 flex flex-col gap-3 safe-bottom border-t border-border bg-background/50 backdrop-blur-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {isAuthenticated ? (
              <>
                <div className="mb-2 pb-4 border-b border-border">
                  <p className="text-sm font-ui font-semibold text-foreground">
                    {user?.name || "Welcome back"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 py-3 border border-border text-xs font-ui hover:bg-accent transition-colors"
                  >
                    <User size={14} /> Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 py-3 border border-border text-xs font-ui hover:bg-accent transition-colors"
                  >
                    <ShoppingBag size={14} /> Orders
                  </Link>
                  <Link
                    to="/bookings"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 py-3 border border-border text-xs font-ui hover:bg-accent transition-colors col-span-2"
                  >
                    <Calendar size={14} /> Bookings
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-4 border border-red-500/30 text-red-500 font-ui font-semibold text-sm hover:bg-red-500/10 transition-all rounded-none-force"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="w-full text-center py-4 border border-border text-foreground font-ui font-semibold text-sm hover:border-brand hover:text-brand transition-all rounded-none-force bg-background/40"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="w-full text-center py-4 bg-brand text-brand-foreground font-ui font-bold text-sm hover:opacity-90 transition-all shadow-brand-sm rounded-none-force"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Exported Navbar Component ─────────────────────────────
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownTimeout = useRef(null);

  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  const handleDropdownEnter = (label) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-2xl border-b border-border shadow-sm"
            : "bg-transparent",
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/">
              <Logo size="md" animated />
            </Link>

            {/* Desktop Navigation Link Cluster */}
            <nav className="hidden lg:flex items-center gap-0">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown ? handleDropdownEnter(link.label) : undefined
                  }
                  onMouseLeave={link.dropdown ? handleDropdownLeave : undefined}
                >
                  <Link
                    to={link.to}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2.5 text-sm font-ui font-medium transition-all duration-200",
                      location.pathname === link.to
                        ? "text-brand"
                        : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {link.dropdown && (
                      <motion.div
                        animate={{
                          rotate: activeDropdown === link.label ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={13} />
                      </motion.div>
                    )}
                  </Link>
                  {link.dropdown && (
                    <NavDropdown
                      items={link.dropdown}
                      isOpen={activeDropdown === link.label}
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Right Action Stack */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeSwitcher />

              {/* Conditional Auth Rendering */}
              {isAuthenticated ? (
                <ProfileDropdown user={user} logout={logout} />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-ui font-medium text-foreground/80 hover:text-foreground border border-border hover:border-foreground/40 transition-all rounded-none-force bg-background/20 ml-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="group flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground text-sm font-ui font-bold hover:opacity-90 transition-all shadow-brand-sm overflow-hidden relative rounded-none-force"
                  >
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight
                      size={14}
                      className="relative z-10 group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </>
              )}
            </div>

            {/* Responsive Action Buttons (Mobile View) */}
            <div className="lg:hidden flex items-center gap-1">
              <ThemeSwitcher compact />
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2.5 text-foreground hover:bg-accent transition-colors rounded-none-force"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Render Portal Panel */}
      <FullScreenMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
      />
    </>
  );
};

export default Navbar;
