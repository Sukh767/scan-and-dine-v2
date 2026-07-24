import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/fields/InputField";
import Checkbox from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const navigate = useNavigate();

  // Controlled form state initialized with sample data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Frontend-only validation checks
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Frontend confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Form submission console log payload
    console.log("Registration Form Payload:", formData);

    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    navigate("/admin/dashboard");
  };

  const handleGoogleSignUp = () => {
    console.log("Initiating Google Sign-Up...");
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[8vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Create an Account
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600 dark:text-gray-400">
          Set up your restaurant&apos;s admin account to get started.
        </p>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 transition-colors hover:bg-gray-100 dark:hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign Up with Google
          </h5>
        </button>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white">or</p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Full Name*"
            placeholder="Tony Stark"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            state={errors.name ? "error" : undefined}
            helperText={errors.name}
            disabled={loading}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="peetersparker617@gmail.com"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            state={errors.email ? "error" : undefined}
            helperText={errors.email}
            disabled={loading}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Phone Number*"
            placeholder="9876543210"
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            state={errors.phone ? "error" : undefined}
            helperText={errors.phone}
            disabled={loading}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Password@123"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            state={errors.password ? "error" : undefined}
            helperText={
              errors.password ||
              "At least 8 characters with letters, numbers & symbols"
            }
            disabled={loading}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Confirm Password*"
            placeholder="Re-enter your password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            state={errors.confirmPassword ? "error" : undefined}
            helperText={errors.confirmPassword}
            disabled={loading}
          />

          {/* Terms Checkbox */}
          <div className="mb-4 flex flex-col px-2">
            <label className="flex items-center cursor-pointer select-none">
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                disabled={loading}
              />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-brand-500 hover:text-brand-600 transition-colors"
                >
                  Terms &amp; Conditions
                </a>
              </p>
            </label>
            {errors.agreeTerms && (
              <span className="mt-1 ml-1 text-xs text-red-500 dark:text-red-400">
                {errors.agreeTerms}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Creating account…</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Enhanced Footer Links Layout */}
        <div className="mt-5 flex flex-col gap-3">
          {/* Primary Sign-In Link */}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-400">
              Already have an account?
            </span>
            <Link
              to="/auth/sign-in"
              className="text-sm font-bold text-brand-500 hover:text-brand-600 dark:text-white transition-colors ml-1"
            >
              Sign In
            </Link>
          </div>

          {/* Secondary Onboarding Callout */}
          <div className="pt-2 border-t border-gray-200 dark:border-white/10">
            <Link
              to="/onboarding"
              className="group flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 transition-colors"
            >
              <span>Setting up a new restaurant?</span>
              <span className="font-semibold text-brand-500 dark:text-brand-400 group-hover:text-brand-600 dark:group-hover:text-brand-300 flex items-center gap-0.5">
                Start onboarding
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
