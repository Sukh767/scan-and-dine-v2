import { api } from "../request";

export const publicRestaurantApi = {
  getRestaurants(params = {}) {
    return api.get("/public/restaurants", params);
  },

  getFeaturedRestaurants() {
    return api.get("/public/restaurants/featured");
  },

  getPopularRestaurants() {
    return api.get("/public/restaurants/popular");
  },

  getRestaurantBySlug(slug) {
    return api.get(`/public/restaurants/${slug}`);
  },
};
