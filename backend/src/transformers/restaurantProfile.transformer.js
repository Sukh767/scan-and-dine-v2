export const toRestaurantProfileResponse = (restaurant) => ({
  id: restaurant.id,

  name: restaurant.name,

  description: restaurant.description,

  logo: restaurant.logo,

  coverImage: restaurant.coverImage,

  cuisineTypes: restaurant.cuisineTypes,

  priceRange: restaurant.priceRange,

  facilities: restaurant.facilities,

  phone: restaurant.phone,

  email: restaurant.email,

  website: restaurant.website,

  socialMedia: restaurant.socialMedia,

  address: restaurant.address,

  operatingHours: restaurant.operatingHours,

  operationalStatus: restaurant.operationalStatus,

  createdAt: restaurant.createdAt,

  updatedAt: restaurant.updatedAt,
});
