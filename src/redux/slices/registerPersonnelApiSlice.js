import { apiSlice } from "./apiSlice";

const BASE_URL = "/api";

export const registerPersonnelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerPersonnelApiSlice;
