"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import VoucherList from "../../components/VoucherList";

export default function Page() {
  const [approved, setApproved] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleProduct = () => {
    setApproved(!approved);
  };

  const goToCustomers = () => {
    router.push("/management/customers");
  };

  const setTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <section className="min-h-screen bg-green300 py-4">
      <div className="mt-4 bg-red400">
        <div className="flex max-[285px]:justify-center space-x-3 items-center mt4 mb-5 text-base">
          <div
            onClick={() => setTab(1)} // Wrap the setTab function call in an arrow function
            className={`${
              activeTab === 1
                ? "bg-primary text-white"
                : "border text-gray-400 "
            }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
          >
            Fuel
          </div>
          <div
            onClick={() => setTab(2)} // Wrap the setTab function call in an arrow function
            className={`${
              activeTab === 2
                ? "bg-primary text-white"
                : "border text-gray-400 "
            }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
          >
            Desiel
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 bg-bue-400 mb-8">
          {/* <div
            onClick={handleProduct}
            className="relative text-base fontmedium text-white flex justify-between borde bg-customGray border-primary w-44 max-[300px]:w-40 px-2 py-1.5 rounded-xl  cursor-pointer max-[285px]:mx-auto"
          >
            <div className=" w-1/2 px-2 text-center">Queue</div>
            <div className=" w-1/2 text-center">Approved</div>
            <div
              className={`${
                approved
                  ? "translate-x-full -left-5 duration-200 w-3/5"
                  : "duration-200 translate-x-0 -left-0.5 w-1/2"
              }  absolute duration-200 text-center text-base  bg-primary text-white font-medium  top-0 rounded-xl py-1.5  `}
            >
              {approved ? "Approved" : "Queue"}
            </div>
          </div> */}
          <button onClick={goToCustomers} className="btn w-full bg-primary">
            Add Voucher
          </button>
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
              <VoucherList name="John Doe" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <VoucherList name="Mark Timmy" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <VoucherList name="Tiebebedigha Tubolayefa" pending={false} />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <VoucherList name="Mchael Tega" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 4) && (
              <VoucherList name="Susan Bournsmouth" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <VoucherList name="Onoyake James" pending={false} />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <VoucherList name="Etuk Obong" pending={true} />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <VoucherList name="Ogar Jude" pending={false} />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <VoucherList name="Marvelous Ike" pending={false} />
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
