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
        <div className="flex flex-wrap gap-3 mt-4">
          <StatsCard
            link="/admin/stats/customers"
            color="bg-error"
            number={340}
            title="Customers"
            icon={<FaUsers size={26} />}
          />
          <StatsCard
            link="/admin/poc"
            number={324}
            color="bg-blue-700"
            title="POC"
            icon={<GiGasPump size={24} />}
          />
          <StatsCard
            link="/admin/vouchers"
            color="bg-yellow-500"
            number={334}
            title="Queue"
            icon={<IoMdTimer size={24} />}
          />
          <StatsCard
            link="/admin/vouchers"
            number={34}
            color="bg-primary"
            title="Approved"
            icon={<IoCheckmarkDoneCircle size={24} />}
          />
          <StatsCard
            link="/admin/stats/usedVoucher"
            number={3440}
            color="bg-customGray"
            title="Used Vouchers"
            icon={<MdVerifiedUser size={24} />}
          />
        </div>
      </div>
      <div className="mt-10">
        <h4 className="font-medium text-base mt-2 text-center">
          Product Statistics
        </h4>
        {/* <h4 className="text-sm ">Hello, Admin</h4> */}
        <div>
          <QuantityCards title="Fuel Level" available={420} total={600} />
          <QuantityCards title="Desiel Level" available={80} total={400} />
          <QuantityCards title="Total Level" available={500} total={1000} />
          {/* {renderProduct()} */}
        </div>
      </div>
    </section>
  );
}
