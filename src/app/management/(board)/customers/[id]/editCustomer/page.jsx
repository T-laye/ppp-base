"use client";
import GoBack from "@/components/GoBack";
import React, { useState, useEffect, Suspense } from "react";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { getCustomer } from "@/redux/slices/getCustomerSlice";
import axios from "axios";
import Loading from "@/components/Loading";
import { new_customer_validate } from "../../../../../../../lib/validate";
// import { useEditCustomerMutation } from "@/redux/slices/customerApiSlice";

export default function Page() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const { customer } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  // const [editCustomer, { isLoading, error }] = useEditCustomerMutation();

  // console.log(customer);

  useEffect(() => {
    const getCustomerDetails = async () => {
      const res = await axios.get(`/api/customer/${id}`);

      // console.log(res);
      dispatch(getCustomer({ ...res.data.data }));
    };

    getCustomerDetails();
  }, [dispatch, id]);
  // console.log(isEditable);

  const formik = useFormik({
    initialValues: {
      fullName: customer?.name,
      email: customer?.email,
      phone: customer?.phoneNumber,
      address: customer?.address,
      // product: "Fuel",
      // third_party: true,
      // preferred_poc: "Total Fueling Station",
    },
    validate: new_customer_validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    const { fullName, email, phone } = values;
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `/api/customer/${id}?email=${email}&name=${fullName}&phoneNumber=${phone}`
      );
      // console.log(res);
      if (res) {
        toast.success(res);
        router.back();
        setIsLoading(true);
      }
      // console.log(values);
    } catch (e) {
      setIsLoading(true);
      // toast.error(e.data.message);
      console.log(e);
    }
  }
  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-error text-error"
        : ""
    }`;

  return (
    <section className="pt-8 pb-20 min-h-screen bg-ed-500">
      <div className="flex justify-between items-center">
        <GoBack />
      </div>
      <h3 className="text-center text-lg font-medium mt-3">Customer Details</h3>

      <div className="mt-8">
        {!customer?.name ? (
          <Loading />
        ) : (
          <form onSubmit={formik.handleSubmit} className="mb-4">
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                // disabled={!isEditable}
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter full name"
                className={getInputClassNames("fullName")}
                {...formik.getFieldProps("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-error text-sm">
                  {formik.errors.fullName}
                </div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                // disabled={!isEditable}
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                className={getInputClassNames("email")}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-error text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                // disabled={!isEditable}
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                className={getInputClassNames("phone")}
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-error text-sm">{formik.errors.phone}</div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="address">
                Address
              </label>
              <input
                // disabled={!isEditable}
                id="address"
                name="address"
                type="text"
                placeholder="Enter Address"
                className={getInputClassNames("address")}
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-error text-sm">
                  {formik.errors.address}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`btn w-full h-11 mt-6 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl  ${
                isFormValid
                  ? `${isLoading ? "bg-customGray" : "bg-primary"}`
                  : "bg-customGray cursor-not-allowed"
              } `}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? <Loader /> : "Save"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
