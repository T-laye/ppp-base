import React from "react";
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
        <div className="flex flex-col flex-wrap gap-3 mt-4">
          {/* <StatsCard
            color="bg-error"
            number={340}
            title="Customers"
            icon={<FaUsers size={26} />}
          /> */}
          {/* <StatsCard
            number={324}
            color="bg-blue-700"
            title="POC"
            icon={<GiGasPump size={24} />}
          /> */}
          {/* <StatsCard
            color="bg-yellow-500"
            number={334}
            title="Queue"
            icon={<IoMdTimer size={24} />}
          /> */}
          <StatsCard
            number={34}
            color="bg-primary"
            title="Total Product Dispensed"
            icon={<PiDropFill size={24} />}
          />
          <StatsCard
            number={3440}
            color="bg-customGray"
            title="Used Vouchers"
            icon={<MdVerifiedUser size={24} />}
          />
        </div>
      </div>
      <div className="mt-10">
        <h4 className="font-medium text-base mt-2 text-center">
          Product Level Per POC
        </h4>
        {/* <h4 className="text-sm ">Hello, Admin</h4> */}
        <div>
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
