"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React, { useEffect, useState } from "react";
import { ImDroplet } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { PiBatteryVerticalFullFill } from "react-icons/pi";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { useParams, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPoc } from "@/redux/slices/getPocSlice";
import Loader from "@/components/Loader";
import Loading from "@/components/Loading";
import { IoIosTime } from "react-icons/io";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { worker } = useSelector((state) => state.worker);
  const { poc } = useSelector((state) => state.poc);
  // const { personnels } = useSelector((state) => state.personnels);
  // const { pageNumber, take, pocName } = useSelector((state) => state.variables);
  // console.log(pocs);
  // console.log(managementPoc);

  const editPOC = () => {
    router.push(`/management/stats/${id}/editPoc`);
  };

  useEffect(() => {
    const getPocDetails = async () => {
      const res = await axios.get(`/api/poc/${id}`);
      // console.log(res);

      dispatch(getPoc({ ...res.data.data }));
    };

    getPocDetails();
  }, [dispatch, id]);

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
    if (poc?.createdAt) {
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

  const renderAssignedPersonnel = personnels?.data?.find(
    (p) => p.id === poc?.personnel?.userId
  );
  const renderAssignedProducts = () => {
    if (poc?.productAllocation?.length > 0) {
      const productNames = poc?.productAllocation?.map(
        (p) => p.product.productName
      ); // Assuming 'name' is the property containing the product name

      // Joining the product names with commas
      const formattedProductNames = productNames?.join(", ");

      // console.log(productNames);
      return formattedProductNames;
    }
  };
  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">POC Details</h3>
        {poc?.name ? (
          <div className="mt-4">
            <DetailList
              title="POC Name"
              value={capitalizeWords(poc?.name)}
              icon={<BsFillFuelPumpDieselFill size={16} />}
            />
            <DetailList
              title="Email"
              value={poc?.email}
              icon={<MdEmail size={16} />}
            />
            <DetailList
              title="Phone Number"
              value={poc?.phoneNumber}
              icon={<BsFillTelephoneFill size={16} />}
            />
            <DetailList
              title="Address"
              value={poc?.address}
              icon={<IoLocationSharp size={20} />}
            />
            {/* <DetailList
              title="Personnel"
              value={capitalizeWords(renderAssignedPersonnel?.name)}
              icon={<FaUser size={16} />}
            /> */}
            <DetailList
              title="Product"
              value={capitalizeWords(renderAssignedProducts())}
              icon={<ImDroplet size={16} />}
            />
            <DetailList
              title="Total Product Dispensed"
              value=""
              icon={<ImDroplet size={16} />}
            />
            <DetailList
              title="Created At"
              value={formatDate(poc?.createdAt)}
              icon={<IoIosTime size={16} />}
            />

          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
