export const toPublicScanResponse = (restaurant, table, activeSession) => ({
  restaurant: {
    id: restaurant.id,
    slug: restaurant.slug,
    name: restaurant.name,
    logo: restaurant.logo,
    coverImage: restaurant.coverImage,
    operationalStatus: restaurant.operationalStatus,
  },

  table: {
    id: table.id,
    tableNumber: table.tableNumber,
    label: table.label,
    capacity: table.capacity,
    status: table.status,
  },

  session: {
    hasActiveSession: Boolean(activeSession),

    sessionToken: activeSession?.sessionToken ?? null,

    status: activeSession?.status ?? null,
  },
});

export const toPublicSessionResponse = (
  restaurant,
  table,
  session,
  resumed,
) => ({
  resumed,

  session: {
    id: session.id,

    sessionToken: session.sessionToken,

    guestCount: session.guestCount,

    status: session.status,

    startedAt: session.startedAt,
  },

  restaurant: {
    id: restaurant.id,

    slug: restaurant.slug,

    name: restaurant.name,

    logo: restaurant.logo,
  },

  table: {
    id: table.id,

    tableNumber: table.tableNumber,

    label: table.label,
  },
});
