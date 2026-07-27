import InputField from "@/components/fields/InputField";
import SelectField from "@/components/onboarding/fields/SelectField";
import TextareaField from "@/components/onboarding/fields/TextareaField";

const priceRanges = [
  { value: "₹", label: "₹ — Budget Friendly" },
  { value: "₹₹", label: "₹₹ — Moderate" },
  { value: "₹₹₹", label: "₹₹₹ — Fine Dining" },
  { value: "₹₹₹₹", label: "₹₹₹₹ — Premium Luxury" },
];

export default function Step1BasicInfo({ data, updateData }) {
  const f = (field) => ({
    value: data[field] || "",
    onChange: (e) => updateData({ [field]: e.target.value }),
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField
          label="Restaurant Name"
          id="ob-name"
          placeholder="e.g. Spice Garden"
          required
          {...f("name")}
        />
        <SelectField
          label="Price Range"
          id="ob-price"
          options={priceRanges}
          value={data.priceRange}
          onChange={(e) => updateData({ priceRange: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField
          label="Email Address"
          id="ob-email"
          type="email"
          placeholder="hello@restaurant.com"
          required
          {...f("email")}
        />
        <InputField
          label="Phone Number"
          id="ob-phone"
          type="tel"
          placeholder="+91 98765 43210"
          required
          {...f("phone")}
        />
      </div>

      <InputField
        label="Website (optional)"
        id="ob-website"
        type="url"
        placeholder="https://yourrestaurant.com"
        {...f("website")}
      />

      <TextareaField
        label="Description"
        id="ob-desc"
        placeholder="Tell customers about your restaurant, culinary specialties, ambiance..."
        rows={4}
        value={data.description}
        onChange={(e) => updateData({ description: e.target.value })}
      />
    </div>
  );
}
