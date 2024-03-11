"use client";
import GoBack from "@/components/GoBack";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { poc_validate } from "../../../../../../lib/validate";
import { toast } from "react-toastify";

export default function Page() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const formik = useFormik({
    initialValues: {
      name: "Total Fueling Station",
      email: "total@gmail.com",
      phone: "09030203945",
      address: "N0. 2 Ajamoga, warri, Delta state",
      personnel: "John Matthew",
      management: "Priscilla Franklin",
      product: "Fuel",
      limit: 1000,
      available: 300,
      dispensed: 30000,
    },
    validate: poc_validate,
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
        <button
          onClick={handleEdit}
          className={`btn ${!isEditable ? "bg-primary" : "bg-customGray"}`}
        >
          {isEditable ? "Cancel" : "Edit"}
        </button>
      </div>
      <h3 className="text-center text-lg font-medium mt-3">POC Details</h3>

      <div className="mt-8">
        <form onSubmit={formik.handleSubmit} className="mb-4">
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
              name="address"
              type="address"
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
              disabled={!isEditable}
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
          <div className="flex flex-col  mb-6">
            <label className="text-sm mb-2" htmlFor="personnel">
              Select Personnel
            </label>
            <select
              disabled={!isEditable}
              id="personnel"
              name="personnel"
              placeholder="Select personnel"
              className={getInputClassNames("personnel")}
              {...formik.getFieldProps("personnel")}
            >
              <option>{formik.values.personnel}</option>
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
              disabled={!isEditable}
              id="management"
              name="management"
              placeholder="Select management"
              className={getInputClassNames("management")}
              {...formik.getFieldProps("management")}
            >
              <option>{formik.values.management}</option>
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
              disabled={!isEditable}
              id="product"
              name="product"
              placeholder="Select Product"
              className={getInputClassNames("product")}
              {...formik.getFieldProps("product")}
            >
              <option>{formik.values.product}</option>
              <option value="fuel">Fuel</option>
              <option value="diesel">Diesel</option>
              {/* {renderJobCategories()} */}
            </select>
            {formik.touched.product && formik.errors.product && (
              <div className="text-error text-sm">{formik.errors.product}</div>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2" htmlFor="limit">
              Stock Limit Level
            </label>
            <input
              disabled={!isEditable}
              id="limit"
              name="limit"
              type="number"
              placeholder="Enter Limit"
              className={getInputClassNames("limit")}
              {...formik.getFieldProps("limit")}
            />
            {formik.touched.limit && formik.errors.limit && (
              <div className="text-error text-sm">{formik.errors.limit}</div>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2" htmlFor="available">
              Stock Available
            </label>
            <input
              id="available"
              disabled={!isEditable}
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
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2" htmlFor="dispensed">
              Product Dispensed Till Date
            </label>
            <input
              id="dispensed"
              disabled
              name="dispensed"
              type="number"
              placeholder="Enter dispensed"
              className={getInputClassNames("dispensed")}
              {...formik.getFieldProps("dispensed")}
            />
            {formik.touched.dispensed && formik.errors.dispensed && (
              <div className="text-error text-sm">
                {formik.errors.dispensed}
              </div>
            )}
          </div>

          {isEditable && (
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
          )}
        </form>
      </div>
    </section>
  );
}
