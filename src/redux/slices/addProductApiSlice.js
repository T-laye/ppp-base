import { apiSlice } from "./apiSlice";

const BASE_URL = "/api";

export const addProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/product`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddProductMutation } = addProductApiSlice;
