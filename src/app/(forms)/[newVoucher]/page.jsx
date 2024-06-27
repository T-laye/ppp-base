"use client";
import GoBack from "@/components/GoBack";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import visible from "/public/icons/visible_eye.svg";
import invisible from "/public/icons/invisible_eye.svg";
import Loader from "@/components/Loader.jsx";
// import { ToastContainer, toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { new_voucher_validate } from "../../../../lib/validate";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getCustomer } from "@/redux/slices/getCustomerSlice";

export default function NewVoucher() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { newVoucher } = useParams();
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);
  const { products } = useSelector((state) => state.products);
  const router = useRouter();
  // console.log(customer);

  useEffect(() => {
    const getCustomerDetails = async () => {
      const res = await axios.get(`/api/customer/${newVoucher}`);
      // console.log(customer);

      dispatch(getCustomer({ ...res.data.data }));
    };

    getCustomerDetails();
  }, [dispatch, newVoucher]);

  const formik = useFormik({
    initialValues: {
      fullName: customer?.name,
      email: customer?.email,
      phone: customer?.phoneNumber,
      address: customer?.address,
      product: "",
      note: "",
      // third_party: "",
    },
    validate: new_voucher_validate,
    onSubmit: handleSubmit,
  });
  // console.log(formik.isValid);

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/admin/voucher/`, {
        customerId: newVoucher,
        productId: values.product,
        note: values.note,
      });

      // console.log(res);
      if (res) {
        setIsLoading(false);
        toast.success("Successful");
        router.back();
      }
    } catch (err) {
      setIsLoading(false);
      // console.error(err);
      toast.error(err?.response?.data?.message);
    }
    // console.log("res");

    // const { email, password } = values;
    setTimeout(() => {}, 2000);
  }

  const renderProducts = () => {
    return products?.data?.map((p) => {
      return (
        <option key={p.productId} value={p.productId}>
          {p.name}
        </option>
      );
    });
  };

  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-error text-error"
        : ""
    }`;

  return (
    <section className="bg-green300 min-h-screen">
      <div className="container mx-auto pt-5 pb-10">
        <div className="">
          <GoBack />
        </div>

        <div>
          <h2 className="text-xl font-medium text-center mt-5 text-primary">
            Register New Voucher
          </h2>

          {!customer.id ? (
            <Loader />
          ) : (
            <div className="mt-10">
              <form onSubmit={formik.handleSubmit} className="mb-4">
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    readOnly
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
                    readOnly
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
                  <label className="text-sm mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    readOnly
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
                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    readOnly
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
                <div className="flex flex-col  mb-6">
                  <label className="text-sm mb-2" htmlFor="product">
                    Select Product
                  </label>
                  <select
                    // disabled={!isEditable}
                    id="product"
                    name="product"
                    placeholder="Select Product"
                    className={getInputClassNames("product")}
                    {...formik.getFieldProps("product")}
                  >
                    <option>Select Product</option>
                    {renderProducts()}
                  </select>
                  {formik.touched.product && formik.errors.product && (
                    <div className="text-error text-sm">
                      {formik.errors.product}
                    </div>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2" htmlFor="note">
                    Note
                  </label>
                  <input
                    maxLength={10}
                    minLength={2}
                    id="note"
                    name="note"
                    type="text"
                    placeholder="Enter note"
                    className={getInputClassNames("note")}
                    {...formik.getFieldProps("note")}
                  />
                  {formik.touched.note && formik.errors.note && (
                    <div className="text-error text-sm">
                      {formik.errors.note}
                    </div>
                  )}
                </div>
                {/* <div className="flex items-center mt-6 ">
                  <div>
                    <input
                      name="third_party"
                      id="checkbox"
                      // disabled={!isEditable}
                      type="checkbox"
                      className={`h-[14px] w-[14px] rounded-md ${getInputClassNames(
                        "third_party"
                      )}`}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="text-sm ml-2">
                    <label htmlFor="checkbox">Allow Third Party</label>
                  </div>
                </div> */}

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
          )}
        </div>
      </div>
    </section>
  );
}
