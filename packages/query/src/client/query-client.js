import { QueryClient } from "@tanstack/react-query";

import { defaultQueryOptions } from "../defaults";

export const queryClient = new QueryClient({
    defaultOptions: defaultQueryOptions,
});