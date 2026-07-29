import { useState } from "react";

import MenuHeader from "../components/MenuHeader";
import MenuFilters from "../components/MenuFilters";
import MenuGrid from "../components/MenuGrid";
import MenuForm from "../components/MenuForm"; // Standard modal form implementation
import {
  useCategories,
  useCreateMenu,
  useDeleteMenu,
  useMenus,
  useUpdateMenu,
  useUpdateMenuAvailability,
} from "@scan/restaurants";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // 1. Fetch Categories for Filters
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data || categoriesData || [];

  // 2. Fetch Menus (Automatically handles query parameters & cache)
  const queryParams =
    activeCategory === "all" ? {} : { category: activeCategory };
  const { data: menusData, isLoading: isMenusLoading } = useMenus(queryParams);
  const menus = menusData?.data || menusData || [];

  // 3. Mutations
  const createMenu = useCreateMenu();
  const updateMenu = useUpdateMenu();
  const deleteMenu = useDeleteMenu();
  const toggleAvailability = useUpdateMenuAvailability();

  // Handlers
  const handleToggleAvailability = async (id, currentStatus) => {
    await toggleAvailability.mutateAsync({
      menuItemId: id,
      isAvailable: !currentStatus,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      await deleteMenu.mutateAsync(id);
    }
  };

  const handleOpenForm = (item = null) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingItem(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    if (editingItem) {
      await updateMenu.mutateAsync({
        menuItemId: editingItem.id,
        payload: formData,
      });
    } else {
      await createMenu.mutateAsync(formData);
    }
    handleCloseForm();
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 p-5 bg-lightPrimary dark:bg-navy-900 font-dm min-h-screen">
      <MenuHeader
        totalItems={menus.length}
        totalCategories={categories.length}
        onAddClick={() => handleOpenForm()}
      />

      {categories.length > 0 && (
        <MenuFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}

      {isMenusLoading ? (
        <div className="flex h-64 items-center justify-center rounded-[20px] bg-white shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent dark:border-brand-400"></div>
        </div>
      ) : (
        <MenuGrid
          items={menus}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          onToggleAvailability={handleToggleAvailability}
        />
      )}

      <MenuForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        categories={categories}
      />
    </div>
  );
};

export default MenuPage;
