import React from "react";
import { ImSpinner9 } from "react-icons/im";

export default function Loading() {
  return (
    <section className="h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="text-primaryActive ">
          <ImSpinner9 size={100} className="animate-spin" />
        </div>
      </div>
    </section>
  );
}
