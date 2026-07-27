import { FiCheck, FiPlus } from 'react-icons/fi';

const CUISINES = [
  'Indian', 'Chinese', 'Continental', 'Italian', 'Mexican', 'Japanese',
  'Thai', 'Mediterranean', 'American', 'BBQ', 'Seafood', 'Vegan',
  'Fast Food', 'Cafe', 'Desserts', 'Middle Eastern'
];

const FACILITIES = [
  'Parking', 'WiFi', 'Live Music', 'Private Dining', 'Outdoor Seating',
  'Air Conditioning', 'Pet Friendly', 'Wheelchair Accessible', 'Takeaway',
  'Delivery', 'Bar', 'Valet Parking'
];

function ChipGroup({ label, options, selected = [], onToggle }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <span className="text-xs font-bold text-brand-500">{selected.length} selected</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 scale-102'
                  : 'bg-lightPrimary text-navy-700 hover:bg-gray-200 dark:bg-navy-900 dark:text-gray-300 dark:hover:bg-navy-700 border border-gray-200/50 dark:border-navy-700'
              }`}
            >
              {active ? <FiCheck className="h-3.5 w-3.5 stroke-[3]" /> : <FiPlus className="h-3.5 w-3.5 text-gray-400" />}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Step3Details({ data, updateData }) {
  const toggleItem = (list = [], item) =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  return (
    <div className="flex flex-col gap-8">
      <ChipGroup
        label="Cuisine Types"
        options={CUISINES}
        selected={data.cuisineTypes}
        onToggle={(c) => updateData({ cuisineTypes: toggleItem(data.cuisineTypes, c) })}
      />
      <ChipGroup
        label="Facilities & Amenities"
        options={FACILITIES}
        selected={data.facilities}
        onToggle={(f) => updateData({ facilities: toggleItem(data.facilities, f) })}
      />
    </div>
  );
}