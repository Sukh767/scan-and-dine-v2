export const toDiningSessionResponse = (session) => ({
  id: session.id,

  sessionToken: session.sessionToken,

  restaurant: session.restaurantId,

  table: session.tableId,

  customer: session.customerId,

  reservationId: session.reservationId,

  status: session.status,

  billStatus: session.billStatus,

  sessionType: session.sessionType,

  guestCount: session.guestCount,

  totals: session.totals,

  appliedOfferId: session.appliedOfferId,

  sessionNote: session.sessionNote,

  startedAt: session.startedAt,

  endedAt: session.endedAt,

  lastActivityAt: session.lastActivityAt,

  expiresAt: session.expiresAt,

  createdBy: session.createdBy,

  createdAt: session.createdAt,

  updatedAt: session.updatedAt,
});

export const toDiningSessionListResponse = (sessions) =>
  sessions.map(toDiningSessionResponse);
