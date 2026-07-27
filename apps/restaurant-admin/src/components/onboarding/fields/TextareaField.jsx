import React from "react";

export default function TextareaField({
  label,
  id,
  value,
  onChange,
  placeholder,
  rows = 3,
  error,
  required,
  extra = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 font-['DM_Sans'] ${extra}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold tracking-wide text-navy-700 dark:text-white"
        >
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="input-field min-h-[80px] resize-y"
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
