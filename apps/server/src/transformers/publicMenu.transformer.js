/*
|--------------------------------------------------------------------------
| Restaurant
|--------------------------------------------------------------------------
*/

export const toPublicRestaurantMenuResponse = (restaurant) => ({
  id: restaurant.id,

  slug: restaurant.slug,

  name: restaurant.name,

  logo: restaurant.logo,

  coverImage: restaurant.coverImage,

  currency: restaurant.settings?.currency,

  operationalStatus: restaurant.operationalStatus,
});

/*
|--------------------------------------------------------------------------
| Menu Item
|--------------------------------------------------------------------------
*/

export const toPublicMenuItemResponse = (menuItem) => ({
  id: menuItem.id,

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
});

/*
|--------------------------------------------------------------------------
| Category
|--------------------------------------------------------------------------
*/

export const toPublicCategoryResponse = (category) => ({
  id: category.id,

  name: category.name,

  description: category.description,

  image: category.image,

  sortOrder: category.sortOrder,

  items: category.items.map(toPublicMenuItemResponse),
});

/*
|--------------------------------------------------------------------------
| Final Response
|--------------------------------------------------------------------------
*/

export const toPublicMenuResponse = (restaurant, categories) => ({
  restaurant: toPublicRestaurantMenuResponse(restaurant),

  categories: categories.map(toPublicCategoryResponse),
});
