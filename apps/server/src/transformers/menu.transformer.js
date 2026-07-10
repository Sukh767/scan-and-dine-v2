export const toMenuResponse = (menuItem) => ({
  id: menuItem.id,

  category: menuItem.categoryId,

  name: menuItem.name,

  description: menuItem.description,

  price: menuItem.price,

  images: menuItem.images,

  variants: menuItem.variants,

  nutrition: menuItem.nutrition,

  isVeg: menuItem.isVeg,

  isVegan: menuItem.isVegan,

  isJain: menuItem.isJain,

  isGlutenFree: menuItem.isGlutenFree,

  spiceLevel: menuItem.spiceLevel,

  preparationTime: menuItem.preparationTime,

  allowCustomNote: menuItem.allowCustomNote,

  isFeatured: menuItem.isFeatured,

  isBestSeller: menuItem.isBestSeller,

  isRecommended: menuItem.isRecommended,

  isAvailable: menuItem.isAvailable,

  isActive: menuItem.isActive,

  sortOrder: menuItem.sortOrder,

  rating: menuItem.rating,

  createdAt: menuItem.createdAt,

  updatedAt: menuItem.updatedAt,
});

export const toMenuListResponse = (menuItems) => menuItems.map(toMenuResponse);
