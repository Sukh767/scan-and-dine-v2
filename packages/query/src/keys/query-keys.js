export const QUERY_KEYS = {
  restaurants: {
    all: ["restaurants"],

    featured: ["restaurants", "featured"],

    popular: ["restaurants", "popular"],

    details: (slug) => ["restaurants", slug],
  },
};
