import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/fields/InputField";
import Checkbox from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const navigate = useNavigate();

  // Controlled form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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

    // Clear error on user edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Basic client-side validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulated API Authentication request
      await new Promise((resolve) => setTimeout(resolve, 900));
      navigate("/admin/dashboard");
    } catch (err) {
      setErrors({ form: "Invalid email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth logic
    console.log("Initiating Google Sign-In...");
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-9 w-9 rounded-xl bg-brand-500 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 4v8c0 2.2 1.8 4 4 4v10a2 2 0 0 0 4 0V4"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 4v24M22 4c0 0 4 2 4 8h-4"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-navy-700 dark:text-white font-poppins">
            Scan<span className="text-brand-500">&amp;</span>Dine
          </span>
        </div>

        <h1 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h1>
        <p className="mb-9 ml-1 text-base text-gray-600 dark:text-gray-400">
          Welcome back! Enter your credentials to continue.
        </p>

        {/* Global Form Error Banner */}
        {errors.form && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800">
            {errors.form}
          </div>
        )}

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 transition-colors hover:bg-gray-100 dark:hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <span className="rounded-full text-xl">
            <FcGoogle />
          </span>
          <span className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </span>
        </button>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            or
          </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="admin@emberandoak.com"
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
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            state={errors.password ? "error" : undefined}
            helperText={errors.password}
            disabled={loading}
          />

          {/* Options Row */}
          <div className="mb-4 flex items-center justify-between px-2">
            <label className="flex items-center cursor-pointer select-none">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged in
              </span>
            </label>

            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white dark:hover:text-brand-300 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
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
                <span>Signing in…</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-5 flex flex-col gap-3">
          {/* Main Auth Switch Link */}
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <span className="text-navy-700 dark:text-gray-400">
              Don&apos;t have an account?
            </span>
            <Link
              to="/auth/register"
              className="text-brand-500 hover:text-brand-600 dark:text-white dark:hover:text-brand-300 transition-colors"
            >
              Create an account
            </Link>
          </div>

          {/* Secondary Action Box */}
          <div className="flex items-center justify-between rounded-xl bg-lightPrimary p-3.5 dark:bg-navy-800 border border-gray-100 dark:border-navy-700">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Setting up a new restaurant?
            </span>
            <Link
              to="/onboarding"
              className="text-xs font-bold text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors inline-flex items-center gap-1"
            >
              Start onboarding <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
