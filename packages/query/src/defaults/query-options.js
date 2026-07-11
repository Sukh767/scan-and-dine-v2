export const defaultQueryOptions = Object.freeze({
    queries: {
        retry: 1,

        refetchOnWindowFocus: false,

        refetchOnReconnect: true,

        staleTime: 1000 * 60,

        gcTime: 1000 * 60 * 5,
    },

    mutations: {
        retry: 0,
    },
});