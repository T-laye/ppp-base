"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

export default function GoBack() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div
      onClick={goBack}
      className="inline-flex items-center space-x-1  cursor-pointer bg-re-300"
    >
      <IoMdArrowBack size={24} />
      <span className="inline-block">Go Back</span>
    </div>
  );
}
