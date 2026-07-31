import { api } from "@scan/api";

export const tableService = {
  getTables(params = {}) {
    return api.get("/tables", {
      params,
    });
  },

  getTable(tableId) {
    return api.get(`/tables/${tableId}`);
  },

  createTable(payload) {
    return api.post("/tables", payload);
  },

  updateTable(tableId, payload) {
    return api.patch(`/tables/${tableId}`, payload);
  },

  deleteTable(tableId) {
    return api.delete(`/tables/${tableId}`);
  },

  updateStatus(tableId, status) {
    return api.patch(`/tables/${tableId}/status`, {
      status,
    });
  },

  updateActive(tableId, isActive) {
    return api.patch(`/tables/${tableId}/active`, {
      isActive,
    });
  },
};