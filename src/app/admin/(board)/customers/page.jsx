"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";

export default function Customers() {
  const [activeTab, setActiveTab] = useState(1);
  const [term, setTerm] = useState("");

  const setTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <section className="min-h-screen bg-green300 py-4">
      <div className="flex justify-start space-x-3 items-center mt-2">
        <div
          onClick={() => setTab(1)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 1 ? "bg-primary text-white" : "border text-gray-400 "
          }  px-5 py-1 rounded-xl duration-200`}
        >
          All
        </div>
        <div
          onClick={() => setTab(2)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 2 ? "bg-primary text-white" : "border text-gray-400 "
          }  px-4 py-1 rounded-xl duration-200`}
        >
          Pending
        </div>
        <div
          onClick={() => setTab(3)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 3 ? "bg-primary text-white" : "border text-gray-400 "
          } px-4 py-1 rounded-xl duration-200`}
        >
          Approved
        </div>
      </div>

      <div className="mt-5">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          {/* <input
            type="text"
            placeholder="Search"
            name="customer"
            id="customer"
            className="w-full"
          /> */}
          <div className="relative ">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full h-11 p-2 outline-none rounded-xl   text-base  placeholder:text-sm placeholder:font-normal "
              value={term}
              onChange={handleChange}
            />
            <div className="absolute top-3 right-2.5 text-gray-400">
              <BiSearchAlt2 size={20} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
