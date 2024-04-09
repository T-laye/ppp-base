"use client";
import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import PocList from "../../components/PocList";
import { useSelector } from "react-redux";

export default function Poc() {
  // const [product, setProduct] = useState(false);
  const [term, setTerm] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const { products } = useSelector((state) => state.products);
  const { pocs } = useSelector((state) => state.pocs);
  const { data, count } = products;
  const setTab = (tab) => {
    setActiveTab(tab);
  };
  console.log(pocs);
  function capitalizeWords(sentence) {
    // Split the sentence into an array of words
    let words = sentence?.split(" ");

    // Iterate over each word
    for (let i = 0; i < words?.length; i++) {
      // Capitalize the first letter of each word
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a sentence
    return words?.join(" ");
  }

  const renderProductsTab = () => {
    return data?.map((p, i) => {
      return (
        <div
          key={i}
          onClick={() => setTab(p.name.toLowerCase())}
          className={`${
            activeTab === p.name.toLowerCase()
              ? "bg-primary text-white"
              : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          {capitalizeWords(p.name)}
        </div>
      );
    });
  };
  // const totalAssigned = poc.reduce((acc, p) => {
  //   return acc + p.assigned;
  // }, 0);

  // const totalAvail = poc.reduce((acc, p) => {
  //   return acc + p.available;
  // }, 0);

  // console.log("Total assigned:", totalAssigned);

  const product_name = pocs.data?.map((p) => p.product.productName);

  console.log(product_name);

  // const renderPocs = () => {
  // const filteredPoc = pocs.data?.map((p)=>{
  // if(activeTab && p.product.productName === activeTab ){
  // return p
  // } else {
  //  return p
  // }}
  //     if (count === 0) {
  //       return <div>No Customers Found</div>;
  //     } else {
  //       return data?.map((c) => <PocList key={i} name={} available={} total={} />);
  //     }
  //   } else {
  //     return <Loading />;
  //   }
  // };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <section className="min-h-screen bg-green300 pt-4 pb-20">
      <div className="flex mt-4 max-[285px]:justify-center space-x-3 items-center mt4 mb-5 text-base">
        <div
          onClick={() => setTab("")}
          className={`${
            activeTab === "" ? "bg-primary text-white" : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          All
        </div>
        {renderProductsTab()}
      </div>
      <div className="mt-6">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full  p-2 outline-none rounded-xl   text-base  placeholder:text-sm placeholder:font-normal "
              value={term}
              onChange={handleChange}
            />
            <div className="absolute top-3 right-2.5 text-gray-400">
              <BiSearchAlt2 size={20} />
            </div>
          </div>
        </form>
        <div className="text-end mt-3 font-medium text-base text-gray-500 pr-2">
          {/* {Math.round(totalAvail)}/{Math.round(totalAssigned)} */}
          {pocs.count ?? 0}
        </div>

        <div className="bg-gren-400 pb-10">
          <ul>{/* {renderPoc()} */}</ul>
        </div>
      </div>
    </section>
  );
}
