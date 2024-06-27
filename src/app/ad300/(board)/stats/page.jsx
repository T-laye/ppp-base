"use client";
import React, { Suspense, useEffect } from "react";
import QuantityCards from "../../components/QuantityCards";
import StatsCard from "../../components/StatsCard";
import { GiGasPump } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoMdTimer } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { BsPersonFillGear } from "react-icons/bs";
import { handleProductName } from "@/redux/slices/variableSlice";
import { PiDropFill } from "react-icons/pi";

export default function Stats() {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);
  const { products } = useSelector((state) => state.products);
  const { personnels } = useSelector((state) => state.personnels);
  const { pocs } = useSelector((state) => state.pocs);
  const { queuedVouchers, approvedVouchers, collectedVouchers } = useSelector(
    (state) => state.vouchers
  );
  const { data, count } = products;
  const productDetails = pocs?.data?.map((p) => p.productAllocation).flat();
  const getAllocation = collectedVouchers?.data
    ?.map((a) => a?.product?.voucherAllocation)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  console.log(collectedVouchers);

  const available = productDetails
    ?.map((p) => p.stockAvailable)
    ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const total = productDetails
    ?.map((p) => p.capacity)
    ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // console.log(data);

  const percentage = (available / total) * 100;

  const barProgress = () => {
    const result = (available / total) * 100;
    return `${Math.round(result)}%`;
  };

  const barColor = () => {
    if (percentage < 40) {
      return "bg-error";
    } else if (percentage >= 40 && percentage < 65) {
      return "bg-yellow-500";
    } else return "bg-primary";
  };

  useEffect(() => {
    dispatch(handleProductName(""));
  }, [dispatch]);

  const renderProducts = () => {
    // const renderCustomers = () => {

    if (!data) {
      return <div className="text-lg">No Products Found</div>;
    } else {
      return data?.map((p) => (
        <QuantityCards
          key={p.productId}
          info={p}
          products={productDetails}
          available={420}
          total={600}
        />
      ));
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
            link="/ad300/stats/customers"
            color="bg-error"
            number={customers?.count ?? 0}
            title="Customers"
            icon={<FaUsers size={26} />}
          />
          <StatsCard
            link="/ad300/poc"
            number={pocs.count ?? 0}
            color="bg-blue-400"
            title="POC"
            icon={<GiGasPump size={24} />}
          />
          <StatsCard
            link="/ad300/workForce"
            number={personnels?.count ?? 0}
            color="bg-blue-900"
            title="Work Force"
            icon={<BsPersonFillGear size={24} />}
          />
          <StatsCard
            number={getAllocation ?? 0}
            title="Total Product Dispensed"
            icon={<PiDropFill size={24} />}
            color="bg-primary"
          />
          <StatsCard
            link="/ad300/vouchers"
            color="bg-yellow-500"
            number={queuedVouchers?.count ?? 0}
            title="Queue"
            icon={<IoMdTimer size={24} />}
          />
          <StatsCard
            link="/ad300/vouchers"
            number={approvedVouchers?.count ?? 0}
            color="bg-green-500"
            title="Approved"
            icon={<IoCheckmarkDoneCircle size={24} />}
          />

          <StatsCard
            link="/ad300/stats/usedVoucher"
            number={collectedVouchers?.count ?? 0}
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
          {data && count !== 0 && (
            <div className="rounded-xl border px-4 pt-1 pb-4 hover:text-white active:bg-primaryActive cursor-pointer active:border-primaryActive hover:bg-primaryActive duration-200 mt-4">
              <div className="flex justify-between items-end">
                <h4 className="text-lg font-medium">Total Level</h4>
                <div className="text-base">
                  {available ?? 0}/{total ?? 0}
                </div>
              </div>
              <div className="h-2 bg-gray-300 rounded-xl mt-4 overflow-hidden">
                {available && (
                  <div
                    style={{ width: barProgress() }}
                    className={`h-full rounded-xl w-[${barProgress()}%]   ${barColor()}`}
                  ></div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
