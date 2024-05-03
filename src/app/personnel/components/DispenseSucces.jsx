"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdVerifiedUser } from "react-icons/md";

export default function DispenseSuccess({
  amountAllocated,
  unit,
  productName,
}) {
  const router = useRouter();

  const dispense = () => {
    router.push("/personnel/usedVoucher");
  };

  return (
    <section className=" fixed top-0  right-0 left-0 ">
      <div className="flex flex-col items-center md:mt-20  ">
        <h4 className="font-medium text-2xl mt-2 text-center text-primary">
          CONGRATULATIONS !!!
        </h4>
        <div className="text-primary flex justify-center mt-5">
          <MdVerifiedUser size={200} />
        </div>
        <div className="leading-6  mt-2 text-xl text-center md:w-2/3 ">
          <p>
            {`
            Your voucher of ${amountAllocated} ${unit} of ${productName} has been processes
            successfully.`}
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
