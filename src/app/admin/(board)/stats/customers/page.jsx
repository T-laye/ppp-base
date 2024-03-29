"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";
import GoBack from "@/components/GoBack";
import CustomerList from "@/app/admin/components/CustomerList";
import { useRouter } from "next/navigation";

export default function Customers() {
  const [approved, setApproved] = useState(false);
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleProduct = () => {
    setApproved(!approved);
  };

  const addCustomer = () => {
    router.push("/newCustomer");
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <section className="min-h-screen bg-green300 py-4">
      <div className="mt-4">
        <GoBack />
      </div>
      <h4 className="font-medium text-base mt-2 text-center">Customers</h4>

      <div>
        <button
          onClick={addCustomer}
          className="btn bg-primary w-full mx-auto mt-4 mb-5"
        >
          Add New Customer
        </button>
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
            <CustomerList name="John Doe" pending={true} />

            <CustomerList name="Mark Timmy" pending={true} />

            <CustomerList name="Tiebebedigha Tubolayefa" pending={false} />

            <CustomerList name="Mchael Tega" pending={true} />

            <CustomerList name="Susan Bournsmouth" pending={true} />

            <CustomerList name="Onoyake James" pending={false} />

            <CustomerList name="Etuk Obong" pending={true} />

            <CustomerList name="Ogar Jude" pending={false} />

            <CustomerList name="Marvelous Ike" pending={false} />
          </ul>
        </div>
      </div>
    </section>
  );
}
