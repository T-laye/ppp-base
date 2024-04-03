"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React, { Suspense, useEffect } from "react";
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

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { customer } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  // const customer = customers.find((c) => c.customerId === id);

  // console.log(customer);
  useEffect(() => {
    const getCustomerDetails = async () => {
      const res = await axios.get(`/api/customer/${id}`);
      // console.log("res");

      dispatch(getCustomer({ ...res.data.data }));
    };

    getCustomerDetails();
  }, [dispatch, id]);

  // console.log(customer);

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

  // console.log(formattedDateString); // Output: Monday, April 1 2024 AT 12:35

  // console.log(customer);
  const editCustomer = () => {
    router.push(`/admin/stats/customers/${id}/editCustomer`);
  };
  const deleteCustomer = () => {
    toast.success("Successfully Deleted");
    router.back();
  };
  // const addVoucher = () => {
  //   router.push("/newVoucher");
  // };
  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">Customer Details</h3>
        <Suspense>
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
              value={capitalizeWords(customer?.createdByName)}
              icon={<FaUser size={16} />}
            />
            <DetailList
              title="Creator Role"
              value={capitalizeWords(customer?.createdByRole)}
              icon={<FaUser size={16} />}
            />
            <DetailList
              title="Created At"
              value={formatDate(customer?.createdAt)}
              icon={<FaUser size={16} />}
            />
            {/* <DetailList
            title="Address"
            value="No. oajdcbk cjioachno aichaojcnajc ajschnajc ajcg abjcbc icacsc"
            icon={<FaLocationDot size={16} />}
          /> */}
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
            {customer && (
              <>
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
                <button
                  onClick={deleteCustomer}
                  className="btn bg-error w-full mt-5"
                >
                  Delete Customer
                </button>
              </>
            )}
            {/* <button className="btn bg-error w-full mt-5">Delete Customer</button> */}
          </div>
        </Suspense>
      </div>
    </section>
  );
}
