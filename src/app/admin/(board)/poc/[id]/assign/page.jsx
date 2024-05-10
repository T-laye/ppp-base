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
  const { pocs } = useSelector((state) => state.pocs);
  const { products } = useSelector((state) => state.products);
  const { personnels } = useSelector((state) => state.personnels);
  const { pageNumber, take, search, productName, staffName, pocName } =
    useSelector((state) => state.variables);

    // const getAllAssignedPersonnelId = pocs?.data?.map((p) => p?.personnel?.userId);
    // console.log(getAllAssignedPersonnelId);
  // console.log(pocs?.data);
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

  const handleAssign = async (userEmail, productId) => {
    try {
      const res = await axios.patch(
        `/api/poc/${id}?user_email=${userEmail}&productId=${productId}`
      );
      console.log(res)
      if (res) {
        toast.success("Successfully Assigned");
        // window.location.reload();
      }
      setShowAssignModal(!showAssignModal);
    } catch (err) {
      // console.error(err);
      setShowAssignModal(!showAssignModal);
      toast.error("Unable to Assign");
    }
  };
  const handleRemove = async (userid, productId) => {
    try {
      const res = await axios.patch(
        `/api/poc/manage/${id}?user_Id=${userid}&productId=${productId}`
      );
      if (res) {
        toast.success("Successfully Remove");
        window.location.reload();
        // console.log(res)
      }

      // setShowAssignModal(!showAssignModal);
    } catch (err) {
      // console.error(err);
      // setShowAssignModal(!showAssignModal);
      toast.error("Unable to Remove");
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
    const assignedProducts = poc?.product?.map((p) => p.id);

    // console.log(poc.product);

    if (products?.data?.length === 0) {
      return <div className="text-lg">No Products Found</div>;
    } else {
      return products?.data
        ?.filter((p) => !assignedProducts?.includes(p.productId))
        .map((p) => (
          <li
            onClick={() => handleAssign("", p?.productId)}
            key={p?.productId}
            className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
          >
            <div>{capitalizeWords(p?.name)}</div>
          </li>
        ));
    }
  };
  const renderPersonnel = () => {
    // const assignedManagement = poc?.management?.map((m) => m.userId);
    const getAllAssignedPersonnelId = pocs?.data?.map(
      (p) => p?.personnel?.userId
    );
    // console.log(assignedManagement);

    if (personnels?.data?.length === 0) {
      return <div className="text-lg">No Personnel Found</div>;
    } else {
      return personnels?.data
        ?.filter(
          (p) =>
            p?.role?.toLowerCase() === item?.toLowerCase() &&
            !getAllAssignedPersonnelId?.includes(p?.id)
        )
        .map((p) => (
          <li
            onClick={() => handleAssign(p?.email, "")}
            key={p?.id}
            className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
          >
            <div>{capitalizeWords(p?.name)}</div>
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

  const renderAssignedPersonnel = () => {
    const assignedPersonnel = personnels?.data?.find(
      (p) => p?.id === poc?.personnel?.userId
    );

    if (assignedPersonnel) {
      return (
        <li
          key={assignedPersonnel?.id}
          className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
        >
          <div>{capitalizeWords(assignedPersonnel?.name)}</div>
          <div>
            <button
              onClick={() => handleRemove(assignedPersonnel?.id, "")}
              className="btn bg-error place-self-end"
            >
              Remove
            </button>
          </div>
        </li>
      );
    } else {
      return <div className="">No Personnel Assigned</div>; // or you can render a placeholder indicating no personnel found
    }
  };

  const renderAssignedManagement = () => {
    const assignedManagement = poc?.management?.map((m) => m?.userId);
    if (assignedManagement?.length > 0) {
      return personnels?.data
        ?.filter((p) => assignedManagement?.includes(p?.id))
        .map((p) => {
          return (
            <li
              key={p.id}
              className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
            >
              <div>{capitalizeWords(p?.name)}</div>
              <div>
                <button
                  onClick={() => handleRemove(p?.id, "")}
                  className="btn bg-error place-self-end"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        });
    } else {
      return <div className="">No Management Assigned</div>;
    }
  };
  // console.log(poc.product);

  const renderAssignedProducts = () => {
    if (poc?.product?.length > 0) {
      return poc?.product?.map((p) => {
        return (
          <li
            key={p.id}
            className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
          >
            <div className="text-lg">{capitalizeWords(p?.productName)}</div>
            <div>
              <button
                onClick={() => handleRemove("", p?.id)}
                className="btn bg-error place-self-end"
              >
                Remove
              </button>
            </div>
          </li>
        );
      });
    } else {
      return <div className="">No Product Assigned</div>;
    }
  };

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
              <div className="flex justify-end my-5 ">
                {!poc?.personnel?.id && (
                  <button
                    onClick={() => handleAssignModal("personnel")}
                    className="btn bg-primary  place-self-end"
                  >
                    Assign Personnel
                  </button>
                )}
              </div>
              <div>{renderAssignedPersonnel()}</div>
            </div>
          </div>
          <div className="mt-10">
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
            <div>{renderAssignedManagement()}</div>
          </div>
          <div className="mt-10">
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
              <div>{renderAssignedProducts()}</div>
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
              {item !== "product" && (
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
              )}
            </form>

            <div className="mt-5 overflow-auto max-h-[70vh] ">
              {renderList()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
