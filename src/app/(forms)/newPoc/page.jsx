"use client";
import GoBack from "@/components/GoBack";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { poc_validate } from "../../../../lib/validate";
import { useAddPocMutation } from "@/redux/slices/addPocApiSlice";

export default function NewPoc() {
  const [isFormValid, setIsFormValid] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [addPoc, { isLoading, error }] = useAddPocMutation();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      personnel: "",
      management: "",
      product: "",
      limit: 0,
      available: 0,
    },
    validate: poc_validate,
    onSubmit: handleSubmit,
  });
  // console.log(formik.isValid);

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    const {
      name,
      email,
      phone,
      address,
      personnel,
      management,
      product,
      limit,
      available,
    } = values;
    try {
      const res = await addPoc({
        poc_name:name,
        phoneNumber:phone,
        address,
        email,
        product_name:product,
        stockLimit:limit,
        product_unit:'litres',
        stockAvailable:available,
        voucher_allocation: 300,
      }).unwrap();
      // dispatch(setCredentials({ ...res.data }));
      console.log(res);
      // console.log(values);
      toast.success(res.message);
      router.back();
    } catch (e) {
      toast.error(e.data.message);
      // console.log(e);
    }
  }
  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-error text-error"
        : ""
    }`;

  const [showBg, setShowBg] = useState(false);
  setTimeout(() => {
    setShowBg(!showBg);
  }, 5000);

  return (
    <section className="bg-green300 min-h-screen">
      <div className="container mx-auto pt-5 pb-10">
        <div className="">
          <GoBack />
        </div>

        <div>
          <h2 className="text-xl font-medium text-center mt-5 text-primary">
            Register New Point of Collection
          </h2>

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit} className="mb-4">
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  className={getInputClassNames("name")}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-error text-sm">{formik.errors.name}</div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  className={getInputClassNames("email")}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-error text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="address"
                  placeholder="Enter address"
                  className={getInputClassNames("address")}
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-error text-sm">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className={getInputClassNames("phone")}
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-error text-sm">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
              <div className="flex flex-col  mb-6">
                <label className="text-sm mb-2" htmlFor="personnel">
                  Select Personnel
                </label>
                <select
                  // disabled
                  id="personnel"
                  name="personnel"
                  placeholder="Select personnel"
                  className={getInputClassNames("personnel")}
                  {...formik.getFieldProps("personnel")}
                >
                  <option>Select personnel</option>
                  <option value="maxwell">Maxwell Luther</option>
                  <option value="matthew">Matthew Chimney</option>
                  <option value="james">James Jude</option>
                  {/* {renderJobCategories()} */}
                </select>
                {formik.touched.personnel && formik.errors.personnel && (
                  <div className="text-error text-sm">
                    {formik.errors.personnel}
                  </div>
                )}
              </div>
              <div className="flex flex-col  mb-6">
                <label className="text-sm mb-2" htmlFor="management">
                  Select Management
                </label>
                <select
                  // disabled
                  id="management"
                  name="management"
                  placeholder="Select management"
                  className={getInputClassNames("management")}
                  {...formik.getFieldProps("management")}
                >
                  <option>Select management</option>
                  <option value="maxwell">Maxwell Luther</option>
                  <option value="matthew">Matthew Chimney</option>
                  <option value="john">John mark</option>
                  {/* {renderJobCategories()} */}
                </select>
                {formik.touched.management && formik.errors.management && (
                  <div className="text-error text-sm">
                    {formik.errors.management}
                  </div>
                )}
              </div>
              <div className="flex flex-col  mb-6">
                <label className="text-sm mb-2" htmlFor="product">
                  Select Product
                </label>
                <select
                  // disabled
                  id="product"
                  name="product"
                  placeholder="Select Product"
                  className={getInputClassNames("product")}
                  {...formik.getFieldProps("product")}
                >
                  <option>Select product</option>
                  <option value="fuel">Fuel</option>
                  <option value="diesel">Diesel</option>
                  {/* {renderJobCategories()} */}
                </select>
                {formik.touched.product && formik.errors.product && (
                  <div className="text-error text-sm">
                    {formik.errors.product}
                  </div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="limit">
                  Stock Limit Level
                </label>
                <input
                  id="limit"
                  name="limit"
                  type="number"
                  placeholder="Enter Limit"
                  className={getInputClassNames("limit")}
                  {...formik.getFieldProps("limit")}
                />
                {formik.touched.limit && formik.errors.limit && (
                  <div className="text-error text-sm">
                    {formik.errors.limit}
                  </div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="available">
                  Stock Available
                </label>
                <input
                  id="available"
                  name="available"
                  type="number"
                  placeholder="Enter available"
                  className={getInputClassNames("available")}
                  {...formik.getFieldProps("available")}
                />
                {formik.touched.available && formik.errors.available && (
                  <div className="text-error text-sm">
                    {formik.errors.available}
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
                // disabled={!isFormValid || isLoading}
              >
                {isLoading ? <Loader /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
