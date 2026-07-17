import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  Check,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@scan/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Interactive Diner Pull-Chain Theme Toggle ────────────────
const ThemePullChain = () => {
  const handleDragEnd = (event, info) => {
    // If pulled down more than 40px, trigger the theme toggle
    if (info.offset.y > 40) {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <div className="absolute top-0 right-10 md:right-24 z-50 flex flex-col items-center">
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 80 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing w-16"
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-[2px] h-16 sm:h-24 bg-gradient-to-b from-foreground/40 to-foreground/20" />
        <div className="w-5 h-8 bg-brand border-2 border-brand-foreground/20 rounded-b-full rounded-t-sm shadow-[0_10px_20px_rgba(233,90,43,0.4)] flex items-end justify-center pb-1">
          <div className="w-2 h-2 bg-brand-foreground/30 rounded-full" />
        </div>
      </motion.div>
      <span className="text-[9px] font-ui font-bold text-muted-foreground uppercase tracking-widest mt-2 select-none opacity-50">
        Pull Theme
      </span>
    </div>
  );
};

// ─── Main Login Component ─────────────────────────────────────
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

  // Simple visual validation checks
  const isEmailValid = email.includes("@") && email.includes(".");
  const isPassValid = password.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-background relative overflow-hidden">
      <ThemePullChain />

      {/* Ambient Background Glows & Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Floating Card Container (Bento Style) */}
      <motion.div
        className="w-full max-w-[1000px] bg-card border border-border shadow-2xl relative z-10 flex flex-col lg:flex-row min-h-[600px] rounded-none-force"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Side: Visual / Brand Context */}
        <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-zinc-950 p-10 flex-col justify-between border-r border-border/10">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="w-full h-full object-cover opacity-40 grayscale-[20%]"
              alt="Restaurant Service"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent opacity-80" />
          </div>

          <div className="relative z-10">
            <Link to="/">
              <Logo size="md" theme="dark" />
            </Link>
          </div>

          <div className="relative z-10 mb-8">
            <span className="inline-block px-3 py-1 bg-brand/20 border border-brand/30 text-brand text-[10px] font-ui font-bold tracking-[0.2em] uppercase mb-4 rounded-none-force backdrop-blur-sm">
              Welcome Back
            </span>
            <h2 className="font-display text-4xl font-bold text-white leading-[1.1] mb-4">
              Resume your
              <br />
              <span className="text-gradient drop-shadow-sm">Service.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed font-ui max-w-[250px]">
              Access your dashboard to manage active sessions, kitchen flow, and
              real-time analytics.
            </p>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-card">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-sm mx-auto w-full"
          >
            {/* Mobile Logo Fallback */}
            <div className="lg:hidden mb-10 flex justify-center">
              <Logo size="md" />
            </div>

            {/* Centered Header */}
            <div className="mb-10 text-center flex flex-col items-center">
              <h1 className="font-display text-4xl font-black text-foreground mb-2">
                Sign In
              </h1>
              <p className="text-muted-foreground text-sm font-ui font-medium">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-brand font-bold hover:underline transition-colors"
                >
                  Create one
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-ui font-bold text-muted-foreground mb-2">
                  Your Email
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={16}
                    className="absolute left-4 text-muted-foreground"
                  />
                  <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:bg-card transition-colors rounded-none-force"
                  />
                  {isEmailValid && (
                    <Check
                      size={16}
                      className="absolute right-4 text-emerald-500"
                    />
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-ui font-bold text-muted-foreground">
                    Your Password
                  </label>
                  <Link
                    to="#"
                    className="text-xs text-brand hover:underline font-ui font-bold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock
                    size={16}
                    className="absolute left-4 text-muted-foreground"
                  />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-20 py-3.5 bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:bg-card transition-colors rounded-none-force"
                  />
                  <div className="absolute right-4 flex items-center gap-3">
                    {isPassValid && (
                      <Check size={16} className="text-emerald-500" />
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-foreground text-background font-ui font-bold text-sm hover:opacity-90 transition-all shadow-md disabled:opacity-60 rounded-none-force group"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Sign In{" "}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>

              {/* Social Logins */}
              <div className="pt-6">
                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <span className="relative px-4 bg-card text-xs font-ui font-medium text-muted-foreground uppercase">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 border border-border bg-transparent text-foreground hover:bg-accent transition-colors font-ui text-xs font-bold rounded-none-force"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 border border-border bg-transparent text-foreground hover:bg-accent transition-colors font-ui text-xs font-bold rounded-none-force"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
