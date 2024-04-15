"use client";
import GoBack from "@/components/GoBack";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Loader from "@/components/Loader.jsx";
import { toast } from "react-toastify";
import { poc_validate } from "../../../../../../../lib/validate";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { getPoc } from "@/redux/slices/getPocSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import CustomerList from "@/app/admin/components/CustomerList";
import {
  handleProductName,
  handleSearch,
  handleStaffName,
} from "@/redux/slices/variableSlice";
import Loading from "@/components/Loading";

export default function Page() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [term, setTerm] = useState("");
  const [item, setItem] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { poc } = useSelector((state) => state.poc);
  const { products } = useSelector((state) => state.products);
  const { personnels } = useSelector((state) => state.personnels);
  const { pageNumber, take, search, productName, staffName, pocName } =
    useSelector((state) => state.variables);

  // console.log(products);
  // console.log(personnels);
  console.log(poc);
  useEffect(() => {
    const getPocDetails = async () => {
      const res = await axios.get(`/api/poc/${id}`);
      // console.log(res);

      dispatch(getPoc({ ...res.data.data }));
    };
    getPocDetails();
  }, [dispatch, id]);

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

  const handleAssign = async (userId, productId) => {

    try {
      const res = await axios.patch(
        `/api/poc/${id}?user_Id=${userId}&productId=${productId}`
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignModal = (i) => {
    setShowAssignModal(!showAssignModal);
    setItem(i);
    setTerm("");
    dispatch(handleProductName(""));
    dispatch(handleStaffName(""));
  };

  const renderProduct = () => {
    if (products?.data?.length === 0) {
      return <div className="text-lg">No Products Found</div>;
    } else {
      return products?.data?.map((p) => (
        <li
          onClick={() => handleAssign('', p.productId)}
          key={p.productId}
          className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
        >
          <div>{capitalizeWords(p.name)}</div>
        </li>
      ));
    }
  };
  const renderPersonnel = () => {
    if (personnels?.data?.length === 0) {
      return <div className="text-lg">No Products Found</div>;
    } else {
      return personnels?.data
        ?.filter((p) => p.role.toLowerCase() === item.toLowerCase())
        .map((p) => (
          <li
            onClick={() => handleAssign(p.id, '')}
            key={p.id}
            className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
          >
            <div>{capitalizeWords(p.name)}</div>
          </li>
        ));
    }
  };

  const renderList = () => {
    if (item === "product") {
      return renderProduct();
    }
    if (item === "management" || item === "personnel") {
      return renderPersonnel();
    }
  };
  // const renderManagement = () => {
  //   if (products?.data.length === 0) {
  //     return <div className="text-lg">No Products Found</div>;
  //   } else {
  //     return products?.data.map((p) => (
  //       <li
  //         key={p.id}
  //         className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
  //       >
  //         <div>{p.name}</div>
  //       </li>
  //     ));
  //   }
  // };

  const handleChange = (e) => {
    setTerm(e.target.value);
    if (e.target.value.length >= 2 || e.target.value.length === 0) {
      if (item === "product") {
        dispatch(handleProductName(e.target.value.toLowerCase()));
      }
      if (item === "personnel") {
        dispatch(handleStaffName(e.target.value.toLowerCase()));
      }
    }
  };

  return (
    <section className="pt-8 pb-20 min-h-screen bg-ed-500 relative">
      <div className="flex justify-between items-center">
        <GoBack />
      </div>
      {products?.data && personnels?.data ? (
        <>
          {" "}
          <div className="mt-6">
            <h3 className="text-center text-lg font-medium mt-3">
              Assign Personnel
            </h3>
            <div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleAssignModal("personnel")}
                  className="btn bg-primary my-5 place-self-end"
                >
                  Assign Personnel
                </button>
              </div>
              <div>
                <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer">
                  <div>James Goodman</div>
                  <div>
                    <button
                      onClick={handleAssignModal}
                      className="btn bg-error place-self-end"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-center text-lg font-medium mt-3">
              Assign Management
            </h3>
            <div className="flex justify-end">
              <button
                onClick={() => handleAssignModal("management")}
                className="btn bg-primary my-5 place-self-end"
              >
                Assign Management
              </button>
            </div>
            <div>
              <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer">
                <div>Max Taylor</div>
                <div>
                  <button
                    onClick={handleAssignModal}
                    className="btn bg-error place-self-end"
                  >
                    Remove
                  </button>
                </div>
              </li>
              <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer">
                <div>James Goodman</div>
                <div>
                  <button
                    onClick={handleAssignModal}
                    className="btn bg-error place-self-end"
                  >
                    Remove
                  </button>
                </div>
              </li>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-center text-lg font-medium mt-3">
              Assign Product
            </h3>
            <div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleAssignModal("product")}
                  className="btn bg-primary my-5 place-self-end"
                >
                  Assign Product
                </button>
              </div>
              <div>
                <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer">
                  <div>James Goodman</div>
                  <div>
                    <button
                      onClick={handleAssignModal}
                      className="btn bg-error place-self-end"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}

      {/* Modal */}
      {showAssignModal && (
        <div className="bg-[#5C5F6290] backdrop-blur-sm  px-4 min-h-screen absolute top-0 left-0 right-0 bottom-0 z-50">
          <div className="bg-white min-w-[270px] w-full mt-10 mx-auto rounded-xl px-4 pt-4 pb-8">
            <div className="text-end text-primary  flex justify-end ">
              <button>
                <MdOutlineCancel size={24} onClick={handleAssignModal} />
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

            <div className="mt-5 overflow-auto max-h-[70vh] ">
              {/* <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer">
                <div>Alex Johnson</div>
                <div>
                  <FaUser size={24} className={``} />
                </div>
              </li>
              <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer">
                <div>Max Taylor</div>
                <div>
                  <FaUser size={24} className={``} />
                </div>
              </li>
              <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer">
                <div>Dwayne Michael</div>
                <div>
                  <FaUser size={24} className={``} />
                </div>
              </li> */}
              {renderList()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
