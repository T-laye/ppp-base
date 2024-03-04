import React from "react";
import QuantityCards from "../../components/QuantityCards";

export default function Product() {
  return (
    <section className="pt-4 pb-20 bg-red-40 min-h-screen">
      <h4 className="font-medium text-base mt-2 text-center">Product Stats</h4>
      {/* <h4 className="text-sm ">Hello, Admin</h4> */}
      <div>
        <QuantityCards title="Total Level" available={500} total={1000} />
        <QuantityCards title="Fuel Level" available={420} total={600} />
        <QuantityCards title="Desiel Level" available={80} total={400} />
      </div>
    </section>
  );
}
