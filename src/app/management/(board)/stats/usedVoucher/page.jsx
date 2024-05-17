"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import UvcList from "@/components/UvcList";
import GoBack from "@/components/GoBack";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDate,
  handleProductName,
  handleSearch,
} from "@/redux/slices/variableSlice";

export default function UsedVoucher() {
  const [term, setTerm] = useState("");
  const [product, setProduct] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const { collectedVouchers } = useSelector((state) => state.vouchers);
  const { products } = useSelector((state) => state.products);

  // console.log(collectedVouchers);

  const handleChange = (e) => {
    setTerm(e.target.value);
    dispatch(handleSearch(e.target.value.toLowerCase()));
  };
  const handleProduct = (e) => {
    setProduct(e.target.value);
    dispatch(handleProductName(e.target.value.toLowerCase()));
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch(handleDate(e.target.value));
  };

  const renderUsedVouchers = () => {
    if (collectedVouchers?.data?.length === 0) {
      return <h2>No Voucher Found</h2>;
    } else {
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
    }
  };

  const renderProducts = () => {
    return products?.data?.map((p, i) => {
      return (
        <option key={i} value={p?.name?.toLowerCase()}>
          {p?.name}
        </option>
      );
      // console.log(p);
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
              placeholder="Search by customer name"
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
            {/* <option value="fuel">Fuel</option>
            <option value="Desiel">Desiel</option> */}
            {renderProducts()}
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
