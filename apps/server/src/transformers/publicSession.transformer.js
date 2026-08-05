export const toPublicSessionResponse = (session) => ({
  resumed: true,

  session: {
    id: session.id,
    sessionToken: session.sessionToken,
    status: session.status,
    guestCount: session.guestCount,
    startedAt: session.startedAt,
    lastActivityAt: session.lastActivityAt,
  },

  restaurant: {
    id: session.restaurantId.id,
    slug: session.restaurantId.slug,
    name: session.restaurantId.name,
    logo: session.restaurantId.logo,
    coverImage: session.restaurantId.coverImage,
  },

  table: {
    id: session.tableId.id,
    tableNumber: session.tableId.tableNumber,
    label: session.tableId.label,
    capacity: session.tableId.capacity,
  },
});
