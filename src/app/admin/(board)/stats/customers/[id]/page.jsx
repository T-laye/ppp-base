"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React, { Suspense, useEffect, useState } from "react";
import { ImDroplet } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { PiBatteryVerticalFullFill } from "react-icons/pi";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { useRouter, useParams } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { getCustomer } from "@/redux/slices/getCustomerSlice";
import axios from "axios";
import Loading from "@/components/Loading";
import Loader from "@/components/Loader";
import { fetchCustomers } from "@/redux/slices/fetchCustomersSlice";
import { IoIosTime } from "react-icons/io";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { customer } = useSelector((state) => state.customer);
  const { pageNumber, take, search } = useSelector((state) => state.variables);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // console.log(customer);
  useEffect(() => {
    const getCustomerDetails = async () => {
      const res = await axios.get(`/api/customer/${id}`);
      // console.log("res");

      dispatch(getCustomer({ ...res.data.data }));
    };

    getCustomerDetails();
  }, [dispatch, id]);

  const handleDeleteCustomer = async () => {
    setIsLoading(true);
    const res = await axios.delete(`/api/customer/${id}`);
    if (res) {
      const resCustomers = await axios.get(
        `/api/customer?take=${take}&pageNumber=${pageNumber}&name=${search}`
      );
      dispatch(fetchCustomers({...resCustomers?.data}));
      setIsLoading(false);
      toast.success(res.data.message);
      router.back();
     
    }
    // console.log(res);
  };
  // console.log(id);

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

  function formatDate(dateString) {
    // Parse the date string
    const date = new Date(dateString);
    // console.log(date);
    if (customer?.createdAt) {
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const timeOptions = { hour: "numeric", minute: "numeric" };

      // Format the date and time according to options
      const formattedDate = date.toLocaleDateString("en-US", dateOptions);
      const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

      return `${formattedDate} at ${formattedTime}`;
    }
    return;
  }

  const editCustomer = () => {
    router.push(`/admin/stats/customers/${id}/editCustomer`);
  };

  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">Customer Details</h3>

        {customer?.name ? (
          <div className="mt-4">
            <DetailList
              title="Full Name"
              value={capitalizeWords(customer?.name)}
              icon={<FaUser size={16} />}
            />
            <DetailList
              title="Email"
              value={customer?.email}
              icon={<MdEmail size={16} />}
            />
            <DetailList
              title="Phone Number"
              value={customer?.phoneNumber}
              icon={<BsFillTelephoneFill size={16} />}
            />
            <DetailList
              title="Created By"
              value={capitalizeWords(customer?.createdBy)}
              icon={<FaUser size={16} />}
            />
            {/* <DetailList
              title="Creator Role"
              value={capitalizeWords(customer?.createdByRole)}
              icon={<FaUser size={16} />}
            /> */}
            <DetailList
              title="Created At"
              value={formatDate(customer?.createdAt)}
              icon={<IoIosTime size={16} />}
            />
            <DetailList
              title="Address"
              value={capitalizeWords(customer?.address)}
              icon={<FaLocationDot size={16} />}
            />
            {/* <DetailList
            title="Product"
            value="Fuel"
            icon={<ImDroplet size={16} />}
          /> */}
            {/* <DetailList
            title="Amount Allocated"
            value={25}
            icon={<MdAssignmentTurnedIn size={16} />}
          /> */}
            {/* <DetailList
            title="Preferred Point of Collection"
            value="Total Fueling Station"
            icon={<BsFillFuelPumpDieselFill size={16} />}
          /> */}
            {/* <DetailList
            title="Third Party"
            value="Yes"
            icon={<BsPeopleFill size={16} />}
          /> */}
            {/* <DetailList
            title="Address"
            value="No. 23. poajikaco okcno;aojvnljbdbv jvabo;bvnj "
            icon={<IoLocationSharp size={16} />}
          /> */}

            <Link href="/[newVoucher]" as={`/${customer?.customerId}`}>
              <button className="btn bg-primary w-full mt-5">
                Create Voucher
              </button>
            </Link>

            <button
              onClick={editCustomer}
              className="btn bg-yellow-500 w-full mt-5"
            >
              Edit Customer
            </button>
            {/* <button
              onClick={handleDeleteCustomer}
              className="btn bg-error w-full mt-5"
            >
              {!isLoading ? <Loader /> : "Delete Customer"}
            </button> */}
            <button
              onClick={handleDeleteCustomer}
              type="submit"
              className={`btn w-full mt-5 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl ${
                isLoading ? "bg-customGray" : "bg-error"
              } `}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Delete Customer"}
            </button>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
