"use client";
import GoBack from "@/components/GoBack";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { toast } from "react-toastify";
import { poc_validate } from "../../../../../../../lib/validate";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loading";
import axios from 'axios'
import { getPoc } from "@/redux/slices/getPocSlice";

export default function Page() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { poc } = useSelector((state) => state.poc);
  
  // console.log(poc, id);

  useEffect(() => {
    const getPocDetails = async () => {
      const res = await axios.get(`/api/poc/${id}`);
      // console.log(res);

      dispatch(getPoc({ ...res.data.data }));
    };

    getPocDetails();
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      name: poc?.name,
      email: poc?.email,
      phone: poc?.phoneNumber,
      address: poc?.address,
      limit: poc?.stockLimit,
      available: poc?.stockAvailable,
    },
    validate: poc_validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    const { name, email, phone, address, limit, available } = values;
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `/api/poc/${id}?email=${email}&poc_name=${name}&phoneNumber=${phone}&address=${address}&stockLimit=${limit}&stockAvailable=${available}`
      );
      console.log(res);
      if (res) {
        setIsLoading(false);
        toast.success(res.data.data.message);
        // router.back();
      }
      // console.log(values);
    } catch (e) {
      setIsLoading(false);
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
        {/* <button
          onClick={handleEdit}
          className={`btn ${!isEditable ? "bg-primary" : "bg-customGray"}`}
        >
          {isEditable ? "Cancel" : "Edit"}
        </button> */}
      </div>
      <h3 className="text-center text-lg font-medium mt-3">POC Details</h3>

      {poc?.name ? (
        <div className="mt-6">
          <form onSubmit={formik.handleSubmit} className="mb-4">
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="name">
                POC Name
              </label>
              <input
                id="name"
                //   disabled={!isEditable}
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
                //   disabled={!isEditable}
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
            {/* <div className="flex flex-col  mb-6">
            <label className="text-sm mb-2" htmlFor="personnel">
              Select Personnel
            </label>
            <select
              //   disabled={!isEditable}
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
            </select>
            {formik.touched.personnel && formik.errors.personnel && (
              <div className="text-error text-sm">
                {formik.errors.personnel}
              </div>
            )}
          </div> */}
            {/* <div className="flex flex-col  mb-6">
            <label className="text-sm mb-2" htmlFor="management">
              Select Management
            </label>
            <select
              //   disabled={!isEditable}
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
            </select>
            {formik.touched.management && formik.errors.management && (
              <div className="text-error text-sm">
                {formik.errors.management}
              </div>
            )}
          </div> */}
            {/* <div className="flex flex-col  mb-6">
            <label className="text-sm mb-2" htmlFor="product">
              Select Product
            </label>
            <select
              //   disabled={!isEditable}
              id="product"
              name="product"
              placeholder="Select Product"
              className={getInputClassNames("product")}
              {...formik.getFieldProps("product")}
            >
              <option>{formik.values.product}</option>
              <option value="fuel">Fuel</option>
              <option value="diesel">Diesel</option>
 {renderJobCategories()} 
            </select>
            {formik.touched.product && formik.errors.product && (
              <div className="text-error text-sm">{formik.errors.product}</div>
            )}
          </div> */}
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="limit">
                Stock Limit Level
              </label>
              <input
                //   disabled={!isEditable}
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
                //   disabled={!isEditable}
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
              {isLoading ? <Loader /> : "Save"}
            </button>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}
