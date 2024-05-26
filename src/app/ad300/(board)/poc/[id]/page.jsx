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
import { getPoc } from "@/redux/slices/getPocSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { IoIosTime } from "react-icons/io";
import Loading from "@/components/Loading";
import { fetchPocs } from "@/redux/slices/fetchPocsSlice";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { poc } = useSelector((state) => state.poc);
  const { personnels } = useSelector((state) => state.personnels);
  const { pageNumber, take, pocName } = useSelector((state) => state.variables);
  // console.log(poc?.productAllocation);

  const editPOC = () => {
    router.push(`/ad300/poc/${id}/editPoc`);
  };
  const assign = () => {
    router.push(`/ad300/poc/${id}/assign`);
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

  const handleDeletePoc = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/poc/${id}`);
      // console.log(res);
      if (res) {
        const resPocs = await axios.get(
          `/api/poc?take=${take}&pageNumber=${pageNumber}&name=${pocName}`
        );
        dispatch(fetchPocs({ ...resPocs?.data }));
        setIsLoading(false);
        toast.success(res.data.message);
        router.back();
      }
    } catch (e) {
      // toast.success(res.data.message);
      setIsLoading(false);
      // console.log(e);
    }
    // console.log(res);
  };

  const renderAssignedPersonnel = personnels?.data?.find(
    (p) => p.id === poc?.personnel?.userId
  );

  const renderAssignedManagement = () => {
    const assignedManagement = poc?.management?.map((m) => m.userId);
    if (assignedManagement) {
      const assignedPersonnelNames = personnels?.data
        ?.filter((p) => assignedManagement?.includes(p.id))
        .map((p) => p.name); // Assuming 'name' is the property containing the person's name

      // Joining the names with commas
      const formattedNames = assignedPersonnelNames?.join(", ");
      return formattedNames;
    }
  };

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
  // renderAssignedProducts();

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
            <DetailList
              title="Personnel"
              value={capitalizeWords(renderAssignedPersonnel?.name)}
              // icon={<BsFillFuelPumpDieselFill size={24} />}
              icon={<FaUser size={16} />}
            />
            <DetailList
              title="Management"
              value={capitalizeWords(renderAssignedManagement())}
              icon={<FaUser size={16} />}
              // icon={<BsFillFuelPumpDieselFill size={24} />}
            />
            <DetailList
              title="Product"
              value={capitalizeWords(renderAssignedProducts())}
              icon={<ImDroplet size={16} />}
            />
            {/* <DetailList
              title="Amount Allocated"
              value={250}
              icon={<MdAssignmentTurnedIn size={18} />}
            /> */}

            {/* <div className="flex gap-2 items-end">
              <DetailList
                title="Available"
                value={poc?.stockAvailable}
                icon={<PiDropHalfBottomFill size={18} />}
              />
              <DetailList
                title="Limit"
                value={poc?.stockLimit}
                icon={<ImDroplet size={16} />}
              />
            </div> */}
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
            <button onClick={editPOC} className="btn bg-primary w-full mt-5">
              Edit POC
            </button>

            <button onClick={assign} className="btn bg-yellow-500  w-full mt-5">
              Assign
            </button>

            <button
              onClick={handleDeletePoc}
              type="submit"
              className={`btn w-full mt-5 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl ${
                isLoading ? "bg-customGray" : "bg-error"
              } `}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Delete POC"}
            </button>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
