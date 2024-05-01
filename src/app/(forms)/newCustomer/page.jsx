"use client";
import GoBack from "@/components/GoBack";
import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { new_customer_validate } from "../../../../lib/validate";
import { useAddCustomerMutation } from "@/redux/slices/customerApiSlice";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Please select an image")
    .test(
      "fileSize",
      "Must be less than 3mb",
      (value) => value && value.size < 3072 * 3072
    )
    .test(
      "fileType",
      "Invalid file type",
      (value) => value && ["image/jpeg", "image/jpg"].includes(value.type)
    ),
});

export default function NewCustomer() {
  const [isFormValid, setIsFormValid] = useState(false);
  // const [addCustomer, { isLoading, error }] = useAddCustomerMutation();
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleRemovePreview = () => {
    setPreviewImage(null);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      image: null,
    },
    validate: new_customer_validate,
    validationSchema,
    onSubmit: handleSubmit,
  });
  // console.log(formik.isValid);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const { errors, touched, isSubmitting, setFieldValue } = formik;

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  async function handleSubmit(values) {
    const { fullName, email, phone, address, image } = values;
    setIsLoading(true);
    // Create FormData object
    const formData = new FormData();

    // Append all form data fields
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (image) {
      formData.append("profilePicture", image);
    }

    try {
      // Debugging: Log FormData to ensure all data is appended
      console.log("FormData:", formData);

      // Make Axios request
      const res = await axios.post("/api/customer", formData);

      if (res) {
        setIsLoading(false);
        console.log(res);
        toast.success(res.data.message);
        router.back();
      }
      // Handle response
    } catch (e) {
      setIsLoading(false);
      // Handle errors
      toast.error(e.response.data.message);
      console.log(e);
    }
  }

  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-red-300 text-red-300"
        : ""
    }`;

  return (
    <section className="bg-green300 min-h-screen">
      <div className="container mx-auto pt-5 pb-10">
        <div className="">
          <GoBack />
        </div>

        <div>
          <h2 className="text-xl font-medium text-center mt-5 text-primary">
            Register New Customer
          </h2>

          <div className="mt-10">
            <form onSubmit={formik.handleSubmit} className="mb-4">
              <div className=" h-32 w-40 mx-auto mb-5 relative overflow-hidden ">
                <label
                  className={`${
                    previewImage ? "opacity-25" : ""
                  } border border-gray-400 border-dashed   h-full w-full  absolute inline-block rounded-lg`}
                  htmlFor="image"
                >
                  <div>
                    <span className="bg-gray-400  text-xs m-1 px-2 py-1 rounded-lg block w-fit">
                      Choose File
                    </span>
                    <div className="flex flex-col w-full mt-8 items-center text-upload px-2 py-1 rounded-lg ">
                      {/* <AiOutlineCloudUpload size={20} fill="#7164C0" /> */}
                      <span className="text-xs">Upload image</span>
                    </div>
                  </div>
                </label>
                <input
                  className="mx-2 hidden"
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />

                <div className="h-full  top-0 right-0 left-0 bottom-0 bg-white">
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-center object-cover rounded-md"
                      width={500}
                      height={500}
                      priority
                    />
                  )}
                </div>
              </div>
              {
                <div className="text-sm text-error text-center -mt-3">
                  {errors.image}
                </div>
              }
              {previewImage && !errors.image}

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
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter Address"
                  className={getInputClassNames("address")}
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-error text-sm">
                    {formik.errors.address}
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
                {isLoading ? <Loader /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
