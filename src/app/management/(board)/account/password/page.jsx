"use client";
import GoBack from "@/components/GoBack";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import visible from "/public/icons/visible_eye.svg";
import invisible from "/public/icons/invisible_eye.svg";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { edit_password_validate } from "../../../../../../lib/validate";

export default function Password() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const viewNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validate: edit_password_validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    // console.log(values);
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

  return (
    <section className="bg-green300 min-h-screen">
      <div className="container mx-auto pt-5 pb-20">
        <div className="flex justify-between items-center mt-2">
          <GoBack />
        </div>
        <div>
          <h2 className="text-xl font-medium text-center mt-5 text-primary">
            Edit Password
          </h2>

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit} className="mb-4">
              <div className="flex flex-col relative mt-2">
                <label className="text-sm mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={getInputClassNames("newPassword")}
                  {...formik.getFieldProps("newPassword")}
                />
                <div
                  onClick={viewNewPassword}
                  className=" absolute right-4 bottom-4 cursor-pointer"
                >
                  {showNewPassword ? (
                    <Image height={18} src={invisible} alt="show icon" />
                  ) : (
                    <Image height={14} src={visible} alt="show icon" />
                  )}
                </div>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="text-error text-sm">
                  {formik.errors.newPassword}
                </div>
              )}
              <div className="flex flex-col relative mt-4">
                <label className="text-sm mb-2" htmlFor="password">
                  Old Password
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

              <button
                type="submit"
                className={`btn w-full h-11 mt-6 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl  ${
                  isFormValid
                    ? `${isLoading ? "bg-customGray" : "bg-primary"}`
                    : "bg-customGray cursor-not-allowed"
                } `}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? <Loader /> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
