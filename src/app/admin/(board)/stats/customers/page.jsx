"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";
import GoBack from "@/components/GoBack";
import CustomerList from "@/app/admin/components/CustomerList";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from "@/redux/slices/variableSlice";
import Loading from "@/components/Loading";

export default function Customers() {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const { customers } = useSelector((state) => state.customers);
  const { data, count } = customers;
  const dispatch = useDispatch();

  // console.log(customers);

  const addCustomer = () => {
    router.push("/newCustomer");
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      dispatch(handleSearch(e.target.value.toLowerCase()));
    }
  };

  const renderCustomers = () => {
    if (data) {
      if (data.length === 0) {
        return <div>No Customers Found</div>;
      } else {
        return data?.map((c) => <CustomerList key={c?.customerId} c={c} />);
        
      }
    } else {
      return <Loading />;
    }
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
        <div className="text-end mt-3 text-sm text-gray-500 pr-2">
          {data?.length ?? 0}
        </div>

        <div className="bg-gren-400 pt-3 pb-10">
          <ul>{renderCustomers()}</ul>
        </div>
      </div>
    </section>
  );
}
