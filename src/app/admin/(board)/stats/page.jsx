"use client";
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
import { useSelector } from "react-redux";

export default function Stats() {
  const { customers } = useSelector((state) => state.customers);
  const { products } = useSelector((state) => state.products);
  console.log(products);

  const renderProducts = () => {
    // const renderCustomers = () => {
    if (products?.length === 0) {
      return <div>No Products Found</div>;
    }
    return products?.map((p) => (
      <QuantityCards
        key={p.productId}
        title={`${p?.name} Level`}
        available={420}
        total={600}
      />
    ));
  };
  // }

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
            number={customers?.length}
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
          {renderProducts()}
          <QuantityCards title="Total Level" available={500} total={1000} />
        </div>
      </div>
    </section>
  );
}
