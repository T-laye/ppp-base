"use client";
import GoBack from "@/components/GoBack";
import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email_template: "",
      subject: "",
      title: "",
      body: "",
    },
    // validate: edit_email_validate,
    onSubmit: handleSubmit,
  });
  // console.log(formik.isValid);

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  useEffect(() => {
    const getEmail = async () => {
      const res = await axios.get(
        `/api/admin/email?type=${formik.values.email_template}`
      );

      console.log(res);
    };

    getEmail();
  }, [formik.values.email_template]);

  async function handleSubmit(values) {
    setIsLoading(true);
    const { title, subject, body, email_template } = values;
    try {
      // const res = await axios.patch(
      //   `/api/admin/email?type=${email_template}&body=${body}&title=${title}&subject=${subject}`
      // );
      const res = await axios.post("/api/admin/email", {
        title,
        subject,
        body,
        type: email_template,
      });
      console.log(values);
      if (res) {
        console.log(res);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-error text-error"
        : ""
    }`;

  return (
    <section className="bg-green300 min-h-screen">
      <div className="container mx-auto pt-5 pb-10">
        <div className="">
          <GoBack />
        </div>
        <div>
          <h2 className="text-xl font-medium text-center mt-5 mb-7">
            Edit Email Template
          </h2>

          <form onSubmit={formik.handleSubmit} className="mb-4">
            <div className="flex flex-col  mb-6">
              <label className="text-sm mb-2" htmlFor="email_template">
                Select Email Template
              </label>
              <select
                required
                id="email_template"
                name="email_template"
                placeholder="Select Email Template"
                className={getInputClassNames("email_template")}
                {...formik.getFieldProps("email_template")}
              >
                <option>Choose Template</option>
                <option value="CUSTOMER_ENROLMENT">Customer Enrollment</option>
                <option value="VOUCHER_CREATION">Voucher Creation</option>
                <option value="VOUCHER_DISPENSE">Voucher Dispense</option>
                {/* {renderProducts()} */}
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                required
                type="text"
                placeholder="Enter Subject"
                className={getInputClassNames("subject")}
                {...formik.getFieldProps("subject")}
              />
              {formik.touched.subject && formik.errors.subject && (
                <div className="text-error text-sm">
                  {formik.errors.subject}
                </div>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="title">
                Title
              </label>
              <input
                required
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                className={getInputClassNames("title")}
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-error text-sm">{formik.errors.title}</div>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="body">
                Body
              </label>
              <textarea
                id="body"
                required
                name="body"
                type="text"
                placeholder="Enter body"
                className={getInputClassNames("body")}
                {...formik.getFieldProps("body")}
              />
              {formik.touched.body && formik.errors.body && (
                <div className="text-error text-sm">{formik.errors.body}</div>
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
                {isLoading ? <Loader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
