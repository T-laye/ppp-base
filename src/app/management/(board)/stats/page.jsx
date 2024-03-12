import React from "react";
import QuantityCards from "../../components/QuantityCards";
import { product } from "/public/dummy.js";
import { poc } from "/public/dummy.js";

export default function Product() {
  //  console.log(product);

  // const totalAssigned = poc.reduce((acc, p) => {
  //   return acc + p.assigned;
  // }, 0);

  // const totalAvail = poc.reduce((acc, p) => {
  //   return acc + p.available;
  // }, 0);

  // const renderProduct = () => {
  //   return product.map((p, i) => {
      
  //     return (
  //       <QuantityCards
  //         key={i}
  //         title={p.name}
  //         available={totalAvail}
  //         total={totalAssigned}
  //       />
  //     );
  //   });
  // };

  return (
    <section className="pt-4 pb-20 bg-red-40 min-h-screen">
      <h4 className="font-medium text-base mt-2 text-center">Product Stats</h4>
      {/* <h4 className="text-sm ">Hello, Admin</h4> */}
      <div>
        <QuantityCards title="Total Level" available={500} total={1000} />
        <QuantityCards title="Fuel Level" available={420} total={600} />
        <QuantityCards title="Desiel Level" available={80} total={400} />
        {/* {renderProduct()} */}
      </div>
    </section>
  );
}
