"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import VoucherList from "../../components/VoucherList";
import CustomerList from "../../components/CustomerList";
import { MdOutlineCancel } from "react-icons/md";
import { handleSearch } from "@/redux/slices/variableSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Vouchers() {
  const [approved, setApproved] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showAddVoucher, setShowAddVoucher] = useState(false);
  const [term, setTerm] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);
  const { customers } = useSelector((state) => state.customers);
  const { products } = useSelector((state) => state.products);

  const handleProduct = () => {
    setApproved(!approved);
  };

  function capitalizeWords(sentence) {
    // Split the sentence into an array of words
    let words = sentence?.split(" ");

    // Iterate over each word
    for (let i = 0; i < words?.length; i++) {
      // Capitalize the first letter of each word
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a sentence
    return words?.join(" ");
  }

  const handleAddVoucher = () => {
    setShowAddVoucher(!showAddVoucher);
    dispatch(handleSearch(""));
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

  const renderProductsTab = () => {
    return products?.data?.map((p, i) => {
      return (
        <div
          key={i}
          onClick={() => setTab(i)}
          className={`${
            activeTab === i ? "bg-primary text-white" : "border text-gray-400 "
          }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
        >
          {capitalizeWords(p.name)}
        </div>
      );
    });
  };

  const renderCustomers = () => {
    if (customers.length === 0 && term) {
      return <p>No Customer Found</p>;
    } else if (term.length > 2) {
      return customers?.data?.map((c) => (
        <CustomerList key={c?.customerId} c={c} />
      ));
    } else {
      return customers?.data?.map((c) => (
        <CustomerList key={c?.customerId} c={c} />
      ));
    }
  };
  console.log(customers);

  return (
    <section className="relative min-h-screen bg-green300 py-4">
      <div className="mt-4 bg-red400">
        <div className="flex max-[285px]:justify-center space-x-3 items-center mt4 mb-5 text-base">
          {/* <div
            onClick={() => setTab(1)} // Wrap the setTab function call in an arrow function
            className={`${
              activeTab === 1
                ? "bg-primary text-white"
                : "border text-gray-400 "
            }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
          >
            Fuel
          </div> */}
          {/* <div
            onClick={() => setTab(0)} // Wrap the setTab function call in an arrow function
            className={`${
              activeTab === 0
                ? "bg-primary text-white"
                : "border text-gray-400 "
            }  px-3 py-1 rounded-xl duration-200 text-center cursor-pointer`}
          >
            All
          </div> */}
          {renderProductsTab()}
        </div>

        <div className="flex flex-wrap justify-between gap-2 bg-bue-400 mb-8">
          <div
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
          </div>
          <button
            onClick={handleAddVoucher}
            className="btn max-[285px]:mx-auto bg-primary"
          >
            + Add
          </button>
        </div>
      </div>
      <div className="mt-4">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="relative ">
            <input
              type="text"
              placeholder="Search by name "
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
      {/* New Voucher modal */}

      {showAddVoucher && (
        <div className="bg-[#5C5F6290] backdrop-blur-sm  px-4 min-h-screen absolute top-0 left-0 right-0 bottom-0 z-50">
          <div className="bg-white min-w-[270px] w-full mt-10 mx-auto rounded-xl px-4 pt-4 pb-8">
            <div className="text-end text-primary  flex justify-end ">
              <button>
                <MdOutlineCancel size={24} onClick={handleAddVoucher} />
              </button>
            </div>
            <form
              action=""
              onSubmit={(e) => e.preventDefault()}
              className="mt-4"
            >
              <div className="relative ">
                <input
                  type="text"
                  placeholder="Search by customer name"
                  className="w-full  p-2 outline-none rounded-xl   text-base  placeholder:text-sm placeholder:font-normal "
                  value={term}
                  onChange={handleChange}
                />
                <div className="absolute top-3 right-2.5 text-gray-400">
                  <BiSearchAlt2 size={20} />
                </div>
              </div>
            </form>

            {/* {term !== "" && ( */}
            <div className="mt-5 overflow-auto max-h-[70vh] ">
              {renderCustomers()}
            </div>
            {/* )} */}
          </div>
        </div>
      )}
    </section>
  );
}
