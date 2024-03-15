"use client";
import React, { useState } from "react";
import QuantityCards from "../../components/QuantityCards";
import { product } from "/public/dummy.js";
import { poc } from "/public/dummy.js";
import StatsCard from "../../components/StatsCard";
import { GiGasPump } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoMdTimer } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { PiDropFill } from "react-icons/pi";
import PocList from "../../components/PocList";

export default function Stats() {
  const [activeTab, setActiveTab] = useState(1);

  const setTab = (tab) => {
    setActiveTab(tab);
  };
  //  console.log(product);

  // const totalAssigned = poc.reduce((acc, p) => {
  //   return acc + p.assigned;
  // }, 0);

  // const totalAvail = poc.reduce((acc, p) => {
  //   return acc + p.available;
  // }, 0);

  // const renderProduct = () => {
  //   return product.map((p, i) => {

  //     return (
  //       <QuantityCards
  //         key={i}
  //         title={p.name}
  //         available={totalAvail}
  //         total={totalAssigned}
  //       />
  //     );
  //   });
  // };

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
            number={324}
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
            number={34}
            color="bg-primary"
            title="Total Product Dispensed"
            icon={<PiDropFill size={24} />}
          />
          <StatsCard
            link="/management/stats/usedVoucher"
            number={3440}
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
          <div
            onClick={() => setTab(1)} // Wrap the setTab function call in an arrow function
            className={`${
              activeTab === 1
                ? "bg-primary text-white"
                : "border text-gray-400 "
            }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
          >
            All
          </div>
          <div
            onClick={() => setTab(2)} // Wrap the setTab function call in an arrow function
            className={`${
              activeTab === 2
                ? "bg-primary text-white"
                : "border text-gray-400 "
            }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
          >
            Fuel
          </div>
          <div
            onClick={() => setTab(3)} // Wrap the setTab function call in an arrow function
            className={`${
              activeTab === 3
                ? "bg-primary text-white"
                : "border text-gray-400 "
            }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
          >
            Desiel
          </div>
        </div>

        <div className="mt-4">
          <PocList name="Total Fueling Station" available={420} total={600} />
          <PocList name="Oando Fueling Station" available={80} total={400} />
          <PocList name="Mobil Fueling Station " available={500} total={1200} />
          <PocList name="Odafe Fueling Station " available={500} total={1300} />
          <PocList
            name="New Bridge Fueling Station "
            available={500}
            total={1500}
          />
          {/* {renderProduct()} */}
        </div>
      </div>
    </section>
  );
}
