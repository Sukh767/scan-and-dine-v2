import { useRef } from "react";
import InputField from "@/components/fields/InputField";
import { FiUploadCloud, FiImage, FiTrash2 } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Step5Media({ data, updateData }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) updateData({ logo: file });
  };

  const social = (field) => ({
    value: data[field] || "",
    onChange: (e) => updateData({ [field]: e.target.value }),
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Upload Zone */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
          Restaurant Logo
        </p>

        <div
          onClick={() => fileRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
            data.logo
              ? "border-brand-500 bg-brand-500/5 dark:bg-navy-900"
              : "border-gray-300 bg-lightPrimary hover:border-brand-500 dark:border-navy-700 dark:bg-navy-900"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

          {data.logo ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg dark:bg-brand-400">
                <FiImage className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {data.logo.name}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  updateData({ logo: null });
                }}
                className="flex items-center gap-1 text-xs text-red-500 font-bold hover:underline"
              >
                <FiTrash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 dark:text-brand-300 group-hover:scale-110 transition-transform">
                <FiUploadCloud className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Click to upload logo
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                PNG, JPG, SVG up to 5MB (Recommended 512×512px)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Social Media Inputs */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
          Social Media Links (optional)
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1877f2] text-white shadow-sm">
              <FaFacebook className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <InputField
                id="ob-fb"
                placeholder="https://facebook.com/spicegarden"
                type="url"
                {...social("facebook")}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm">
              <FaInstagram className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <InputField
                id="ob-ig"
                placeholder="https://instagram.com/spicegarden"
                type="url"
                {...social("instagram")}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black dark:bg-white dark:text-black text-white shadow-sm">
              <FaXTwitter className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <InputField
                id="ob-x"
                placeholder="https://x.com/spicegarden"
                type="url"
                {...social("x")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
