import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@scan/auth";

// ─── Interactive Diner Pull-Chain Theme Toggle ────────────────
const ThemePullChain = () => {
  const handleDragEnd = (event, info) => {
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
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing hover:cursor-pointer w-16"
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

// ─── Main Reset Password Component ────────────────────────────
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [countdown, setCountdown] = useState(5);

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const isPassValid = password.length >= 6;

  // Extract the reset API function from your auth context
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Missing reset token.");
      return;
    }

    if (!isPassValid) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setStatus("loading");

      // ─── BACKEND INTEGRATION ───
      // Payload matches backend expectation exactly: { token, password }
      const response = await resetPassword({
        token,
        password,
      });

      console.log("Reset Password Response:", response);

      if (!response?.success) {
        toast.error(response?.message || "Failed to reset password.");
        setStatus("idle");
        return;
      }

      setStatus("success");
      toast.success(response?.message || "Password updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to reset password.",
      );
      setStatus("idle");
    }
  };

  // Handle auto-redirect countdown after success
  useEffect(() => {
    let timer;
    if (status === "success" && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (status === "success" && countdown === 0) {
      navigate("/login");
    }
    return () => clearTimeout(timer);
  }, [status, countdown, navigate]);

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

      {/* Main Floating Card Container */}
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
              src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="w-full h-full object-cover opacity-30 grayscale-[20%]"
              alt="Security"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent opacity-80" />
          </div>

          <div className="relative z-10">
            <Link to="/" className="cursor-pointer">
              <Logo size="md" theme="dark" />
            </Link>
          </div>

          <div className="relative z-10 mb-8">
            <span className="inline-block px-3 py-1 bg-brand/20 border border-brand/30 text-brand text-[10px] font-ui font-bold tracking-[0.2em] uppercase mb-4 rounded-none-force backdrop-blur-sm">
              Security
            </span>
            <h2 className="font-display text-4xl font-bold text-white leading-[1.1] mb-4">
              Secure your
              <br />
              <span className="text-gradient drop-shadow-sm">Account.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed font-ui max-w-[250px]">
              Create a strong new password to regain access to your restaurant
              dashboard and active operations.
            </p>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-card overflow-hidden">
          {/* Mobile Logo Fallback */}
          <div className="lg:hidden mb-10 flex justify-center">
            <Link to="/" className="cursor-pointer">
              <Logo size="md" />
            </Link>
          </div>

          {!token ? (
            /* ─── MISSING TOKEN ERROR STATE ─── */
            <div className="text-center flex flex-col items-center max-w-sm mx-auto w-full">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 rounded-none-force">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <h1 className="font-display text-3xl font-black text-foreground mb-3">
                Invalid Request
              </h1>
              <p className="text-muted-foreground text-sm font-ui leading-relaxed mb-8">
                The password reset link is invalid or has expired. Please
                request a new link from the login page.
              </p>
              <Link
                to="/login"
                className="w-full py-4 border border-border text-foreground font-ui font-bold text-sm hover:bg-accent transition-all rounded-none-force inline-flex justify-center items-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* ─── SUCCESS STATE ─── */}
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center max-w-sm mx-auto"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 rounded-none-force shadow-inner">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                    Password Updated
                  </h2>
                  <p className="text-muted-foreground font-ui text-sm leading-relaxed mb-8">
                    Your password has been successfully reset. You can now use
                    your new password to sign in.
                  </p>

                  <div className="w-full border-t border-border pt-8 flex flex-col items-center">
                    <p className="text-xs font-ui text-muted-foreground uppercase tracking-widest mb-4 animate-pulse">
                      Redirecting to login in {countdown}s
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      className="flex items-center gap-2 text-brand font-ui font-bold text-sm hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      Click here to login now <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ─── RESET PASSWORD FORM ─── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-sm mx-auto w-full"
                >
                  <div className="mb-10 text-center flex flex-col items-center">
                    <h1 className="font-display text-3xl font-black text-foreground mb-3">
                      Create New Password
                    </h1>
                    <p className="text-muted-foreground text-sm font-ui font-medium">
                      Your new password must be different from previously used
                      passwords.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* New Password Input */}
                    <div>
                      <label className="block text-xs font-ui font-bold text-muted-foreground mb-2">
                        New Password
                      </label>
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
                            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            {showPass ? (
                              <EyeOff size={15} />
                            ) : (
                              <Eye size={15} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                      <label className="block text-xs font-ui font-bold text-muted-foreground mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative flex items-center">
                        <Lock
                          size={16}
                          className="absolute left-4 text-muted-foreground"
                        />
                        <input
                          type={showConfirmPass ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={cn(
                            "w-full pl-11 pr-20 py-3.5 bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:bg-card transition-colors rounded-none-force",
                            confirmPassword && !passwordsMatch
                              ? "border-red-500 focus:border-red-500"
                              : "focus:border-brand/60",
                          )}
                        />
                        <div className="absolute right-4 flex items-center gap-3">
                          {passwordsMatch && (
                            <Check size={16} className="text-emerald-500" />
                          )}
                          <button
                            type="button"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            {showConfirmPass ? (
                              <EyeOff size={15} />
                            ) : (
                              <Eye size={15} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={
                        status === "loading" || !passwordsMatch || !isPassValid
                      }
                      className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-foreground text-background font-ui font-bold text-sm hover:opacity-90 transition-all shadow-md disabled:opacity-60 rounded-none-force group cursor-pointer"
                    >
                      {status === "loading" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          Reset Password{" "}
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
