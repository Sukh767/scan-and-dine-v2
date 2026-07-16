import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Mail, Lock, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@scan/auth";
import { toast } from "sonner";

// Updated to use currentColor mapping to --brand variable
function DiamondDecor({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path
        d="M24 2L46 24L24 46L2 24L24 2Z"
        className="stroke-brand"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      <circle cx="24" cy="24" r="3" className="fill-brand" fillOpacity="0.4" />
    </svg>
  );
}

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      if (!response?.success) {
        toast.error(response?.message || "Login failed");
        return;
      }

      if (response.success) {
        toast.success(response.message || "Login successful");
        navigate("/");

        return;
      }

      // Backend business errors
      console.error(response.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
      console.error(
        error?.response?.data?.message || error?.message || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left — Visual panel (Now fully theme-adaptive) */}
      <motion.div
        className="hidden lg:flex flex-col w-1/2 relative overflow-hidden bg-card border-r border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* BG image with theme-responsive overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1200"
            className="w-full h-full object-cover opacity-10 dark:opacity-20 mix-blend-luminosity"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-br from-card/95 via-card/80 to-transparent" />
        </div>

        {/* Textures from index.css */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-dots opacity-10 animate-grain" />

        {/* Animated brand glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Decorative SVGs */}
        <DiamondDecor className="absolute top-20 right-20 w-14 h-14 animate-float" />
        <DiamondDecor className="absolute bottom-32 left-16 w-10 h-10 animate-float-delay opacity-40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12">
          <Link to="/">
            <Logo size="md" />
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-brand text-xs font-ui tracking-[0.25em] uppercase mb-4 font-bold">
                — Restaurant Platform
              </p>
              <h2 className="font-display text-4xl font-bold text-foreground leading-[1.05] mb-6">
                Run your restaurant
                <br />
                <em className="not-italic text-gradient">like never before.</em>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm font-ui">
                QR-powered dining sessions, real-time kitchen management, and
                deep analytics — all in one elegant platform.
              </p>
            </motion.div>

            {/* Feature list */}
            <motion.div
              className="mt-10 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                "Instant QR dining sessions",
                "Real-time kitchen display",
                "Revenue analytics dashboard",
                "Multi-table management",
              ].map((f, i) => (
                <motion.div
                  key={f}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="w-4 h-4 border border-brand/40 flex items-center justify-center rounded-none-force bg-card">
                    <div className="w-1.5 h-1.5 bg-brand" />
                  </div>
                  <span className="text-muted-foreground text-sm font-ui">
                    {f}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom quote */}
          <motion.div
            className="relative border border-border p-5 rounded-none-force glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute -top-3 left-5 w-6 h-6 bg-card border border-border flex items-center justify-center">
              <span className="text-brand font-display text-2xl leading-none mt-2">
                "
              </span>
            </div>
            <p className="text-foreground/80 text-sm italic font-ui leading-relaxed">
              Scan & Dine transformed our table turnover by 30% in the first
              month.
            </p>
            <p className="text-muted-foreground text-xs mt-3 font-ui font-semibold">
              — Marcus Webb, Ember & Oak
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right — Form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-16 relative">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link to="/">
            <Logo size="md" />
          </Link>
        </div>

        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back.
            </h1>
            <p className="text-muted-foreground text-sm font-ui">
              Sign in to your restaurant dashboard.{" "}
              <Link
                to="/register"
                className="text-brand font-bold hover:underline transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-ui font-semibold text-foreground uppercase tracking-widest mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  placeholder="you@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/30 transition-all rounded-none-force"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-ui font-semibold text-foreground uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="#"
                  className="text-xs text-brand hover:underline font-ui transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/30 transition-all rounded-none-force"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-brand text-brand-foreground font-ui font-bold text-sm hover:opacity-90 transition-all shadow-brand-sm disabled:opacity-60 mt-4 rounded-none-force"
              whileTap={{ scale: 0.99 }}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={14} />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-muted-foreground text-xs mt-8 text-center font-ui leading-relaxed">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-brand hover:underline transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-brand hover:underline transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
