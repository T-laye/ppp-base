import { apiSlice } from "./apiSlice";

const BASE_URL = "/api";

export const addCustomerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/customer`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddCustomerMutation } = addCustomerApiSlice;
