"use client";
import GoBack from "@/components/GoBack";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { poc_validate } from "../../../../lib/validate";
import { useAddPocMutation } from "@/redux/slices/addPocApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/redux/slices/getProductSlice";
import axios from "axios";

export default function NewPoc() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [addPoc, { isLoading }] = useAddPocMutation();
  const { products } = useSelector((state) => state.products);
  const { count, data } = products;
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      // product_name: "",
      limit: 0,
      available: 0,
      // allocation: "", // Initialize allocation here
      // unit: "", // Initialize allocation here
    },
    validate: poc_validate,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.isValid]);

  useEffect(() => {
    if (product?.voucherAllocation !== undefined) {
      formik.setFieldValue("allocation", product.voucherAllocation);
    }
    if (product?.unit !== undefined) {
      formik.setFieldValue("unit", product.unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  async function handleSubmit(values, { resetForm }) {
    const { name, email, phone, address, limit, available } =
      values;
    try {
      const res = await addPoc({
        poc_name: name,
        phoneNumber: phone,
        address,
        email,
        // product_name: product.productName,
        stockLimit: limit,
        // product_unit: unit,
        stockAvailable: available,
        // voucher_allocation: allocation, // Use values.allocation here
      }).unwrap();
      // console.log(res);
      toast.success(res.message);
      router.back();
      resetForm();
    } catch (e) {
      toast.error(e.data.message);
    }
  }

  useEffect(() => {
    const getProductDetails = async () => {
      if (formik.values.product_name) {
        try {
          const res = await axios.get(
            `/api/product/${formik.values.product_name}`
          );
          dispatch(getProduct(res.data.data));
          // console.log(formik.values.product);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    getProductDetails();
  }, [dispatch, formik.values.product_name]);

  const renderProducts = () => {
    return data?.map((p) => (
      <option key={p.productId} value={p.productId}>
        {p.name}
      </option>
    ));
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
              {/* <div className="flex flex-col  mb-6">
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
                  </select>
                {formik.touched.management && formik.errors.management && (
                  <div className="text-error text-sm">
                    {formik.errors.management}
                  </div>
                )}
              </div> */}
              {/* <div className="flex flex-col  mb-6">
                <label className="text-sm mb-2" htmlFor="product_name">
                  Select Product
                </label>
                <select
                  disabled={!count}
                  // readOnly
                  id="product_name"
                  name="product_name"
                  // onChange={handleproduct_nameChange}
                  placeholder="Select product"
                  className={getInputClassNames("product_name")}
                  {...formik.getFieldProps("product_name")}
                >
                  <option>Select Product</option>
                  {renderProducts()}
                </select>
                {formik.touched.product_name && formik.errors.product_name && (
                  <div className="text-error text-sm">
                    {formik.errors.product_name}
                  </div>
                )}
              </div> */}
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
              {/* <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="allocation">
                  Voucher Allocation
                </label>
                <input
                  disabled
                  id="allocation"
                  name="allocation"
                  type="number"
                  value={formik.values.allocation}
                  onChange={formik.handleChange}
                  // value="0000"
                  placeholder="Enter allocation"
                  className={getInputClassNames("allocation")}
                  {...formik.getFieldProps("allocation")}
                />
                {formik.touched.allocation && formik.errors.allocation && (
                  <div className="text-error text-sm">
                    {formik.errors.allocation}
                  </div>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="unit">
                  Product Unit
                </label>
                <input
                  disabled
                  id="unit"
                  name="unit"
                  type="text"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                  // value="0000"
                  placeholder="Enter unit"
                  className={getInputClassNames("unit")}
                  {...formik.getFieldProps("unit")}
                />
                {formik.touched.unit && formik.errors.unit && (
                  <div className="text-error text-sm">{formik.errors.unit}</div>
                )}
              </div> */}

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
