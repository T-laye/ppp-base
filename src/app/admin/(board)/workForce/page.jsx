"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";
import PersonnelList from "../../components/PersonnelList";
import { useRouter } from "next/navigation";

export default function WorkForce() {
  const [activeTab, setActiveTab] = useState(1);
  const [term, setTerm] = useState("");
  const router = useRouter();

  const goToNewPersonnel = () => {
    router.push("/newPersonnel");
  };
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
      <div className="mt-3 flex justify-center">
        <button
          onClick={goToNewPersonnel}
          className="btn w-full max-w-md max-[285px]:mx-auto bg-primary"
        >
          Add New Personnel
        </button>
      </div>
      <div className="mt-8">
        {/* <div className="flex justify-between gap-1"> */}
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
        {/* <button
            // onClick={goToNewVoucher}
            className="btn text-xl max-[285px]:mx-auto bg-primary"
          >
            Add New
          </button> */}
        {/* </div> */}
        <div className="text-end mt-3 text-sm text-gray-500 pr-2">10</div>

        <div className="bg-gren-400 pt-3 pb-10">
          <ul>
            {(activeTab === 1 || activeTab === 4) && (
              <PersonnelList name="John Doe" role="admin" />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <PersonnelList name="Mark Timmy" role="personnel" />
            )}
            {(activeTab === 1 || activeTab === 4) && (
              <PersonnelList name="Tiebebedigha Tubolayefa" role="admin" />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <PersonnelList name="Mchael Tega" role="personnel" />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <PersonnelList name="Susan Bournsmouth" role="management" />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <PersonnelList name="Onoyake James" role="management" />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <PersonnelList name="Etuk Obong" role="personnel" />
            )}
            {(activeTab === 1 || activeTab === 2) && (
              <PersonnelList name="Ogar Jude" role="personnel" />
            )}
            {(activeTab === 1 || activeTab === 3) && (
              <PersonnelList name="Marvelous Ikechi" role="management" />
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
