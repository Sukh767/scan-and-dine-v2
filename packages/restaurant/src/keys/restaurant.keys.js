export const restaurantKeys = {
  all: ["restaurant"],

  categories: () => [...restaurantKeys.all, "categories"],

  category: (id) => [...restaurantKeys.categories(), id],

  menus: (params = {}) => [...restaurantKeys.all, "menus", params],

  menu: (id) => [...restaurantKeys.all, "menu", id],

  tables: () => [...restaurantKeys.all, "tables"],

  table: (id) => [...restaurantKeys.tables(), id],

  sessions: () => [...restaurantKeys.all, "sessions"],

  session: (id) => [...restaurantKeys.sessions(), id],
};
