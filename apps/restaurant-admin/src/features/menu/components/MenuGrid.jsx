import React, { useState } from "react";
import {
  MdEdit,
  MdStar,
  MdLocalFireDepartment,
  MdDelete,
  MdAccessTime,
  MdChevronLeft,
  MdChevronRight,
  MdThumbUp,
  MdWhatshot,
} from "react-icons/md";

/**
 * Individual Card component to manage image carousel state per item
 */
function MenuItemCard({ item, onEdit, onDelete, onToggleAvailability }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = item.images || [];
  const hasImages = images.length > 0;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const categoryName =
    item.category?.name || item.categoryName || "Uncategorized";

  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-3xl shadow-shadow-500 transition-transform duration-300 hover:-translate-y-1 dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none font-dm">
      {/* 1. IMAGE CAROUSEL HEADER */}
      <div className="relative h-52 w-full bg-gray-100 dark:bg-navy-900 overflow-hidden group">
        {hasImages ? (
          <img
            src={images[currentImgIndex]?.url}
            alt={`${item.name} image ${currentImgIndex + 1}`}
            className="h-full w-full object-cover transition-all duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400 dark:text-gray-500">
            No Images Uploaded
          </div>
        )}

        {/* Multi-Image Carousel Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-navy-900/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-navy-900"
              aria-label="Previous image"
            >
              <MdChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-navy-900/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-navy-900"
              aria-label="Next image"
            >
              <MdChevronRight size={18} />
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-navy-900/50 px-2 py-1 backdrop-blur-sm">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImgIndex
                      ? "w-4 bg-brand-500"
                      : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Unavailable Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-900/60 backdrop-blur-sm">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-navy-700 shadow-xl dark:bg-navy-800 dark:text-white">
              Currently Unavailable
            </span>
          </div>
        )}

        {/* Feature / Status Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {item.isBestSeller && (
            <span className="flex items-center gap-1 rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
              <MdLocalFireDepartment className="h-3.5 w-3.5" /> Bestseller
            </span>
          )}
          {item.isFeatured && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-400 px-2.5 py-1 text-[10px] font-bold text-navy-900 shadow-md">
              <MdStar className="h-3.5 w-3.5" /> Featured
            </span>
          )}
          {item.isRecommended && (
            <span className="flex items-center gap-1 rounded-full bg-blue-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
              <MdThumbUp className="h-3 w-3" /> Recommended
            </span>
          )}
        </div>

        {/* Prep Time Tag */}
        {item.preparationTime > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-navy-900/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            <MdAccessTime size={12} /> {item.preparationTime}m
          </div>
        )}
      </div>

      {/* 2. CARD BODY */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-bold leading-tight text-navy-700 dark:text-white">
              {item.name}
            </h4>
            <span className="mt-1 inline-block text-xs font-semibold text-gray-500 dark:text-gray-400">
              {categoryName}
            </span>
          </div>
          <span className="flex-shrink-0 text-lg font-bold text-brand-500 dark:text-brand-400">
            ₹{item.price}
          </span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            {item.description}
          </p>
        )}

        {/* Dietary Preferences & Spice Level Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {/* Veg / Non-Veg Indicator */}
          {item.isVeg ? (
            <span className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400" />{" "}
              Veg
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400" />{" "}
              Non-Veg
            </span>
          )}

          {item.isVegan && (
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
              Vegan
            </span>
          )}
          {item.isJain && (
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
              Jain
            </span>
          )}
          {item.isGlutenFree && (
            <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              Gluten Free
            </span>
          )}

          {item.spiceLevel && item.spiceLevel !== "none" && (
            <span className="flex items-center gap-0.5 rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold capitalize text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              <MdWhatshot size={10} /> {item.spiceLevel.replace("_", " ")}
            </span>
          )}
        </div>

        {/* Nutrition Info */}
        {(item.nutrition?.calories > 0 || item.nutrition?.servingSize) && (
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-lightPrimary p-2 text-[11px] font-medium text-navy-700 dark:bg-navy-900/50 dark:text-gray-300">
            {item.nutrition?.calories > 0 && (
              <span>
                <strong>Cal:</strong> {item.nutrition.calories} kcal
              </span>
            )}
            {item.nutrition?.servingSize && (
              <span>
                <strong>Serving:</strong> {item.nutrition.servingSize}
              </span>
            )}
          </div>
        )}

        {/* Item Variants */}
        {item.variants && item.variants.length > 0 && (
          <div className="mt-3 border-t border-gray-100 pt-2 dark:border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Variants ({item.variants.length})
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {item.variants.map((variant, vIdx) => (
                <span
                  key={vIdx}
                  className="rounded-md border border-gray-200 px-2 py-0.5 text-[10px] font-semibold text-navy-700 dark:border-white/10 dark:text-gray-300"
                >
                  {variant.name}: <strong>₹{variant.price}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-white/10">
            {/* Toggle Availability */}
            <label className="flex cursor-pointer items-center gap-2">
              <div
                className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${
                  item.isAvailable
                    ? "bg-brand-500 dark:bg-brand-400"
                    : "bg-gray-300 dark:bg-navy-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    item.isAvailable ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                {item.isAvailable ? "Available" : "Hidden"}
              </span>
              <input
                type="checkbox"
                className="hidden"
                checked={item.isAvailable}
                onChange={() => onToggleAvailability(item.id, item.isAvailable)}
              />
            </label>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(item)}
                className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-navy-700 dark:hover:text-brand-400"
                title="Edit Item"
              >
                <MdEdit size={18} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-500 dark:text-gray-400 dark:hover:bg-navy-700 dark:hover:text-red-400"
                title="Delete Item"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuGrid({
  items,
  onEdit,
  onDelete,
  onToggleAvailability,
}) {
  if (!items?.length) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-[20px] bg-white shadow-3xl shadow-shadow-500 font-dm dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none">
        <p className="text-gray-600 dark:text-gray-400">
          No menu items found for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 font-dm">
      {items.map((item) => (
        <MenuItemCard
          key={item.id || item._id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleAvailability={onToggleAvailability}
        />
      ))}
    </div>
  );
}
