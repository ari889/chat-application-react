import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedOut } from "../auth/authSlice";

/**
 * base query
 */
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API__URL,
    prepareHeaders: async (headers, { getState, endpoints }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    }
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.removeItem(import.meta.env.VITE_APP_NAME);
        }

        return result;
    },
    tagTypes: [],
    endpoints: (builder) => ({})
});