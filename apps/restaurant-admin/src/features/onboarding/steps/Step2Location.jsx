import InputField from "@/components/fields/InputField";
import SelectField from "@/components/onboarding/fields/SelectField";
import { FiMapPin, FiNavigation } from "react-icons/fi";

const countries = [
  { value: "India", label: "India" },
  { value: "USA", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  { value: "UAE", label: "UAE" },
];

export default function Step2Location({ data, updateData }) {
  const f = (field) => ({
    value: data[field] || "",
    onChange: (e) => updateData({ [field]: e.target.value }),
  });

  return (
    <div className="flex flex-col gap-5">
      <InputField
        label="Street Address"
        id="ob-street"
        placeholder="123 MG Road, Building Name"
        required
        {...f("street")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField
          label="City"
          id="ob-city"
          placeholder="Hyderabad"
          required
          {...f("city")}
        />
        <InputField
          label="State / Province"
          id="ob-state"
          placeholder="Telangana"
          required
          {...f("state")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField
          label="Country"
          id="ob-country"
          options={countries}
          value={data.country}
          onChange={(e) => updateData({ country: e.target.value })}
        />
        <InputField
          label="Pin / Zip Code"
          id="ob-pincode"
          placeholder="500001"
          {...f("pincode")}
        />
      </div>

      {/* GPS GeoJSON Card */}
      <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-5 dark:border-brand-500/30 dark:bg-navy-900/60">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md">
            <FiMapPin className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
              GPS Coordinates{" "}
              <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-brand-500/10 text-brand-500">
                GeoJSON Format
              </span>
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">
              Used for QR table mapping & live customer navigation
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                label="Latitude"
                id="ob-lat"
                type="number"
                step="any"
                placeholder="17.385"
                value={data.lat || ""}
                onChange={(e) => updateData({ lat: e.target.value })}
              />
              <InputField
                label="Longitude"
                id="ob-lng"
                type="number"
                step="any"
                placeholder="78.4867"
                value={data.lng || ""}
                onChange={(e) => updateData({ lng: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
