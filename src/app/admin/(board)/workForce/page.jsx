"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PersonnelList from "../../components/PersonnelList";
import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from "@/redux/slices/variableSlice";
import Loading from "@/components/Loading";

export default function WorkForce() {
  const [activeTab, setActiveTab] = useState(1);
  const [term, setTerm] = useState("");
  const router = useRouter();
  const { personnels } = useSelector((state) => state.personnels);
  const { data, count } = personnels;
  const dispatch = useDispatch();
  // console.log(data);

  const goToNewPersonnel = () => {
    router.push("/newPersonnel");
  };
  const setTab = (tab) => {
    setActiveTab(tab);
  };

 const handleChange = (e) => {
   setTerm(e.target.value);
   if (e.target.value.length >= 3 || e.target.value.length === 0) {
     dispatch(handleSearch(e.target.value.toLowerCase()));
   }
 };


  const renderPersons = () => {
    // const renderCustomers = () => {
    if (data) {
      if (count === 0) {
        return <div className="text-lg">No Personnel Found</div>;
      } else {
        const adminPersons = data.filter(
          (p) => p.role.toLowerCase() === "admin"
        );
        const managementPersons = data.filter(
          (p) => p.role.toLowerCase() === "management"
        );
        const personnelPersons = data.filter(
          (p) => p.role.toLowerCase() === "personnel"
        );
        return (
          <>
            {/* <div className="text-lg">Admins:</div> */}
            {adminPersons.map((p) => (
              <PersonnelList key={p.id} info={p} />
            ))}
            {/* <div className="text-lg">Management:</div> */}
            {managementPersons.map((p) => (
              <PersonnelList key={p.id} info={p} />
            ))}
            {/* <div className="text-lg">Personnel:</div> */}
            {personnelPersons.map((p) => (
              <PersonnelList key={p.id} info={p} />
            ))}
          </>
        );
      }
    } else {
      return <Loading />;
    }
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
          className="btn w-full  max-[285px]:mx-auto bg-primary"
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

        <div className="text-end mt-3 text-sm text-gray-500 pr-2">
          {count ?? 0}
        </div>

        <div className="bg-gren-400 pt-3 pb-10">
          <ul>{renderPersons()}</ul>
        </div>
      </div>
    </section>
  );
}
