"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";
import PersonnelList from "../../components/PersonnelList";

export default function Personnels() {
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
      {/* <div className="flex justify-start space-x-3 items-center mt-2 text-base overflow-scroll hide-scroll">
        <div
          onClick={() => setTab(1)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 1 ? "bg-primary text-white" : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          All
        </div>
        <div
          onClick={() => setTab(2)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 2 ? "bg-primary text-white" : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          Personnels
        </div>
        <div
          onClick={() => setTab(3)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 3 ? "bg-primary text-white" : "border text-gray-400 "
          } px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          Management
        </div>
        <div
          onClick={() => setTab(4)} // Wrap the setTab function call in an arrow function
          className={`${
            activeTab === 4 ? "bg-primary text-white" : "border text-gray-400 "
          } px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          Admins
        </div>
      </div> */}

      <div className="mt-8">
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
        <div className="text-end mt-3 text-sm text-gray-500 pr-2">10</div>

        <div className="bg-gren-400 pt-3 pb-10">
          <ul>
            <PersonnelList name="John Doe" role="admin" />

            <PersonnelList name="Mark Timmy" role="personnel" />

            <PersonnelList name="Tiebebedigha Tubolayefa" role="admin" />

            <PersonnelList name="Mchael Tega" role="personnel" />

            <PersonnelList name="Susan Bournsmouth" role="management" />

            <PersonnelList name="Onoyake James" role="management" />

            <PersonnelList name="Etuk Obong" role="personnel" />

            <PersonnelList name="Ogar Jude" role="personnel" />

            <PersonnelList name="Marvelous Ikechi" role="management" />
          </ul>
        </div>
      </div>
    </section>
  );
}
