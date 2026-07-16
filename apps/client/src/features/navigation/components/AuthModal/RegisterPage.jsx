import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
// import { CustomCursor } from '@/components/common/CustomCursor';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  User,
  Store,
  Loader2,
  Check,
} from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  { n: 1, label: "Account" },
  { n: 2, label: "Restaurant" },
  { n: 3, label: "Confirm" },
];

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    restaurantName: "",
    restaurantCity: "",
    cuisineType: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      next();
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    navigate("/admin");
  };

  const cuisineOptions = [
    "Contemporary",
    "Italian",
    "Japanese",
    "Indian",
    "American",
    "Mexican",
    "Mediterranean",
    "French",
    "Asian",
    "Other",
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* <CustomCursor /> */}

      {/* Left visual */}
      <div className="hidden lg:flex flex-col w-5/12 relative overflow-hidden bg-brand-dark-bg">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"
            className="w-full h-full object-cover opacity-20"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-bg via-brand-dark-bg/80 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-20" />

        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-orange/8 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 flex flex-col h-full p-12">
          <Link to="/">
            <Logo size="md" theme="dark" />
          </Link>
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <p className="text-brand-orange text-xs font-ui tracking-[0.25em] uppercase mb-4">
                — Join the platform
              </p>
              <h2 className="font-display text-4xl font-bold text-white leading-[1.05] mb-6">
                Get your restaurant
                <br />
                <em className="not-italic text-gradient">live in 24 hours.</em>
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-sm font-body">
                Set up your digital menu, generate QR codes, and start taking
                orders before tomorrow's service.
              </p>
            </motion.div>

            {/* Step indicators vertical */}
            <div className="mt-12 space-y-0">
              {steps.map((s, i) => (
                <div key={s.n} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-7 h-7 flex items-center justify-center text-xs font-ui font-bold transition-all",
                        step > s.n
                          ? "bg-brand-orange text-white"
                          : step === s.n
                            ? "border-2 border-brand-orange text-brand-orange"
                            : "border border-white/20 text-white/30",
                      )}
                    >
                      {step > s.n ? <Check size={12} /> : s.n}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={cn(
                          "w-px flex-1 min-h-8 mt-1",
                          step > s.n ? "bg-brand-orange/50" : "bg-white/10",
                        )}
                      />
                    )}
                  </div>
                  <div className="pb-8">
                    <p
                      className={cn(
                        "text-sm font-ui font-semibold mt-1",
                        step >= s.n ? "text-white" : "text-white/30",
                      )}
                    >
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/8 p-5">
            <p className="text-white/50 text-xs font-ui">
              14-day free trial · No credit card · Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-16">
        <div className="lg:hidden mb-8">
          <Link to="/">
            <Logo size="md" />
          </Link>
        </div>

        <motion.div className="w-full max-w-md">
          {/* Mobile step indicator */}
          <div className="lg:hidden flex items-center gap-0 mb-8">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div
                  className={cn(
                    "w-7 h-7 flex items-center justify-center text-xs font-ui font-bold",
                    step > s.n
                      ? "bg-brand-orange text-white"
                      : step === s.n
                        ? "border-2 border-brand-orange text-brand-orange"
                        : "border border-border text-muted-foreground",
                  )}
                >
                  {step > s.n ? <Check size={11} /> : s.n}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px",
                      step > s.n ? "bg-brand-orange/50" : "bg-border",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {step === 1
                ? "Create your account."
                : step === 2
                  ? "Your restaurant."
                  : "You're all set!"}
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              {step === 1 ? (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-brand-orange font-semibold hover:underline"
                  >
                    Sign in
                  </Link>
                </>
              ) : step === 2 ? (
                "Tell us about your restaurant"
              ) : (
                "Review your details and launch"
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-ui font-semibold text-foreground uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Your full name"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full pl-11 pr-4 py-3.5 bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand-orange/60 transition-colors"
                      />
                    </div>
                  </div>
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
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full pl-11 pr-4 py-3.5 bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand-orange/60 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-ui font-semibold text-foreground uppercase tracking-widest mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        className="w-full pl-11 pr-12 py-3.5 bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand-orange/60 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-ui font-semibold text-foreground uppercase tracking-widest mb-2">
                      Restaurant Name
                    </label>
                    <div className="relative">
                      <Store
                        size={15}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        type="text"
                        placeholder="e.g. The Golden Fork"
                        required
                        value={form.restaurantName}
                        onChange={(e) =>
                          setForm({ ...form, restaurantName: e.target.value })
                        }
                        className="w-full pl-11 pr-4 py-3.5 bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand-orange/60 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-ui font-semibold text-foreground uppercase tracking-widest mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco"
                      required
                      value={form.restaurantCity}
                      onChange={(e) =>
                        setForm({ ...form, restaurantCity: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm font-ui focus:outline-none focus:border-brand-orange/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-ui font-semibold text-foreground uppercase tracking-widest mb-2">
                      Cuisine Type
                    </label>
                    <select
                      value={form.cuisineType}
                      onChange={(e) =>
                        setForm({ ...form, cuisineType: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3.5 bg-card border border-border text-foreground text-sm font-ui focus:outline-none focus:border-brand-orange/60 transition-colors appearance-none"
                    >
                      <option value="">Select cuisine type</option>
                      {cuisineOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-4"
                >
                  <div className="bg-card border border-border p-5 space-y-3">
                    {[
                      { label: "Name", value: form.name },
                      { label: "Email", value: form.email },
                      { label: "Restaurant", value: form.restaurantName },
                      { label: "City", value: form.restaurantCity },
                      { label: "Cuisine", value: form.cuisineType },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between text-sm font-ui"
                      >
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-foreground font-semibold">
                          {value || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-0.5 accent-brand-orange flex-shrink-0"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground font-ui leading-relaxed"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-brand-orange hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-brand-orange hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="px-5 py-4 border border-border text-foreground font-ui font-semibold text-sm hover:border-foreground/30 transition-all"
                >
                  Back
                </button>
              )}
              <motion.button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-primary text-white font-ui font-bold text-sm hover:bg-primary-600 transition-all shadow-brand-sm disabled:opacity-60"
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : step < 3 ? (
                  <>
                    {" "}
                    Continue <ArrowRight size={14} />
                  </>
                ) : (
                  <>
                    {" "}
                    Launch Restaurant <ArrowRight size={14} />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
