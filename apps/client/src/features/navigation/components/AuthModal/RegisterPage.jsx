import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
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

// ─── Password Strength Indicator ─────────────────────────────
const PasswordStrength = ({ password }) => {
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return Math.min(score, 5);
  };

  const strength = getStrength(password);
  const bars = [
    { threshold: 1, color: "bg-destructive" },
    { threshold: 2, color: "bg-amber-500" },
    { threshold: 3, color: "bg-amber-500" },
    { threshold: 4, color: "bg-emerald-500" },
    { threshold: 5, color: "bg-emerald-500" },
  ];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {bars.map((bar, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 transition-colors",
              strength > i ? bar.color : "bg-muted-foreground/20",
            )}
          />
        ))}
      </div>
      <p className="text-[10px] font-ui text-muted-foreground uppercase tracking-wider">
        {strength <= 1 ? "Weak" : strength <= 3 ? "Medium" : "Strong"}
      </p>
    </div>
  );
};

// ─── Toast Notification Component ────────────────────────────
const Toast = ({ message, type = "success", onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        "fixed top-8 right-8 z-50 p-4 pr-10 border shadow-lg flex items-center gap-3 max-w-sm w-full",
        type === "success"
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
          : "bg-destructive/10 border-destructive/20 text-destructive",
        "backdrop-blur-md rounded-none-force",
      )}
    >
      {type === "success" ? (
        <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
      ) : (
        <X size={18} className="text-destructive flex-shrink-0" />
      )}
      <p className="text-sm font-ui font-medium">{message}</p>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

