export const restaurantKeys = {
  all: ["restaurant"],

  categories: () => [...restaurantKeys.all, "categories"],

  category: (id) => [...restaurantKeys.categories(), id],

  menus: (params = {}) => [...restaurantKeys.all, "menus", params],

  menu: (id) => [...restaurantKeys.all, "menu", id],
};
