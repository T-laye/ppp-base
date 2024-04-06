"use client";
import React, { Suspense } from "react";
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
import Loading from "@/components/Loading";

export default function Stats() {
  const { customers } = useSelector((state) => state.customers);
  const { products } = useSelector((state) => state.products);
  // console.log(products);

  const renderProducts = () => {
    // const renderCustomers = () => {
    if (products) {
      if (products?.length === 0) {
        return <div>No Products Found</div>;
      } else {
        return products?.map((p) => (
          <QuantityCards
            key={p.productId}
            info={p}
            available={420}
            total={600}
          />
        ));
      }
    } else {
      return <Loading />;
    }
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
        {renderProducts()}
        <div>
          {product.length !== 0 && (
            <div className="rounded-xl border px-4 pt-1 pb-4 hover:text-white active:bg-primaryActive cursor-pointer active:border-primaryActive hover:bg-primaryActive duration-200 mt-4">
              <div className="flex justify-between items-end">
                <h4 className="text-lg font-medium">Total Level</h4>
                <div className="text-base">500/1000</div>
              </div>
              <div className="h-2 bg-gray-300 rounded-xl mt-4 overflow-hidden">
                <div
                  style={{ width: "80%" }}
                  className={`h-full rounded-xl w-[80%]   bg-yellow-500 `}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
