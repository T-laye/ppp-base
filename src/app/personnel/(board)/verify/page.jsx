"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader.jsx";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { new_voucher_validate } from "../../../../../lib/validate";

export default function Verify() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "Mr. Matthew Paul",
      email: "matt@gmail.com",
      phone: "090847384399",
      address: "No. 23 oacnj oskcol sjonoNCOJKCONC ACNOkcn",
      poc: "Exxon Mobil Fueling Station",
      product: "Fuel",
      pick_up_person: "",
      vehicle_type: "",
      vehicle_plate_number: "",
      phone_of_pick_up_person: "",
      third_party: true,
    },
    validate: new_voucher_validate,
    onSubmit: handleSubmit,
  });

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

  useEffect(() => {
    if (loading) {
      const loadingToast = toast.loading("Checking Voucher");

      setValid(false);
      // Return a cleanup function to remove the loading toast when loading state becomes false
      return () => {
        toast.dismiss(loadingToast);
      };
    }
  }, [loading]);

  const handleChange = (e) => {
    const voucher = e.target.value.trim(); // Remove leading and trailing whitespace

    setTerm(voucher);

    if (voucher.length === 0 || voucher.length === 10) {
      setLoading(false); // Set loading to false when input field is empty or has 10 characters
    } else {
      setLoading(true); // Set loading to true when input field has content but is not 10 characters
    }

    if (voucher.length === 10 && !voucher.includes(" ")) {
      // Assuming the correct voucher number is "1234567890"
      if (voucher === "1234567890") {
        setLoading(false);
        toast.success("Verification Successful");
        setValid(true);
      } else {
        setLoading(false);
        setValid(false);
        toast.error("Invalid Voucher");
      }
    }
  };

  return (
    <section className="pt-5 pb-20">
      <div>
        <h4 className="font-medium text-base mt-2 text-center">
          Voucher Verification
        </h4>
        <div className="mt-4">
          {/* <form action="" onSubmit={(e) => e.preventDefault()}> */}
          <div className="relative ">
            <input
              maxLength={10}
              type="text"
              placeholder="Enter Voucher Number"
              className="w-full  p-2 outline-none rounded-xl   text-base  placeholder:text-sm placeholder:font-normal "
              value={term}
              onChange={handleChange}
            />
            <div className="absolute top-3 right-2.5 text-gray-400">
              {/* <BiSearchAlt2 size={20} /> */}
            </div>
          </div>
          {loading && (
            <div className="text-error text-sm mt-1 font-medium">
              Not less than 10 digits !!!
            </div>
          )}
          {/* </form> */}
        </div>

        {valid && (
          <>
            <div>
              <h4 className="font-medium text-base mt-10 text-enter">
                Voucher Details
              </h4>
            </div>
            <div className="mt-4">
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
                <div className="flex flex-col  mb-6">
                  <label className="text-sm mb-2" htmlFor="poc">
                    Point of Collection
                  </label>
                  <select
                    disabled
                    id="poc"
                    name="poc"
                    placeholder="Select Preffered POC"
                    className={getInputClassNames("poc")}
                    {...formik.getFieldProps("poc")}
                  >
                    <option value={formik.values.poc}>
                      {formik.values.poc}
                    </option>
                  </select>
                  {formik.touched.poc && formik.errors.poc && (
                    <div className="text-error text-sm">
                      {formik.errors.poc}
                    </div>
                  )}
                </div>

                <div className="flex flex-col  mb-6">
                  <label className="text-sm mb-2" htmlFor="product">
                    Select Product
                  </label>
                  <select
                    disabled
                    id="product"
                    name="product"
                    placeholder="Select Product"
                    className={getInputClassNames("product")}
                    {...formik.getFieldProps("product")}
                  >
                    <option value={formik.values.product}>
                      {formik.values.product}
                    </option>
                  </select>
                  {formik.touched.product && formik.errors.product && (
                    <div className="text-error text-sm">
                      {formik.errors.product}
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-6 mb-4 ">
                  <div>
                    <input
                      checked={formik.values.third_party}
                      disabled
                      name="checkbox"
                      id="checkbox"
                      type="checkbox"
                      className={`h-[14px] w-[14px] rounded-md ${getInputClassNames(
                        "third_party"
                      )}`}
                      {...formik.getFieldProps("third_party")}
                    />
                  </div>
                  <div className="text-sm ml-2">
                    <label htmlFor="checkbox">Allow Third Party</label>
                  </div>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2" htmlFor="pick_up_person">
                    Pick Up Person Name
                  </label>
                  <input
                    id="pick_up_person"
                    name="pick_up_person"
                    type="text"
                    placeholder="Enter full name"
                    className={getInputClassNames("pick_up_person")}
                    {...formik.getFieldProps("pick_up_person")}
                  />
                  {formik.touched.pick_up_person &&
                    formik.errors.pick_up_person && (
                      <div className="text-error text-sm">
                        {formik.errors.pick_up_person}
                      </div>
                    )}
                </div>

                <div className="flex flex-col mt-4 mb-4">
                  <label className="text-sm mb-2" htmlFor="vehicle_type">
                    Vehicle Type
                  </label>
                  <input
                    id="vehicle_type"
                    name="vehicle_type"
                    type="text"
                    placeholder="Enter Vehicle Type"
                    className={getInputClassNames("vehicle_type")}
                    {...formik.getFieldProps("vehicle_type")}
                  />
                  {formik.touched.vehicle_type &&
                    formik.errors.vehicle_type && (
                      <div className="text-error text-sm">
                        {formik.errors.vehicle_type}
                      </div>
                    )}
                </div>

                <div className="flex flex-col mt-4 mb-4">
                  <label
                    className="text-sm mb-2"
                    htmlFor="vehicle_plate_number"
                  >
                    Vehicle Plate Number
                  </label>
                  <input
                    id="vehicle_plate_number"
                    name="vehicle_plate_number"
                    type="text"
                    placeholder="Enter Vehicle Plate Number"
                    className={getInputClassNames("vehicle_plate_number")}
                    {...formik.getFieldProps("vehicle_plate_number")}
                  />
                  {formik.touched.vehicle_plate_number &&
                    formik.errors.vehicle_plate_number && (
                      <div className="text-error text-sm">
                        {formik.errors.vehicle_plate_number}
                      </div>
                    )}
                </div>

                <div className="flex flex-col mt-4 mb-4">
                  <label
                    className="text-sm mb-2"
                    htmlFor="phone_of_pick_up_person"
                  >
                    Phone Number of Pick Up Person
                  </label>
                  <input
                    id="phone_of_pick_up_person"
                    name="phone_of_pick_up_person"
                    type="tel"
                    placeholder="Enter Phone Number"
                    className={getInputClassNames("phone_of_pick_up_person")}
                    {...formik.getFieldProps("phone_of_pick_up_person")}
                  />
                  {formik.touched.phone_of_pick_up_person &&
                    formik.errors.phone_of_pick_up_person && (
                      <div className="text-error text-sm">
                        {formik.errors.phone_of_pick_up_person}
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
                  {isLoading ? <Loader /> : "Create Voucher"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
