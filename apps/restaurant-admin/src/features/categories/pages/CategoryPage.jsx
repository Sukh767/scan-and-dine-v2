import { useState } from "react";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@scan/restaurants";

import CategoryHeader from "../components/CategoryHeader";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";

const CategoryPage = () => {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  // Local UI State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form Handlers
  const handleOpenForm = (category = null) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingCategory(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          data: formData,
        });
      } else {
        await createCategory.mutateAsync(formData);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Failed to save category", error);
    }
  };

  // List Handlers
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory.mutateAsync(id);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    await updateCategory.mutateAsync({
      id,
      data: { isActive: !currentStatus },
    });
  };

  const handleReorder = async (direction, index) => {
    // Note: Reordering logic should compute the new array and call a reorder mutation hook.
    // If you have a specific useReorderCategories hook, it would be consumed here.
    console.log(`Reorder ${direction} at index ${index}`);
  };

  return (
    <div className="flex h-full w-full flex-col gap-5 p-5 font-dm bg-lightPrimary dark:bg-navy-900">
      <CategoryHeader onAddClick={() => handleOpenForm()} />

      {isLoading ? (
        <div className="flex h-40 items-center justify-center rounded-[20px] bg-white shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent dark:border-brand-400"></div>
        </div>
      ) : (
        <CategoryList
          categories={categories?.data || []}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onReorder={handleReorder}
        />
      )}

      <CategoryForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingCategory}
      />
    </div>
  );
};

export default CategoryPage;
