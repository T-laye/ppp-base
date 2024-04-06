import { apiSlice } from "./apiSlice";

const BASE_URL = "/api";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/customer`,
        method: "POST",
        body: data,
      }),
    }),
    // editCustomer: builder.mutation({
    //   query: (data) => ({
    //     url: `${BASE_URL}/customer/[customerId]`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useAddCustomerMutation, useEditCustomerMutation } = customerApiSlice;
