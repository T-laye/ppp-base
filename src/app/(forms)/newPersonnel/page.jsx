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
import { useRegisterMutation } from "@/redux/slices/registerApiSlice";
import { personnel_validate } from "../../../../lib/validate";

export default function NewPersonnel() {
  const [isFormValid, setIsFormValid] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading, error }] = useRegisterMutation();

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      role: "",
    },
    validate: personnel_validate,
    onSubmit: handleSubmit,
  });
  // console.log(formik.isValid);

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    const { fullName, email, phone, address, password, role, gender } = values;
    try {
      const res = await register({
        name: fullName,
        email,
        phoneNumber: phone,
        address,
        password,
        role,
        gender,
      }).unwrap();
      // dispatch(setCredentials({ ...res.data }));
      // console.log(res);
      // console.log(values);
      toast.success(res.message);
      // router.push();
    } catch (e) {
      toast.error(e.data.message);
      // console.log(e);
    }
  }

  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-red-300 text-red-300"
        : ""
    }`;

  // const [showBg, setShowBg] = useState(false);
  // setTimeout(() => {
  //   setShowBg(!showBg);
  // }, 5000);

  return (
    <section className="bg-green300 min-h-screen">
      <div className="container mx-auto pt-5 pb-10">
        <div className="">
          <GoBack />
        </div>

        <div>
          <h2 className="text-xl font-medium text-center mt-5 text-primary">
            Register New Personnel
          </h2>

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit} className="mb-4">
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
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
              <div className="flex flex-col relative">
                <label className="text-sm mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={getInputClassNames("password")}
                  {...formik.getFieldProps("password")}
                />
                <div
                  onClick={viewPassword}
                  className=" absolute right-4 bottom-4 cursor-pointer"
                >
                  {showPassword ? (
                    <Image height={18} src={invisible} alt="show icon" />
                  ) : (
                    <Image height={14} src={visible} alt="show icon" />
                  )}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-error text-sm">
                  {formik.errors.password}
                </div>
              )}
              <div className="flex flex-col mt-4">
                <label className="text-sm mb-2" htmlFor="role">
                  Role
                </label>
                <select
                  // disabled={!isEditable}
                  id="role"
                  name="role"
                  placeholder="Select role"
                  className={getInputClassNames("role")}
                  {...formik.getFieldProps("role")}
                >
                  <option>Select role</option>
                  {/* <option value="ADMIN">Male</option> */}
                  <option value="PERSONEL">Personnel</option>
                  <option value="MANAGEMENT">Management</option>
                  {/* {renderJobCategories()} */}
                </select>
                {formik.touched.role && formik.errors.role && (
                  <div className="text-error text-sm">{formik.errors.role}</div>
                )}
              </div>
              <div className="flex flex-col  mb-6 mt-4">
                <label className="text-sm mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  // disabled={!isEditable}
                  id="gender"
                  name="gender"
                  placeholder="Select gender"
                  className={getInputClassNames("gender")}
                  {...formik.getFieldProps("gender")}
                >
                  <option>Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  {/* {renderJobCategories()} */}
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-error text-sm">
                    {formik.errors.gender}
                  </div>
                )}
              </div>

              {/* <div className="flex space-x-4">
                <div className="flex items-center mt-6 ">
                  <div>
                    <input
                      name="checkbox-admin"
                      id="checkbox-admin"
                      type="checkbox"
                      className={`h-[14px] w-[14px] rounded-md ${getInputClassNames(
                        "admin"
                      )}`}
                      {...formik.getFieldProps("admin")}
                    />
                  </div>
                  <div className="text-sm ml-2">
                    <label htmlFor="checkbox-admin">Make Admin</label>
                  </div>
                </div>

                <div className="flex items-center mt-6 ">
                  <div>
                    <input
                      name="checkbox"
                      id="checkbox"
                      type="checkbox"
                      className={`h-[14px] w-[14px] rounded-md ${getInputClassNames(
                        "management"
                      )}`}
                      {...formik.getFieldProps("management")}
                    />
                  </div>
                  <div className="text-sm ml-2">
                    <label htmlFor="checkbox">Make Management</label>
                  </div>
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
        </div>
      </div>
    </section>
  );
}
