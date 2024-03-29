"use client";
import Logo from "@/components/Logo";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import visible from "/public/icons/visible_eye.svg";
import invisible from "/public/icons/invisible_eye.svg";
import Loader from "@/components/Loader.jsx";
// import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn_validate } from "../../../lib/validate";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

export default function AdminSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role:'ADMIN'
    },
    validate: signIn_validate,
    onSubmit: handleSubmit,
  });
  // console.log(formik.isValid);

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

   async function handleSubmit(values) {
    const { email, password } = values;
    const route = "/admin/stats"
    // loginUser({ email, password }, dispatch, router);
    try {
      const res = await login({ email, password, }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      console.log(res);
      console.log(values);
      toast.success(res.message);
      router.push(route);
    } catch (e) {
      toast.error(e.data.message);
      console.log(e);
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
    <section className="min-h-screen">
      <div className="bgblue-200">
        <div className="logo mt-5 text-primary font-medium text-4xl text-center">
          <div className="h-36 w-full object-contain">
            <Image
              src="/images/logo-removebg.png"
              alt="PPP-Base Logo"
              height={200}
              width={200}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <h3 className="mt-4 text-2xl font-bold">Admin Login</h3>

        <div className="mt-8">
          <form onSubmit={formik.handleSubmit} className="mb-4">
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
                <div className="text-error text-sm">{formik.errors.email}</div>
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
                className=" absolute right-4 bottom-3 cursor-pointer"
              >
                {showPassword ? (
                  <Image height={18} src={invisible} alt="show icon" />
                ) : (
                  <Image height={14} src={visible} alt="show icon" />
                )}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-error text-sm">{formik.errors.password}</div>
            )}
            {/* <div className="text-sm mt-4 font-medium text-right">
              <Link href="/signIn/forgotPassword" className="text-gray-500">
                {" "}
                Forgot Password ?
              </Link>
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
              {isLoading ? <Loader /> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
