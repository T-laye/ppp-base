"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";
import CustomerList from "../../components/CustomerList";

export default function Customers() {
  const [product, setProduct] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [term, setTerm] = useState("");

  const handleProduct = () => {
    setProduct(!product);
  };

  const setTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <section className="min-h-screen bg-green300 py-4">
      <div className="mt-2">
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
      </div>
      <div className="flex justify-center space-x-3 items-center mt-4 text-base">
        <div
          onClick={() => setTab(1)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 1 ? "bg-primary text-white" : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          Queue
        </div>
        <div
          onClick={() => setTab(2)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 2 ? "bg-primary text-white" : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          Approved
        </div>
    
      </div>

      <div className="mt-4">
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
        <div className="text-end mt-3 text-sm text-gray-500 pr-2">09</div>

        <div className="bg-gren-400 pt-3 pb-10">
          <ul>
            {(activeTab === 1 || activeTab === 2) && (
              <CustomerList name="John Doe" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <CustomerList name="Mark Timmy" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <CustomerList name="Tiebebedigha Tubolayefa" pending={false} />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <CustomerList name="Mchael Tega" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 4) && (
              <CustomerList name="Susan Bournsmouth" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <CustomerList name="Onoyake James" pending={false} />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <CustomerList name="Etuk Obong" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <CustomerList name="Ogar Jude" pending={false} />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <CustomerList name="Marvelous Ike" pending={false} />
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
