export const toPublicRestaurantResponse = (restaurant) => ({
  id: restaurant.id,

  slug: restaurant.slug,

  name: restaurant.name,

  logo: restaurant.logo,

  coverImage: restaurant.coverImage,

  description: restaurant.description,

  cuisineTypes: restaurant.cuisineTypes,

  priceRange: restaurant.priceRange,

  averageRating: restaurant.averageRating,

  reviewCount: restaurant.reviewCount,

  completedOrders: restaurant.completedOrders,

  isFeatured: restaurant.isFeatured,

  operationalStatus: restaurant.operationalStatus,

  address: {
    city: restaurant.address?.city,

    state: restaurant.address?.state,

    country: restaurant.address?.country,
  },
});

export const toPublicRestaurantListResponse = (restaurants) =>
  restaurants.map(toPublicRestaurantResponse);
