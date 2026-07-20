export const toPublicRestaurantList = (restaurant) => ({
  id: restaurant.id,

  slug: restaurant.slug,

  name: restaurant.name,

  logo: restaurant.logo,

  coverImage: restaurant.coverImage,

  description: restaurant.description,

  cuisineTypes: restaurant.cuisineTypes,

  priceRange: restaurant.priceRange,

  averageRating: restaurant.averageRating,

});

export const toPublicRestaurantListResponse = (restaurants) =>
  restaurants.map(toPublicRestaurantList);