"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function PocList({ product, id, name }) {
  const router = useRouter();
  // console.log(product);

  const goToPoc = () => {
    router.push(`/management/stats/${id}`);
  };

  const renderProgressBar = () => {
    return product?.map((p, i) => {
      return (
        <ProgressBar
          key={i}
          name={p?.product?.productName}
          available={p?.stockAvailable}
          total={p?.capacity}
          limit={p?.stockLimit}
        />
      );
    });
  };

  return (
    // <Link href="/admin/poc/[id]">
    <div
      onClick={goToPoc}
      className="rounded-xl border px-4 pt-2 pb-4 border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive duration-200 mt-4 cursor-pointer"
    >
      <h4 className="text-xl font-medium">{name}</h4>
      {renderProgressBar()}
    </div>
    // </Link>
  );
}
