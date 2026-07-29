import { api } from "@scan/api";

function buildMenuFormData(payload) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === "files") return;
    if (key === "imageUrls") return;

    // Arrays/Objects except imageUrls
    if (key === "variants" || key === "nutrition") {
      formData.append(key, JSON.stringify(value));
    } else if (key === "imageUrls") {
      value.forEach((url) => formData.append("imageUrls", url));
    } else {
      formData.append(key, value);
    }
  });

  payload.imageUrls?.forEach((image) => {
    if (!image) return;

    formData.append("imageUrls", typeof image === "string" ? image : image.url);
  });

  payload.files?.forEach((file) => {
    formData.append("images", file);
  });

  console.log("Files:", payload.files);
  console.log("ImageUrls:", payload.imageUrls);

  return formData;
}

export const menuService = {
  getMenus(params = {}) {
    return api.get("/menu", {
      params,
    });
  },

  getMenu(menuItemId) {
    return api.get(`/menu/${menuItemId}`);
  },

  createMenu(payload) {
    return api.post("/menu", buildMenuFormData(payload));
  },

  updateMenu(menuItemId, payload) {
    return api.patch(`/menu/${menuItemId}`, buildMenuFormData(payload));
  },
  deleteMenu(menuItemId) {
    return api.delete(`/menu/${menuItemId}`);
  },

  updateMenuStatus(menuItemId, isActive) {
    return api.patch(`/menu/${menuItemId}/status`, {
      isActive,
    });
  },

  updateMenuAvailability(menuItemId, isAvailable) {
    return api.patch(`/menu/${menuItemId}/availability`, {
      isAvailable,
    });
  },
};
