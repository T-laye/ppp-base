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
import { toast } from "react-toastify";
import { signIn_validate } from "../../lib/validate";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

export default function Home() {
  const [userRole, setUserRole] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!userInfo) {
  //     router.push("/");
  //   }
  // }, [router, userInfo]);

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
    const role = userRole ? "MANAGEMENT" : "PERSONEL";
    const route = userRole ? "/management/stats" : "/personnel/stats";
    // loginUser({ email, password }, dispatch, router);
    try {
      const res = await login({ email, password, role }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      // console.log(res);
      // console.log(values);
      toast.success(res.message);
      router.push(route);
    } catch (e) {
      toast.error(e.data.message);
      // console.log(e);
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

  const handleRole = () => {
    setUserRole(!userRole);
  };
  // console.log(role);

  return (
    <main className="bg-primar min-h-screen container mx-auto">
      {/* <SignHeader signInPage={true} /> */}
      <section className="px-4">
        <div className="h-28 w-full object-contain mt-5">
          <Image
            src="/images/logo-removebg.png"
            alt="PPP-Base Logo"
            height={200}
            width={200}
            className="h-full w-full object-contain"
          />
        </div>
        <h3 className="mt-4 ">
          Choose Account Type <br /> To Sign In
        </h3>

        <div className="mt-8">
          <div
            onClick={handleRole}
            className="relative text-base fontmedium text-white flex justify-between borde bg-customGray border-primary w-60 px-4 py-1.5 rounded-xl mx-auto cursor-pointer"
          >
            <div className=" w-1/2 px-2">Personnel</div>
            <div className=" w-1/2 text-end">Management</div>
            <div
              className={`${
                userRole
                  ? "translate-x-full left-0.5 duration-200"
                  : "duration-200 translate-x-0 -left-0.5"
              }  absolute duration-200 text-center text-base w-1/2 bg-primary text-white font-medium  top-0 rounded-xl py-1.5  `}
            >
              {userRole ? "Management" : "Personnel"}
            </div>
          </div>
        </div>

        {/* Sign in Form */}

        <div>
          {/* <h3 className="text-left mt-7 mb-4 "></h3> */}

          <div className="mt-10">
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
                  <div className="text-error text-sm">
                    {formik.errors.email}
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
                <div className="text-error text-sm">
                  {formik.errors.password}
                </div>
              )}
              {/* <div className="text-sm mt-4 font-medium text-right">
                <Link href="/signIn/forgotPassword" className="text-gray-500">
                  {" "}
                  Forgot Password ?
                </Link>
              </div> */}
              <button
                type="submit"
                className={`btn w-full h-11 mt-8 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl  ${
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
    </main>
  );
}
