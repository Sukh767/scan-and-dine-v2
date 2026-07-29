import { MdAddCircleOutline } from "react-icons/md";

export default function MenuHeader({
  totalItems,
  totalCategories,
  onAddClick,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-white p-5 shadow-3xl shadow-shadow-500 font-dm dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none">
      <div>
        <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
          Menu Management
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          {totalItems || 0} items across {totalCategories || 0} categories
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
      >
        <MdAddCircleOutline className="h-5 w-5" />
        Add Item
      </button>
    </div>
  );
}
