import React from "react";
import { ImSpinner9 } from "react-icons/im";

export default function Loading() {
  return (
    <div className=" flex justify-center items-start ">
      <div className="flex justify-center items-center  mt-[15%]">
        <div className="text-primaryActive ">
          <ImSpinner9 size={75} className="animate-spin" />
        </div>
      </div>
    </div>
  );
}
