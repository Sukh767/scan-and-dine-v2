export const toRestaurantResponse = (restaurant) => ({
  id: restaurant.id,

  ownerId: restaurant.ownerId,

  name: restaurant.name,

  slug: restaurant.slug,

  description: restaurant.description,

  logo: restaurant.logo,

  coverImage: restaurant.coverImage,

  cuisineTypes: restaurant.cuisineTypes,

  priceRange: restaurant.priceRange,

  phone: restaurant.phone,

  email: restaurant.email,

  website: restaurant.website,

  socialMedia: restaurant.socialMedia,

  address: restaurant.address,

  operationalStatus:
    restaurant.operationalStatus,

  approvalStatus:
    restaurant.approvalStatus,

  subscription:
    restaurant.subscription,

  createdAt: restaurant.createdAt,

  updatedAt: restaurant.updatedAt,
});