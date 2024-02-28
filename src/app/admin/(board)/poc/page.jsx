"use client";
import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import PocList from "../../components/PocList";

export default function Poc() {
  const [term, setTerm] = useState("");
  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <section className="min-h-screen bg-green300 py-4">
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
        <div className="text-end mt-3 font-semibold text-base text-gray-500 pr-2">
          540/1000
        </div>

        <div className="bg-gren-400 pt-2 pb-10">
          <ul>
            <PocList name="Orlando" available={150} total={200} />
            <PocList name="Matrix" available={80} total={100} />
            <PocList name="Odafe" available={100} total={200} />
            <PocList name="NNPC" available={50} total={150} />
            <PocList name="Total" available={20} total={100} />
            <PocList name="Mobil" available={100} total={200} />
            <PocList name="NewBridge" available={40} total={50} />
          </ul>
        </div>
      </div>
    </section>
  );
}
