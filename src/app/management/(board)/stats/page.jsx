"use client";
import React, { useEffect, useState } from "react";
import QuantityCards from "../../components/QuantityCards";
import StatsCard from "../../components/StatsCard";
import { GiGasPump } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoMdTimer } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { PiDropFill } from "react-icons/pi";
import PocList from "../../components/PocList";
import { useDispatch, useSelector } from "react-redux";
import { handleProductName } from "@/redux/slices/variableSlice";

export default function Stats() {
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useDispatch();
  const { worker } = useSelector((state) => state.worker);
  const { products } = useSelector((state) => state.products);
  const { collectedVouchers } = useSelector((state) => state.vouchers);
  const managementDetails = worker?.management?.map((p) => p.poc);
  const pocs = managementDetails?.map((p) => p).flat();
  const pocProducts = pocs?.map((p) => p.products).flat();
  const getAllocation = collectedVouchers?.data
    ?.map((a) => a?.product?.voucherAllocation)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // console.log(pocs);

  useEffect(() => {
    dispatch(handleProductName(""));
  }, [dispatch]);

  const setTab = (tab) => {
    setActiveTab(tab);
    // console.log(tab);
  };
  const renderPoc = () => {
    return pocs?.map((p, i) => {
      const productsInPoc = p?.productAllocation?.map((p) => p).flat();
      const productNames = productsInPoc?.map((p) =>
        p?.product?.productName?.toLowerCase()
      );
      // console.log(productNames);
      if (activeTab !== "" && productNames?.includes(activeTab)) {
        return (
          <PocList
            key={p?.poc_id}
            name={capitalizeWords(p?.name)}
            id={p?.poc_id}
            product={p?.productAllocation}
            // available={p.stockLimit}
            // total={p.stockAvailable}
          />
        );
      } else if (activeTab === "") {
        return (
          <PocList
            key={p?.poc_id}
            name={capitalizeWords(p?.name)}
            id={p?.poc_id}
            product={p?.productAllocation}
            // available={p.stockLimit}
            // total={p.stockAvailable}
          />
        );
      }
    });
  };

  const renderProductTabs = () => {
    if (products?.data) {
      return products?.data?.map((p, i) => {
        return (
          <div
            key={i}
            onClick={() => setTab(p?.name.toLowerCase())} // Wrap the setTab function call in an arrow function
            className={`${
              activeTab === p?.name
                ? "bg-primary text-white"
                : "border text-gray-400 "
            }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
          >
            {capitalizeWords(p?.name)}
          </div>
        );
      });
    } else return <div>No Products Found</div>;
  };

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

  return (
    <section className="pt-4 pb-20 bg-red-40 min-h-screen">
      <div>
        <h4 className="font-medium text-base mt-2 text-center">
          System Statistics
        </h4>
        {/* <h4 className="text-sm ">Hello, Admin</h4> */}
        <div className="flex flex-wrap gap-3 mt-4">
          {/* <StatsCard
            color="bg-error"
            number={340}
            title="Customers"
            icon={<FaUsers size={26} />}
          /> */}
          <StatsCard
            number={pocs?.length ?? 0}
            link="#"
            color="bg-blue-700"
            title="POC"
            icon={<GiGasPump size={24} />}
          />
          {/* <StatsCard
            color="bg-yellow-500"
            number={334}
            title="Queue"
            icon={<IoMdTimer size={24} />}
          /> */}
          <StatsCard
            link="#"
            number={getAllocation ?? 0}
            color="bg-primary"
            title="Total Product Dispensed"
            icon={<PiDropFill size={24} />}
          />
          <StatsCard
            link="/management/stats/usedVoucher"
            number={collectedVouchers?.count ?? 0}
            color="bg-customGray"
            title="Used Voucher"
            icon={<MdVerifiedUser size={24} />}
          />
        </div>
      </div>
      <div className="mt-10">
        <h4 className="font-medium text-base mt-5 text-center">
          Product Level Per POC
        </h4>
        <div className="flex space-x-3 items-center mt-4 text-base">
          {products?.data && (
            <div
              onClick={() => setTab("")} // Wrap the setTab function call in an arrow function
              className={`${
                activeTab === ""
                  ? "bg-primary text-white"
                  : "border text-gray-400 "
              }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
            >
              All
            </div>
          )}
          {renderProductTabs()}
        </div>

        <div className="mt-6">{renderPoc()}</div>
      </div>
    </section>
  );
}
