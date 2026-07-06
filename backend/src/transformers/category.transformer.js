export const toCategoryResponse = (
  category,
) => ({
  id: category.id,

  name: category.name,

  description:
    category.description,

  image: category.image,

  icon: category.icon,

  sortOrder:
    category.sortOrder,

  isActive:
    category.isActive,

  createdAt:
    category.createdAt,

  updatedAt:
    category.updatedAt,
});

export const toCategoryListResponse =
  (categories) =>
    categories.map(
      toCategoryResponse,
    );