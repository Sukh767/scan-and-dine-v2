import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFolder,
  FiMapPin,
  FiLayers,
  FiClock,
  FiImage,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { Spinner } from "@/components/ui/loader/Loader";
import { useTheme } from "@/context/ThemeContext";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2Location from "./steps/Step2Location";
import Step3Details from "./steps/Step3Details";
import Step4Hours from "./steps/Step4Hours";
import Step5Media from "./steps/Step5Media";
import { ImProfile } from "react-icons/im";

const STEPS = [
  {
    id: 1,
    title: "Basic Info",
    subtitle: "Restaurant details",
    icon: ImProfile,
    component: Step1BasicInfo,
  },
  {
    id: 2,
    title: "Location",
    subtitle: "Address & coordinates",
    icon: FiMapPin,
    component: Step2Location,
  },
  {
    id: 3,
    title: "Details",
    subtitle: "Cuisine & facilities",
    icon: FiLayers,
    component: Step3Details,
  },
  {
    id: 4,
    title: "Operating Hours",
    subtitle: "When are you open?",
    icon: FiClock,
    component: Step4Hours,
  },
  {
    id: 5,
    title: "Media & Social",
    subtitle: "Logo & social links",
    icon: FiImage,
    component: Step5Media,
  },
];

const defaultData = {
  // Step 1
  name: "",
  email: "",
  phone: "",
  description: "",
  website: "",
  priceRange: "₹₹",
  // Step 2
  street: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  lat: "",
  lng: "",
  // Step 3
  cuisineTypes: ["", "", ""],
  facilities: ["", "", ""],
  // Step 4
  operatingHours: {
    monday: { isOpen: true, open: "09:00", close: "22:00" },
    tuesday: { isOpen: true, open: "09:00", close: "22:00" },
    wednesday: { isOpen: true, open: "09:00", close: "22:00" },
    thursday: { isOpen: true, open: "09:00", close: "22:00" },
    friday: { isOpen: true, open: "09:00", close: "23:00" },
    saturday: { isOpen: true, open: "09:00", close: "23:00" },
    sunday: { isOpen: true, open: "10:00", close: "22:00" },
  },
  // Step 5
  logo: null,
  facebook: "",
  instagram: "",
  x: "",
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(defaultData);
  const [submitting, setSubmitting] = useState(false);

  const updateData = (updates) => setData((prev) => ({ ...prev, ...updates }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));

    // Backend payload format matching requested structure
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      description: data.description,
      website: data.website,
      priceRange: data.priceRange,
      cuisineTypes: data.cuisineTypes,
      facilities: data.facilities,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
        coordinates: {
          type: "Point",
          coordinates: [
            parseFloat(data.lng) || 78.4867,
            parseFloat(data.lat) || 17.385,
          ],
        },
      },
      operatingHours: data.operatingHours,
      socialMedia: {
        facebook: data.facebook,
        instagram: data.instagram,
        x: data.x,
      },
    };

    console.log(
      "[Backend Onboarding Payload]:",
      JSON.stringify(payload, null, 2),
    );
    setSubmitting(false);
    navigate("/admin/dashboard");
  };

  const CurrentStep = STEPS[step - 1].component;
  const progress = (step / STEPS.length) * 100;
  const isLast = step === STEPS.length;

  return (
    <div className="relative min-h-screen w-full bg-[#f4f7fe] dark:bg-[#0b1437] transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8 font-dm">
      {/* Top Navbar / Dark Mode Toggle */}
      <div className="mx-auto max-w-4xl flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-500 to-brand-400 text-white shadow-lg shadow-brand-500/30">
            <ImProfile className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-navy-700 dark:text-white leading-tight">
              Scan & Dine
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Partner Setup
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleDarkMode}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy-700 shadow-xl dark:bg-navy-800 dark:text-white hover:scale-105 active:scale-95 transition-all"
        >
          {darkMode ? (
            <FiSun className="h-5 w-5 text-amber-400" />
          ) : (
            <FiMoon className="h-5 w-5 text-indigo-600" />
          )}
        </button>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Header Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-700 dark:text-white tracking-tight">
            Restaurant Onboarding
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Complete step {step} of {STEPS.length} to launch your digital dining
            experience
          </p>
        </div>

        {/* Stepper Bar */}
        <div className="mb-6 rounded-[20px] bg-white p-5 shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none font-dm">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
            {STEPS.map((s) => {
              const StepIcon = s.icon;
              const isDone = step > s.id;
              const isActive = step === s.id;

              return (
                <div
                  key={s.id}
                  className="flex flex-1 min-w-[120px] items-center"
                >
                  <button
                    type="button"
                    onClick={() => setStep(s.id)}
                    className="group flex w-full items-center gap-3 text-left focus:outline-none"
                  >
                    {/* Step Icon Container */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                        isDone
                          ? "bg-green-500 text-white shadow-md"
                          : isActive
                            ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30 ring-4 ring-brand-500/20 dark:bg-brand-400 dark:shadow-brand-400/30 dark:ring-brand-400/20"
                            : "bg-lightPrimary text-gray-600 dark:bg-navy-900 dark:text-gray-400"
                      }`}
                    >
                      {isDone ? (
                        <FiCheck className="h-5 w-5 stroke-[3]" />
                      ) : (
                        <StepIcon className="h-4 w-4" />
                      )}
                    </div>

                    {/* Step Text Container */}
                    <div className="hidden md:block">
                      <p
                        className={`text-xs font-bold transition-colors ${
                          isActive
                            ? "text-brand-500 dark:text-white"
                            : isDone
                              ? "text-navy-700 dark:text-white"
                              : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {s.title}
                      </p>
                      <p className="max-w-[90px] truncate text-[10px] font-medium text-gray-500 dark:text-gray-400">
                        {s.subtitle}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Smooth Progress Bar */}
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-lightPrimary dark:bg-navy-900">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500 ease-out dark:bg-brand-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-3xl bg-white dark:bg-navy-800 p-6 sm:p-10 shadow-2xl shadow-shadow-500/10 dark:shadow-none border border-gray-100 dark:border-navy-700/60 mb-6 transition-all duration-300">
          <div className="mb-6 border-b border-gray-100 dark:border-navy-700 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-navy-700 dark:text-white">
                {STEPS[step - 1].title}
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5">
                {STEPS[step - 1].subtitle}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-400/20 dark:text-brand-300">
              Step {step} of {STEPS.length}
            </span>
          </div>

          <div key={step} className="animate-fade-in">
            <CurrentStep data={data} updateData={updateData} />
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={prev}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-navy-700 text-sm font-semibold text-navy-700 dark:text-white bg-white dark:bg-navy-800 hover:bg-gray-50 dark:hover:bg-navy-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <FiChevronLeft className="h-4 w-4" /> Back
          </button>

          {isLast ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 shadow-lg shadow-emerald-500/25 transition disabled:opacity-70 cursor-pointer"
            >
              {submitting ? (
                <Spinner size="sm" color="#ffffff" />
              ) : (
                <>
                  <FiCheck className="h-4 w-4 stroke-[3]" /> Complete Setup
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 active:bg-brand-700 shadow-lg shadow-brand-500/25 transition cursor-pointer"
            >
              Next <FiChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