// ─── Main Register Component ──────────────────────────────────
const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [countdown, setCountdown] = useState(6);
  const [toast, setToast] = useState(null); // { message, type }

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Derived validation checks (live, after field touched)
  const isNameValid = form.name.length > 2;
  const isEmailValid = form.email.includes("@") && form.email.includes(".");
  const isPassValid = form.password.length >= 6;
  const doPasswordsMatch = form.password === form.confirmPassword;

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Validate all fields and return true if form is ready
  const validateForm = () => {
    const newErrors = {};
    if (!form.name || form.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (!isEmailValid) newErrors.email = "Enter a valid email address";
    if (!isPassValid)
      newErrors.password = "Password must be at least 6 characters";
    if (!doPasswordsMatch) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields as touched to show errors
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!validateForm()) return;

    setStatus("loading");
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1500));
      showToast("Verification email sent! Check your inbox.", "success");
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  // Auto-redirect after success
  useEffect(() => {
    let timer;
    if (status === "success" && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (status === "success" && countdown === 0) {
      navigate("/login");
    }
    return () => clearTimeout(timer);
  }, [status, countdown, navigate]);

  // Clear field error on change
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-background relative overflow-hidden">
      <ThemePullChain />

      {/* Background textures & glows – unchanged */}
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

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        className="w-full max-w-[1000px] bg-card border border-border shadow-2xl relative z-10 flex flex-col lg:flex-row min-h-[600px] rounded-none-force"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left side – unchanged */}
        <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-zinc-950 p-10 flex-col justify-between">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="w-full h-full object-cover opacity-40 grayscale-[20%]"
              alt=""
              loading="lazy"
              decoding="async"
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
              Hi, Welcome!
            </span>
            <h2 className="font-display text-4xl font-bold text-white leading-[1.1] mb-4">
              Let's Get
              <br />
              <span className="text-gradient drop-shadow-sm">Started.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed font-ui max-w-[250px]">
              Create a free account to gain full access to exclusive dining
              features and seamless ordering.
            </p>
          </div>
        </div>

        {/* Right side – form/success */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-card">
          <AnimatePresence mode="wait">
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
                  Check your inbox
                </h2>
                <p className="text-muted-foreground font-ui text-sm leading-relaxed mb-8">
                  We've sent a verification link to{" "}
                  <span className="font-bold text-foreground">
                    {form.email}
                  </span>
                  . Please verify your account to continue.
                </p>
                <div className="w-full border-t border-border pt-8 flex flex-col items-center">
                  <p className="text-xs font-ui text-muted-foreground uppercase tracking-widest mb-4 animate-pulse">
                    Redirecting to login in {countdown}s
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-brand font-ui font-bold text-sm hover:opacity-80 transition-opacity"
                  >
                    Click here to login now <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-sm mx-auto w-full"
              >
                <div className="lg:hidden mb-10 flex justify-center">
                  <Logo size="md" />
                </div>
                <div className="mb-10 text-center flex flex-col items-center">
                  <h1 className="font-display text-4xl font-black text-foreground mb-2">
                    Sign Up
                  </h1>
                  <p className="text-muted-foreground text-sm font-ui font-medium">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-brand font-bold hover:underline"
                    >
                      Login Here
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-ui font-bold text-muted-foreground mb-2">
                      Your Name
                    </label>
                    <div className="relative flex items-center">
                      <User
                        size={16}
                        className="absolute left-4 text-muted-foreground"
                      />
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        className={cn(
                          "w-full pl-11 pr-12 py-3.5 bg-muted/30 border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:bg-card transition-colors rounded-none-force",
                          errors.name && touched.name
                            ? "border-destructive"
                            : "border-border",
                        )}
                      />
                      {isNameValid && !errors.name && (
                        <Check
                          size={16}
                          className="absolute right-4 text-emerald-500"
                        />
                      )}
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-[10px] font-ui text-destructive mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

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
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, email: true }))
                        }
                        className={cn(
                          "w-full pl-11 pr-12 py-3.5 bg-muted/30 border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:bg-card transition-colors rounded-none-force",
                          errors.email && touched.email
                            ? "border-destructive"
                            : "border-border",
                        )}
                      />
                      {isEmailValid && !errors.email && (
                        <Check
                          size={16}
                          className="absolute right-4 text-emerald-500"
                        />
                      )}
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-[10px] font-ui text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-xs font-ui font-bold text-muted-foreground mb-2">
                      Password
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
                        value={form.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        onBlur={() =>
                          setTouched((t) => ({ ...t, password: true }))
                        }
                        className={cn(
                          "w-full pl-11 pr-20 py-3.5 bg-muted/30 border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:bg-card transition-colors rounded-none-force",
                          errors.password && touched.password
                            ? "border-destructive"
                            : "border-border",
                        )}
                      />
                      <div className="absolute right-4 flex items-center gap-3">
                        {isPassValid && !errors.password && (
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
                    {touched.password && errors.password && (
                      <p className="text-[10px] font-ui text-destructive mt-1">
                        {errors.password}
                      </p>
                    )}
                    <PasswordStrength password={form.password} />
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-xs font-ui font-bold text-muted-foreground mb-2">
                      Confirm Password
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
                        value={form.confirmPassword}
                        onChange={(e) =>
                          handleChange("confirmPassword", e.target.value)
                        }
                        onBlur={() =>
                          setTouched((t) => ({ ...t, confirmPassword: true }))
                        }
                        className={cn(
                          "w-full pl-11 pr-20 py-3.5 bg-muted/30 border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand/60 focus:bg-card transition-colors rounded-none-force",
                          errors.confirmPassword && touched.confirmPassword
                            ? "border-destructive"
                            : "border-border",
                        )}
                      />
                      <div className="absolute right-4 flex items-center gap-3">
                        {doPasswordsMatch &&
                          form.confirmPassword &&
                          !errors.confirmPassword && (
                            <Check size={16} className="text-emerald-500" />
                          )}
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPass ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>
                      </div>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-[10px] font-ui text-destructive mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-foreground text-background font-ui font-bold text-sm hover:opacity-90 transition-all shadow-md disabled:opacity-60 rounded-none-force"
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {/* Social Logins – unchanged */}
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
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
