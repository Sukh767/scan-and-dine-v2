export const restaurantKeys = {
  all: ["restaurant"],

  categories: () => [...restaurantKeys.all, "categories"],

  category: (id) => [...restaurantKeys.categories(), id],
};
