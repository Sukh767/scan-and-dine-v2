import { api } from "@scan/api";

export const categoryService = {
  getCategories() {
    return api.get("/categories");
  },

  getCategory(id) {
    return api.get(`/categories/${id}`);
  },

  createCategory(payload) {
    return api.post("/categories", payload);
  },

  updateCategory(id, payload) {
    return api.patch(`/categories/${id}`, payload);
  },

  deleteCategory(id) {
    return api.delete(`/categories/${id}`);
  },
};
