"use client";
import GoBack from "@/components/GoBack";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { toast } from "react-toastify";
import { personnel_validate } from "../../../../../../../lib/validate";

export default function Page() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  // console.log(isEditable);

  const formik = useFormik({
    initialValues: {
      fullName: "James Brown",
      email: "12345@dinvkd.odkdv",
      phone: "090334023033",
      address: "No. 12 Okoloba junction , Express way warri.",
      password: "",
      admin: false,
      management: false,
      personnel: true,
    },
    validate: personnel_validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  useEffect(() => {
    if (!isEditable) {
      // Create a copy of the existing formik values
      const updatedValues = { ...formik.values };

      // Update only the values that are not changed by the user
      // if (!formik.touched.name) {
      //   updatedValues.name = hustleDetails.name;
      // }
      // if (!formik.touched.email) {
      //   updatedValues.email = hustleDetails.email;
      // }
      // if (!formik.touched.address) {
      //   updatedValues.address = user.address;
      // }
      // if (!formik.touched.personnel) {
      //   updatedValues.personnel = user.personnel;
      // }
      // if (!formik.touched.product) {
      //   updatedValues.product = user.product;
      // }
      // if (!formik.touched.linit) {
      //   updatedValues.linit = hustleDetails.linit;
      // }
      // if (!formik.touched.hustle) {
      //   updatedValues.hustle = hustleDetails.hustle;
      // }
      // if (!formik.touched.address) {
      //   updatedValues.address = user.address;
      // }
      // if (!formik.touched.businessPhone) {
      //   updatedValues.businessPhone = hustleDetails.businessPhone;
      // }
      // if (!formik.touched.link) {
      //   updatedValues.link = hustleDetails.link;
      // }
      // if (!formik.touched.hustleDescription) {
      //   updatedValues.hustleDescription = hustleDetails.hustleDescription;
      // }

      // Update the formik values with the modified copy
      // formik.setValues(updatedValues);
    }
  }, [formik.values, isEditable]);

  async function handleSubmit(values) {
    // const { email, password } = values;
    console.log(values);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditable(false);
      toast.success("Successful");
    }, 2000);
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
        {/* <button
          onClick={handleEdit}
          className={`btn ${!isEditable ? "bg-primary" : "bg-customGray"}`}
        >
          {isEditable ? "Cancel" : "Edit"}
        </button> */}
      </div>
      <h3 className="text-center text-lg font-medium mt-3">
        Personnel Details
      </h3>

      <div className="mt-8">
        <form onSubmit={formik.handleSubmit} className="mb-4">
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
            //   disabled={!isEditable}
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter full name"
              className={getInputClassNames("fullName")}
              {...formik.getFieldProps("fullName")}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-error text-sm">{formik.errors.fullName}</div>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
            //   disabled={!isEditable}
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
            <label className="text-sm mb-2" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="address"
            //   disabled={!isEditable}
              placeholder="Enter address"
              className={getInputClassNames("address")}
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-error text-sm">{formik.errors.address}</div>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
            //   disabled={!isEditable}
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
         

            <button
              type="submit"
              className={`btn w-full h-11 mt-6 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl  ${
                isFormValid
                  ? `${isLoading ? "bg-customGray" : "bg-primary"}`
                  : "bg-customGray cursor-not-allowed"
              } `}
              // disabled={!isFormValid || isLoading}
            >
              {isLoading ? <Loader /> : "Save"}
            </button>
      
        </form>
      </div>
    </section>
  );
}
