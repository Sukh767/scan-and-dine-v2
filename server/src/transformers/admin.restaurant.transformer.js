export const toAdminRestaurantResponse = (restaurant) => ({
  id: restaurant.id,

  owner: {
    id: restaurant.ownerId?.id,
    name: restaurant.ownerId?.name,
    email: restaurant.ownerId?.email,
    phone: restaurant.ownerId?.phone,
  },

  name: restaurant.name,

  slug: restaurant.slug,

  description: restaurant.description,

  logo: restaurant.logo,

  coverImage: restaurant.coverImage,

  gallery: restaurant.gallery,

  cuisineTypes: restaurant.cuisineTypes,

  priceRange: restaurant.priceRange,

  facilities: restaurant.facilities,

  phone: restaurant.phone,

  email: restaurant.email,

  website: restaurant.website,

  socialMedia: restaurant.socialMedia,

  address: restaurant.address,

  operationalStatus: restaurant.operationalStatus,

  approvalStatus: restaurant.approvalStatus,

  approval: {
    approvedBy: restaurant.approval?.approvedBy,

    approvedAt: restaurant.approval?.approvedAt,

    rejectedBy: restaurant.approval?.rejectedBy,

    rejectedAt: restaurant.approval?.rejectedAt,

    rejectionReason: restaurant.approval?.rejectionReason,
  },

  subscription: restaurant.subscription,

  stats: restaurant.stats,

  isActive: restaurant.isActive,

  createdAt: restaurant.createdAt,

  updatedAt: restaurant.updatedAt,
});
