"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function VoucherList({ id, name, index, approved }) {
  const router = useRouter();

  const gotoVoucher = () => {
    router.push(`/admin/vouchers/${id}`);
  };

  const approveVoucherManually = async () => {
    try {
      const res = await axios.patch(`/api/admin/voucher/verify/${id}`);
      if (res){
      console.log(res)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white  active:text-hite hover:bg-primaryActive rounded-xl py-3 h-16 text-base px-3 items-center justify-between duration-200 ">
      <div
        onClick={gotoVoucher}
        className=" w-full h-full flex items-center cursor-pointer"
      >
        {name}
      </div>
      {index === 0 && !approved && (
        <button onClick={approveVoucherManually} className="btn bg-primary">
          Approve
        </button>
      )}
    </li>
  );
}
