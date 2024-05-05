"use client";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader.jsx";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { new_voucher_validate } from "../../../../../lib/validate";
import axios from "axios";
import DetailList from "@/components/DetailList";
import Image from "next/image";
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsFillFuelPumpDieselFill, BsFillTelephoneFill } from "react-icons/bs";
import { ImDroplet } from "react-icons/im";
import { useSelector } from "react-redux";
import DispenseSuccess from "../../components/DispenseSucces";

export default function Verify() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();
  const { worker } = useSelector((state) => state.worker);
  const personnelPocData = worker?.personnel_poc_data
    ?.map((p) => p.poc_name)
    .flat();
  const personnelPocId = worker?.personnel_poc_data
    ?.map((p) => p.poc_id)
    .flat();

  // console.log(personnelPocId?.[0]);
  const voucherLength = 11;

  const formik = useFormik({
    initialValues: {
      pick_up_person: "", // Update pick_up_person based on checked state
      vehicle_type: "",
      vehicle_plate_number: "",
      phone_of_pick_up_person: "",
      third_party: false,
    },
    // validate: new_voucher_validate,
    onSubmit: handleSubmit,
  });

  // console.log(data);

  useEffect(() => {
    setIsFormValid(formik.isValid);
    // formik.setFieldValue('pick_up_person', data?.customer?.name);
  }, [formik.values, formik.errors, formik.isValid]);

  useEffect(() => {
    if (formik.values.third_party === true) {
      formik.setFieldValue("pick_up_person", "");
      formik.setFieldValue("phone_of_pick_up_person", "");
    } else if (formik.values.third_party === false) {
      formik.setFieldValue("pick_up_person", data?.customer?.name);
      formik.setFieldValue(
        "phone_of_pick_up_person",
        data?.customer?.phoneNumber
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.third_party, data]);

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/admin/voucher/verify", {
        pocId: personnelPocId?.[0],
        voucherCode: data?.voucher?.voucherCode,
        vehicleType: values.vehicle_type,
        vehicleNumber: values.vehicle_plate_number,
        thirdParty: values.third_party,
        thirdPartyName: values.pick_up_person,
        thirdPartyPhoneNumber: values.phone_of_pick_up_person,
      });

      console.log(res);
      if (res.data) {
        setIsLoading(false);
        toast.success("Successful");
        setOpenModal(true);
        // router.push("/personnel/verify/success");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  }

  function capitalizeWords(sentence) {
    // Split the sentence into an array of words
    let words = sentence?.split(" ");

    // Iterate over each word
    for (let i = 0; i < words?.length; i++) {
      // Capitalize the first letter of each word
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a sentence
    return words?.join(" ");
  }

  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-error text-error"
        : ""
    }`;

  useEffect(() => {
    if (loading) {
      const loadingToast = toast.loading("Checking Voucher");

      setValid(false);
      // Return a cleanup function to remove the loading toast when loading state becomes false
      return () => {
        toast.dismiss(loadingToast);
      };
    }
  }, [loading]);
  // 2760731FB80
  function handleVerifyVoucher(voucher) {
    const verifyVoucher = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/admin/voucher/verify?code=${voucher}`
        );
        if (res.data.data) {
          setLoading(false);
          setData(res.data.data);
          setValid(true);

          toast.success(res.data.message);
          console.log(res.data);
        }
      } catch (err) {
        setLoading(false);
        setValid(false);
        toast.error("Something went wrong");
        console.error(err);
      }
    };

    verifyVoucher();
  }

  const handleChange = (e) => {
    const voucher = e.target.value.trim();

    setTerm(voucher);

    if (voucher.length === 0 || voucher.length === voucherLength) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    if (voucher.length === voucherLength && !voucher.includes(" ")) {
      handleVerifyVoucher(voucher);
    }
  };
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    formik.setFieldValue("third_party", isChecked);
    // formik.setFieldValue(
    //   "pick_up_person",
    //   isChecked ? data?.customer?.name || "" : ""
    // );
  };

  return (
    <section className="pt-5 pb-20 ">
      <div className="">
        <h4 className="font-medium text-base mt-2 text-center">
          Voucher Verification
        </h4>
        <div className="mt-4">
          <div className="relative">
            <input
              maxLength={voucherLength}
              type="text"
              placeholder="Enter Voucher Number"
              className="w-full p-2 outline-none rounded-xl text-base placeholder:text-sm placeholder:font-normal"
              value={term}
              onChange={handleChange}
            />
            <div className="absolute top-3 right-2.5 text-gray-400">
              {/* Icon component */}
            </div>
          </div>
          {loading && (
            <div className="text-error text-sm mt-1 font-medium">
              Not less than 10 digits !!!
            </div>
          )}
        </div>

        <Suspense>
          {valid && (
            <>
              <div>
                <h4 className="font-medium text-base mt-10 text-enter">
                  Voucher Details
                </h4>
              </div>
              <div className="mt-4">
                <div className="h-48 w-48 mt-5 rounded-lg overflow-hidden mx-auto">
                  <Image
                    className="h-full w-full object-cover"
                    src={data?.customer?.image} // Assuming customer image is in the data object
                    alt={data?.customer?.name} // Assuming customer name is in the data object
                    height={500}
                    width={500}
                  />
                </div>
                <div className="mt-4">
                  <DetailList
                    title="Full Name"
                    value={capitalizeWords(data?.customer?.name)}
                    icon={<FaUser size={16} />}
                  />
                  <DetailList
                    title="Email"
                    value={data?.customer?.email}
                    icon={<MdEmail size={16} />}
                  />
                  <DetailList
                    title="Phone Number"
                    value={data?.customer?.phoneNumber}
                    icon={<BsFillTelephoneFill size={16} />}
                  />
                  <DetailList
                    title="Address"
                    value={capitalizeWords(data?.customer?.address)}
                    icon={<FaLocationDot size={16} />}
                  />
                  <DetailList
                    title="POC Name"
                    value={capitalizeWords(personnelPocData[0])}
                    // value={personnelPocData)}
                    icon={<BsFillFuelPumpDieselFill size={16} />}
                  />
                  <DetailList
                    title="Product"
                    value={capitalizeWords(data?.product?.productName)}
                    icon={<ImDroplet size={16} />}
                  />
                </div>
              </div>

              <form onSubmit={formik.handleSubmit} className="mb-4">
                <div className="flex items-center mt-6 mb-4 ">
                  <div>
                    <input
                      checked={formik.values.third_party} // Controlled component
                      onChange={handleCheckboxChange} // Handle checkbox change
                      name="third_party"
                      id="third_party"
                      type="checkbox"
                      className={`h-[14px] w-[14px] rounded-md ${getInputClassNames(
                        "third_party"
                      )}`}
                      {...formik.getFieldProps("third_party")}
                    />
                  </div>
                  <div className="text-sm ml-2">
                    <label htmlFor="third_party">Allow Third Party</label>
                  </div>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="text-sm mb-2" htmlFor="pick_up_person">
                    Pick Up Person Name
                  </label>
                  <input
                    id="pick_up_person"
                    name="pick_up_person"
                    type="text"
                    required
                    placeholder="Enter full name"
                    className={getInputClassNames("pick_up_person")}
                    {...formik.getFieldProps("pick_up_person")}
                  />
                  {formik.touched.pick_up_person &&
                    formik.errors.pick_up_person && (
                      <div className="text-error text-sm">
                        {formik.errors.pick_up_person}
                      </div>
                    )}
                </div>

                <div className="flex flex-col mt-4 mb-4">
                  <label className="text-sm mb-2" htmlFor="vehicle_type">
                    Vehicle Type
                  </label>
                  <input
                    required
                    id="vehicle_type"
                    name="vehicle_type"
                    type="text"
                    placeholder="Enter Vehicle Type"
                    className={getInputClassNames("vehicle_type")}
                    {...formik.getFieldProps("vehicle_type")}
                  />
                  {formik.touched.vehicle_type &&
                    formik.errors.vehicle_type && (
                      <div className="text-error text-sm">
                        {formik.errors.vehicle_type}
                      </div>
                    )}
                </div>

                <div className="flex flex-col mt-4 mb-4">
                  <label
                    className="text-sm mb-2"
                    htmlFor="vehicle_plate_number"
                  >
                    Vehicle Plate Number
                  </label>
                  <input
                    id="vehicle_plate_number"
                    required
                    name="vehicle_plate_number"
                    type="text"
                    placeholder="Enter Vehicle Plate Number"
                    className={getInputClassNames("vehicle_plate_number")}
                    {...formik.getFieldProps("vehicle_plate_number")}
                  />
                  {formik.touched.vehicle_plate_number &&
                    formik.errors.vehicle_plate_number && (
                      <div className="text-error text-sm">
                        {formik.errors.vehicle_plate_number}
                      </div>
                    )}
                </div>

                <div className="flex flex-col mt-4 mb-4">
                  <label
                    className="text-sm mb-2"
                    htmlFor="phone_of_pick_up_person"
                  >
                    Phone Number of Pick Up Person
                  </label>
                  <input
                    id="phone_of_pick_up_person"
                    required
                    name="phone_of_pick_up_person"
                    type="tel"
                    placeholder="Enter Phone Number"
                    className={getInputClassNames("phone_of_pick_up_person")}
                    {...formik.getFieldProps("phone_of_pick_up_person")}
                  />
                  {formik.touched.phone_of_pick_up_person &&
                    formik.errors.phone_of_pick_up_person && (
                      <div className="text-error text-sm">
                        {formik.errors.phone_of_pick_up_person}
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
                  {isLoading ? <Loader /> : "Process Voucher"}
                </button>
              </form>
            </>
          )}
        </Suspense>
      </div>
      {openModal && (
        <DispenseSuccess
          amountAllocated={data?.product?.voucherAllocation}
          productName={data?.product?.productName}
          unit={data?.product?.unit}
        />
      )}
    </section>
  );
}
