export const toTableResponse = (table) => ({
  id: table.id,

  tableNumber: table.tableNumber,

  label: table.label,

  description: table.description,

  capacity: table.capacity,

  floor: table.floor,

  section: table.section,

  qrToken: table.qrToken,

  qrImage: table.qrImage?.url ? table.qrImage : null,

  status: table.status,

  currentSessionId: table.currentSessionId,

  notes: table.notes,

  sortOrder: table.sortOrder,

  isActive: table.isActive,

  createdAt: table.createdAt,

  updatedAt: table.updatedAt,
});

export const toTableListResponse = (tables) => tables.map(toTableResponse);
