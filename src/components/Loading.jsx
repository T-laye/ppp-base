import React from "react";
import { ImSpinner9 } from "react-icons/im";

export default function Loading() {
  return (
    <div className=" flex justify-center items-start ">
      <div className="flex justify-center items-center  mt-[30%]">
        <div className="text-primaryActive ">
          <ImSpinner9 size={100} className="animate-spin" />
        </div>
      </div>
    </div>
  );
}
