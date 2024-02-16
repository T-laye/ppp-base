"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import visible from "/public/icons/visible_eye.svg";
import invisible from "/public/icons/invisible_eye.svg";
import Loader from "@/components/Loader.jsx";
// import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn_validate, signUp_validate } from "@/lib/validate";
import { toast } from "react-toastify";
import SignHeader from "@/components/SignHeader";

export default function SignUp() {
  const [role, setRole] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      userRole: role ? "Operator" : "Staff",
      password: "",
    },
    validate: signUp_validate,
    onSubmit: handleSubmit,
  });
  // console.log(formik.isValid);

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    const { fullName, email, phone, password } = values;

    console.log(values);
    setPending(true);
    setTimeout(() => {
      setPending(false);
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

  const handleRole = () => {
    setRole(!role);
  };
  // console.log(role);

  return (
    <main className="bg-primar min-h-screen container mx-auto">
      <SignHeader signInPage={false} />
      <section className="px-4 pb-10">
        <h3 className="mt-8">
          Choose Account Type <br /> To Sign Up
        </h3>

        <div className="mt-8">
          <div
            onClick={handleRole}
            className="relative text-base fontmedium text-white flex justify-between borde bg-customGray border-primary w-44 px-4 py-1.5 rounded-xl mx-auto cursor-pointer"
          >
            <div className=" w-1/2 px-2">Staff</div>
            <div className=" w-1/2 text-end">Operator</div>
            <div
              className={`${
                role
                  ? "translate-x-full left-0.5 duration-200"
                  : "duration-200 translate-x-0 -left-0.5"
              }  absolute duration-200 text-center text-base w-1/2 bg-primary text-white font-medium  top-0 rounded-xl py-1.5  `}
            >
              {role ? "operator" : "staff"}
            </div>
          </div>
        </div>

        {/* Sign in Form */}

        <div>
          {/* <h3 className="text-left mt-7 mb-4 "></h3> */}

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit} className="mb-4">
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="fullName">
                  {role ? "Operator's Full Name" : "Staff's Full Name"}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter Full Name"
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
                <label className="text-sm mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone"
                  className={getInputClassNames("phone")}
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-error text-sm">
                    {formik.errors.phone}
                  </div>
                )}
              </div>

              <div className="flex flex-col   mb-6">
                <label className="text-sm mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  className={getInputClassNames("address")}
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-error text-sm">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div className="flex flex-col   mb-6">
                <label className="text-sm mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  placeholder="Select gender"
                  className={getInputClassNames("gender")}
                  {...formik.getFieldProps("gender")}
                >
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-error text-sm">
                    {formik.errors.gender}
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
              <button
                type="submit"
                className={`btn w-full h-11 mt-10 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl ${
                  isFormValid
                    ? `${pending ? "bg-customGray" : "bg-primary"}`
                    : "bg-customGray cursor-not-allowed"
                } `}
                disabled={!isFormValid || pending}
              >
                {pending ? <Loader /> : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
