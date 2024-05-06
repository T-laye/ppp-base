"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import UvcList from "@/components/UvcList";
import GoBack from "@/components/GoBack";
import { useDispatch, useSelector } from "react-redux";

export default function UsedVoucher() {
  const [term, setTerm] = useState("");
  const [product, setProduct] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const { collectedVouchers } = useSelector((state) => state.vouchers);

  // console.log(vouchers);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };
  const handleProduct = (e) => {
    setProduct(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const renderUsedVouchers = () => {
    return collectedVouchers?.data?.map((v, i) => {
      return (
        <UvcList
          key={i}
          name={v?.customer?.name}
          id={v?.id}
          product={v?.product?.productName}
          date={v?.voucherDispense?.dateUsed}
        />
      );
    });
  };

  return (
    <section className="pt-5 pb-20">
      <div className="mt-4">
        <GoBack />
      </div>
      <h4 className="font-medium text-base mt-2 text-center">Used Vouchers</h4>

      <div className="mt-4">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="relative ">
            <input
              type="text"
              placeholder="Search by name or voucher number"
              className="w-full  p-2 outline-none rounded-xl   text-base  placeholder:text-sm placeholder:font-normal "
              value={term}
              onChange={handleChange}
            />
            <div className="absolute top-3 right-2.5 text-gray-400">
              <BiSearchAlt2 size={20} />
            </div>
          </div>
        </form>
      </div>

      <div className="flex mt-4 flex-wrap gap-4">
        <div className="max-sm:flex-1">
          <select onChange={handleProduct} name="product" id="product">
            <option value="">Select Product</option>
            <option value="fuel">Fuel</option>
            <option value="Desiel">Desiel</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            id="dateInput"
            value={date}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className="text-end text-sm text-gray-600 font-medium mt-4">
        {collectedVouchers?.count || 0}
      </div>
      <div className="mt-2">{renderUsedVouchers()}</div>
    </section>
  );
}
