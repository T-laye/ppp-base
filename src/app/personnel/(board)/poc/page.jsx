"use client";
import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import PocList from "../../components/PocList";
import { poc } from "/public/dummy.js";

export default function Poc() {
  const [product, setProduct] = useState(false);
  const [term, setTerm] = useState("");
const [activeTab, setActiveTab] = useState(1);


  const setTab = (tab) => {
    setActiveTab(tab);
  };


  const handleProduct = () => {
    setProduct(!product);
  };
  const totalAssigned = poc.reduce((acc, p) => {
    return acc + p.assigned;

  }, 0);

  const totalAvail = poc.reduce((acc, p) => {
    return acc + p.available;
  }, 0);

  // console.log("Total assigned:", totalAssigned);

  // console.log(totalAssigned);

  const renderPoc = () => {
    return poc.map((p, i) => {
      if (product === false && p.product === "fuel") {
        return (
          <PocList
            key={i}
            name={p?.name}
            available={p.available}
            total={p.assigned}
          />
        );
      } else if (product === true && p.product === "diesel") {
        return (
          <PocList
            key={i}
            name={p?.name}
            available={p.available}
            total={p.assigned}
          />
        );
      }
    });
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <section className="min-h-screen bg-green300 pt-4 pb-20">
      {/* <div className="mt-3">
        <div
          onClick={handleProduct}
          className="relative text-base fontmedium text-white flex justify-between borde bg-customGray border-primary w-52 px-4 py-1.5 rounded-xl mx-auto cursor-pointer"
        >
          <div className=" w-1/2 px-2 text-center">Fuel</div>
          <div className=" w-1/2 text-center">Diesel</div>
          <div
            className={`${
              product
                ? "translate-x-full left-0.5 duration-200"
                : "duration-200 translate-x-0 -left-0.5"
            }  absolute duration-200 text-center text-base w-1/2 bg-primary text-white font-medium  top-0 rounded-xl py-1.5  `}
          >
            {product ? "Diesl" : "Fuel"}
          </div>
        </div>
      </div> */}
      <div className="flex space-x-3 items-center mt-4 text-base">
        <div
          onClick={() => setTab(1)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 1 ? "bg-primary text-white" : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          Fuel
        </div>
        <div
          onClick={() => setTab(2)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 2 ? "bg-primary text-white" : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          Desiel
        </div>
      </div>
      <div className="mt-6">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="relative ">
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
        <div className="text-end mt-3 font-semibold text-base text-gray-500 pr-2">
          {Math.round(totalAvail)}/{Math.round(totalAssigned)}
        </div>

        <div className="bg-gren-400 pb-10">
          <ul>
            {/* <PocList name="Orlando" available={150} total={200} />
            <PocList name="Matrix" available={80} total={100} />
            <PocList name="Odafe" available={100} total={200} />
            <PocList name="NNPC" available={50} total={150} />
            <PocList name="Total" available={20} total={100} />
            <PocList name="Mobil" available={100} total={200} />
            <PocList name="NewBridge" available={40} total={50} /> */}
            {renderPoc()}
          </ul>
        </div>
      </div>
    </section>
  );
}
