export const toPublicRestaurantDetailsResponse = (restaurant) => ({
  id: restaurant.id,

  slug: restaurant.slug,

  name: restaurant.name,

  phone: restaurant.phone,

  website: restaurant.website,

  facilities: restaurant.facilities,

  socialLinks: restaurant.socialLinks,

  email: restaurant.email,

  logo: restaurant.logo,

  coverImage: restaurant.coverImage,

  galleryImages: restaurant.gallery,

  description: restaurant.description,

  cuisineTypes: restaurant.cuisineTypes,

  priceRange: restaurant.priceRange,

  averageRating: restaurant.averageRating,

  reviewCount: restaurant.reviewCount,

  completedOrders: restaurant.completedOrders,

  isFeatured: restaurant.isFeatured,

  operationalStatus: restaurant.operationalStatus,

  operatingHours: restaurant.operatingHours,

  socialMedia: restaurant.socialMedia,

  address: {
    city: restaurant.address?.city,

    state: restaurant.address?.state,

    country: restaurant.address?.country,
  },
});