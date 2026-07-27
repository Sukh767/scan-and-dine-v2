import React from "react";

export default function SelectField({
  label,
  id,
  value,
  onChange,
  options = [],
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="input-field cursor-pointer"
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white text-navy-700 dark:bg-navy-800 dark:text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
