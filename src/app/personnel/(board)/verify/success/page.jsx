"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdVerifiedUser } from "react-icons/md";

export default function Page() {
  const router = useRouter();

  const dispense = () => {
    router.push("/personnel/usedVoucher");
  };

  return (
    <section className="min-h-screen pt-10 pb-20">
      <div className="flex flex-col items-center md:mt-20  ">
        <h4 className="font-medium text-2xl mt-2 text-center text-primary">
          CONGRATULATIONS !!!
        </h4>
        <div className="text-primary flex justify-center mt-5">
          <MdVerifiedUser size={200} />
        </div>
        <div className="leading-6  mt-2 text-xl text-center md:w-2/3 ">
          <p>
            {/* YOUR VOUCHER OF 90 LITERS OF PREMIUM MOTOR SPIRIT HAS BEEN PROCESSED
            SUCCESSFULLY */}
            Your voucher of 90 litres of premium motor spirit has been processes
            successfully.
          </p>
        </div>

        <div className="flex justify-center mt-8 md:mt-10 bg-purple600 w-full">
          <button onClick={dispense} className="btn bg-primary w-1/2 text-lg">
            Dispense
          </button>
        </div>
      </div>
    </section>
  );
}
