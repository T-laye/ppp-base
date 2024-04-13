"use client";
import GoBack from "@/components/GoBack";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { toast } from "react-toastify";
import visible from "/public/icons/visible_eye.svg";
import invisible from "/public/icons/invisible_eye.svg";
import Image from "next/image";
import { personnel_validate } from "../../../../../../../lib/validate";
import Loading from "@/components/Loading";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getWorker } from "@/redux/slices/getWorkerSlice";
import axios from "axios";

export default function Page() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { worker } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  // console.log(worker);
  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const getWorkerDetails = async () => {
      const res = await axios.get(`/api/admin/staff/${id}`);

      // console.log(res);
      dispatch(getWorker({ ...res.data.data }));
    };

    getWorkerDetails();
  }, [dispatch, id]);

  // console.log(isEditable);

  const formik = useFormik({
    initialValues: {
      fullName: worker?.name,
      email: worker?.email,
      phone: worker?.phoneNumber,
      address: worker?.address,
      gender: worker?.gender,
      role: worker?.role,
      password: "",
    },
    validate: personnel_validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    const { fullName, email, phone, address, gender, role, password } = values;
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `/api/admin/staff/${id}?email=${email}&name=${fullName}&phoneNumber=${phone}&address=${address}&gender=${gender}&role=${role}&password=${password}`
      );
      console.log(res);
      if (res) {
        setIsLoading(false);
        toast.success(res.data.data.message);
        router.back();
      }
      // console.log(values);
    } catch (e) {
      toast.error(e.data.message);
      setIsLoading(false);
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
      <h3 className="text-center text-lg font-medium mt-3">
        Personnel Details
      </h3>

      <div className="mt-8">
        {!worker?.name ? (
          <Loading />
        ) : (
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

            <div className="flex flex-col mt-4">
              <label className="text-sm mb-2" htmlFor="role">
                Role
              </label>
              <select
                // disabled={!isEditable}
                id="role"
                name="role"
                placeholder="Select role"
                value={worker?.role}
                className={getInputClassNames("role")}
                {...formik.getFieldProps("role")}
              >
                <option>Select role</option>
                {/* <option value="ADMIN">Male</option> */}
                <option value="PERSONNEL">Personnel</option>
                <option value="MANAGEMENT">Management</option>
                <option value="ADMIN">Admin</option>
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
                <div className="text-error text-sm">{formik.errors.gender}</div>
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
        )}
      </div>
    </section>
  );
}
