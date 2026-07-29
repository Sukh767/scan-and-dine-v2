import React, { useState, useEffect } from "react";
import {
  MdClose,
  MdAdd,
  MdDelete,
  MdCloudUpload,
  MdLink,
  MdImage,
} from "react-icons/md";

const SPICE_LEVELS = [
  { label: "None", value: "none" },
  { label: "Mild", value: "mild" },
  { label: "Medium", value: "medium" },
  { label: "Spicy", value: "spicy" },
  { label: "Extra Spicy", value: "extra_spicy" },
];

export default function MenuForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories = [],
}) {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    isVeg: false,
    isVegan: false,
    isJain: false,
    isGlutenFree: false,
    spiceLevel: "medium",
    preparationTime: 20,
    allowCustomNote: true,
    isFeatured: false,
    isBestSeller: false,
    isRecommended: false,
    sortOrder: 1,
    nutrition: {
      calories: "",
      servingSize: "",
    },
    variants: [],
  });

  // Image State (Files & URLs)
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        categoryId: initialData.categoryId || categories[0]?.id || "",
        price: initialData.price ?? "",
        description: initialData.description || "",
        isVeg: initialData.isVeg ?? false,
        isVegan: initialData.isVegan ?? false,
        isJain: initialData.isJain ?? false,
        isGlutenFree: initialData.isGlutenFree ?? false,
        spiceLevel: initialData.spiceLevel || "medium",
        preparationTime: initialData.preparationTime ?? 15,
        allowCustomNote: initialData.allowCustomNote ?? true,
        isFeatured: initialData.isFeatured ?? false,
        isBestSeller: initialData.isBestSeller ?? false,
        isRecommended: initialData.isRecommended ?? false,
        sortOrder: initialData.sortOrder ?? 1,
        nutrition: {
          calories: initialData.nutrition?.calories ?? "",
          servingSize: initialData.nutrition?.servingSize ?? "",
        },
        variants: initialData.variants || [],
      });

      // Populate existing images as URLs
      if (Array.isArray(initialData.images)) {
        setImageUrls(
          initialData.images.map((image) =>
            typeof image === "string" ? image : image.url,
          ),
        );
      } else if (initialData.image) {
        setImageUrls([initialData.image]);
      } else {
        setImageUrls([]);
      }
      setImageFiles([]);
    } else {
      setFormData({
        name: "",
        categoryId: categories[0]?.id || "",
        price: "",
        description: "",
        isVeg: false,
        isVegan: false,
        isJain: false,
        isGlutenFree: false,
        spiceLevel: "medium",
        preparationTime: 20,
        allowCustomNote: true,
        isFeatured: false,
        isBestSeller: false,
        isRecommended: false,
        sortOrder: 1,
        nutrition: {
          calories: "",
          servingSize: "",
        },
        variants: [],
      });
      setImageFiles([]);
      setImageUrls([]);
    }
    setUrlInput("");
  }, [initialData, isOpen, categories]);

  if (!isOpen) return null;

  // Basic Handlers
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNutritionChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      nutrition: { ...prev.nutrition, [field]: value },
    }));
  };

  // Image File Handlers
  const handleFileSelect = (e) => {
    console.log("Selected file:", e.target.files);

    if (e.target.files?.length) {
      const selectedFiles = Array.from(e.target.files);

      console.log("Saving:", selectedFiles);

      setImageFiles((prev) => {
        const updated = [...prev, ...selectedFiles];
        console.log("State becomes:", updated);
        return updated;
      });
    }
  };

  const handleRemoveFile = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Image URL Handlers
  const handleAddUrl = () => {
    if (urlInput.trim()) {
      setImageUrls((prev) => [...prev, urlInput.trim()]);
      setUrlInput("");
    }
  };

  const handleRemoveUrl = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Dynamic Variants Handlers
  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          name: "",
          price: "",
          isAvailable: true,
          sortOrder: prev.variants.length + 1,
        },
      ],
    }));
  };

  const handleRemoveVariant = (index) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price) || 0,
      preparationTime: Number(formData.preparationTime) || 0,
      sortOrder: Number(formData.sortOrder) || 1,
      nutrition: {
        calories: Number(formData.nutrition.calories) || 0,
        servingSize: formData.nutrition.servingSize,
      },
      variants: formData.variants.map((v, i) => ({
        name: v.name,
        price: Number(v.price) || 0,
        isAvailable: Boolean(v.isAvailable),
        sortOrder: Number(v.sortOrder) || i + 1,
      })),
      imageUrls,
      files: imageFiles, // Passed to API consumer for FormData wrapping
    };

    onSubmit(payload);

    console.log("Form submitted with payload:", payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 p-4 font-dm backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-[20px] bg-white p-6 shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none">
        {/* Modal Header */}
        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-white/10">
          <h2 className="text-xl font-bold text-navy-700 dark:text-white">
            {initialData ? "Edit Menu Item" : "Create Menu Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 transition-colors hover:text-navy-700 dark:text-gray-400 dark:hover:text-white"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <form
          onSubmit={handleSubmit}
          className="custom-scrollbar overflow-y-auto pr-2"
        >
          <div className="flex flex-col gap-6">
            {/* SECTION 1: General Info */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-400">
                General Info
              </span>

              <div>
                <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="flex h-12 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
                  placeholder="e.g., Chicken Biryani"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="flex h-12 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="flex h-12 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
                    placeholder="299"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                    Prep Time (mins)
                  </label>
                  <input
                    type="number"
                    value={formData.preparationTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preparationTime: e.target.value,
                      })
                    }
                    className="flex h-12 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
                    placeholder="25"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 bg-transparent p-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
                  placeholder="Hyderabadi dum biryani served with raita..."
                />
              </div>
            </div>

            {/* SECTION 2: Image Management (Files & URLs) */}
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-400">
                Item Images
              </span>

              {/* Upload Dropzone */}
              <div>
                <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                  Upload Image Files
                </label>
                <label className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 transition-colors hover:bg-gray-50 dark:border-white/10 dark:hover:bg-navy-900/50">
                  <MdCloudUpload
                    size={28}
                    className="text-brand-500 dark:text-brand-400"
                  />
                  <span className="mt-1 text-xs font-bold text-navy-700 dark:text-white">
                    Click to upload or drag & drop
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    PNG, JPG, or WEBP (Multiple allowed)
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>

              {/* External URL Input */}
              <div>
                <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                  Or Add Image URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex flex-1 items-center">
                    <MdLink
                      className="absolute left-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex h-11 w-full rounded-xl border border-gray-200 bg-transparent pl-9 pr-3 text-xs text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddUrl}
                    className="flex items-center gap-1 rounded-xl bg-lightPrimary px-4 text-xs font-bold text-navy-700 transition hover:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600"
                  >
                    <MdAdd size={16} /> Add URL
                  </button>
                </div>
              </div>

              {/* Combined Image Previews */}
              {(imageFiles.length > 0 || imageUrls.length > 0) && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-navy-700 dark:text-gray-300">
                    Selected Images ({imageFiles.length + imageUrls.length})
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {/* File Previews */}
                    {imageFiles.map((file, index) => (
                      <div
                        key={`file-${index}`}
                        className="relative h-20 w-20 overflow-hidden rounded-xl border border-brand-500/30 bg-gray-100 dark:bg-navy-900"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 rounded bg-brand-500/80 px-1 text-[9px] font-bold text-white">
                          File
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="absolute right-1 top-1 rounded-full bg-navy-900/70 p-1 text-white hover:bg-red-500 transition"
                        >
                          <MdClose size={12} />
                        </button>
                      </div>
                    ))}

                    {/* URL Previews */}
                    {imageUrls.map((url, index) => (
                      <div
                        key={`url-${index}`}
                        className="relative h-20 w-20 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-navy-900"
                      >
                        <img
                          src={url}
                          alt="preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/80?text=Invalid+URL";
                          }}
                        />
                        <span className="absolute bottom-1 left-1 rounded bg-gray-700/80 px-1 text-[9px] font-bold text-white">
                          URL
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveUrl(index)}
                          className="absolute right-1 top-1 rounded-full bg-navy-900/70 p-1 text-white hover:bg-red-500 transition"
                        >
                          <MdClose size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: Spice Level & Sort Order */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                  Spice Level
                </label>
                <select
                  value={formData.spiceLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, spiceLevel: e.target.value })
                  }
                  className="flex h-12 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                >
                  {SPICE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, sortOrder: e.target.value })
                  }
                  className="flex h-12 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
                  placeholder="1"
                />
              </div>
            </div>

            {/* SECTION 4: Dietary Preferences */}
            <div className="rounded-xl bg-lightPrimary p-4 dark:bg-navy-900/50">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-white">
                Dietary Preferences
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-navy-700 dark:text-gray-300 sm:grid-cols-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="isVeg"
                    checked={formData.isVeg}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-navy-800"
                  />
                  <span>Veg</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="isVegan"
                    checked={formData.isVegan}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-navy-800"
                  />
                  <span>Vegan</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="isJain"
                    checked={formData.isJain}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-navy-800"
                  />
                  <span>Jain</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="isGlutenFree"
                    checked={formData.isGlutenFree}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-navy-800"
                  />
                  <span>Gluten Free</span>
                </label>
              </div>
            </div>

            {/* SECTION 5: Highlights & Features */}
            <div className="rounded-xl bg-lightPrimary p-4 dark:bg-navy-900/50">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-white">
                Highlights & Features
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-navy-700 dark:text-gray-300 sm:grid-cols-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-navy-800"
                  />
                  <span>Featured</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={formData.isBestSeller}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-navy-800"
                  />
                  <span>Best Seller</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="isRecommended"
                    checked={formData.isRecommended}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-navy-800"
                  />
                  <span>Recommended</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="allowCustomNote"
                    checked={formData.allowCustomNote}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-white/10 dark:bg-navy-800"
                  />
                  <span>Custom Notes</span>
                </label>
              </div>
            </div>

            {/* SECTION 6: Nutrition Details */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-400">
                Nutrition Info
              </span>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={formData.nutrition.calories}
                    onChange={(e) =>
                      handleNutritionChange("calories", e.target.value)
                    }
                    className="flex h-12 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
                    placeholder="850"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-navy-700 dark:text-white">
                    Serving Size
                  </label>
                  <input
                    type="text"
                    value={formData.nutrition.servingSize}
                    onChange={(e) =>
                      handleNutritionChange("servingSize", e.target.value)
                    }
                    className="flex h-12 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
                    placeholder="500g"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 7: Variants Manager */}
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-400">
                  Item Variants (Portions / Sizes)
                </span>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="flex items-center gap-1 text-xs font-bold text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  <MdAdd size={16} /> Add Variant
                </button>
              </div>

              {formData.variants.length === 0 ? (
                <p className="text-xs italic text-gray-500 dark:text-gray-400">
                  No variants added yet (e.g., Half, Full, Regular, Large).
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {formData.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-white/10"
                    >
                      <input
                        type="text"
                        placeholder="Variant Name (e.g., Half)"
                        value={variant.name}
                        onChange={(e) =>
                          handleVariantChange(index, "name", e.target.value)
                        }
                        className="flex h-10 flex-1 rounded-lg border border-gray-200 bg-transparent px-3 text-xs text-navy-700 outline-none dark:border-white/10 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="Price (₹)"
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantChange(index, "price", e.target.value)
                        }
                        className="flex h-10 w-28 rounded-lg border border-gray-200 bg-transparent px-3 text-xs text-navy-700 outline-none dark:border-white/10 dark:text-white"
                      />
                      <label className="flex cursor-pointer items-center gap-1 text-xs font-bold text-navy-700 dark:text-gray-300">
                        <input
                          type="checkbox"
                          checked={variant.isAvailable}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "isAvailable",
                              e.target.checked,
                            )
                          }
                          className="h-3.5 w-3.5 rounded text-brand-500"
                        />
                        Available
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(index)}
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="mt-4 flex justify-end gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-5 py-3 text-sm font-bold text-navy-700 transition-all hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
              >
                {initialData ? "Save Changes" : "Create Item"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
