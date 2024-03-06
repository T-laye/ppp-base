"use client";
import GoBack from "@/components/GoBack";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import visible from "/public/icons/visible_eye.svg";
import invisible from "/public/icons/invisible_eye.svg";
import Link from "next/link";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { product_validate } from "../../../../lib/validate";

export default function NewProduct() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      allocation_per_voucher: 0,
      unit: "",
    },
    validate: product_validate,
    onSubmit: handleSubmit,
  });
  // console.log(formik.isValid);

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    // const { email, password } = values;
    console.log(values);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successful");
    }, 2000);
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
            Register New Product
          </h2>

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit} className="mb-4">
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="name">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter product name"
                  className={getInputClassNames("name")}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-error text-sm">{formik.errors.name}</div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="text-sm mb-2"
                  htmlFor="allocation_per_voucher"
                >
                  Allocation Per Voucher
                </label>
                <input
                  id="allocation_per_voucher"
                  name="allocation_per_voucher"
                  type="number"
                  placeholder="Enter Amount Allocation"
                  className={getInputClassNames("allocation_per_voucher")}
                  {...formik.getFieldProps("allocation_per_voucher")}
                />
                {formik.touched.allocation_per_voucher &&
                  formik.errors.allocation_per_voucher && (
                    <div className="text-error text-sm">
                      {formik.errors.allocation_per_voucher}
                    </div>
                  )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="unit">
                  Unit of product
                </label>
                <input
                  id="unit"
                  name="unit"
                  type="text"
                  placeholder="Enter product unit"
                  className={getInputClassNames("unit")}
                  {...formik.getFieldProps("unit")}
                />
                {formik.touched.unit && formik.errors.unit && (
                  <div className="text-error text-sm">{formik.errors.unit}</div>
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
                {isLoading ? <Loader /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
