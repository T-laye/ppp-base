import { apiSlice } from "./apiSlice";

const BASE_URL = "/api";

export const addPocApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPoc: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/poc`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddPocMutation } = addPocApiSlice;
