"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import { BsCardList, BsPersonFillGear } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { GiGasPump } from "react-icons/gi";
import { IoIosMenu } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { FaHistory } from "react-icons/fa";
import { PiDropFill } from "react-icons/pi";
import { MdAttachEmail, MdVerifiedUser } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useLogoutMutation } from "@/redux/slices/usersApiSlice";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutApiCall] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(worker);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push("/ad300");
      // console.log("log out");
    } catch (err) {
      // console.log(err);
    }
  };
  function getLastWord(sentence) {
    // if (typeof sentence !== "string") {
    //   throw new Error("Input must be a string");
    // }
    if (worker?.name) {
      const words = sentence?.trim().split(/\s+/);
      return words[words?.length - 1];
    }
  }

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

  const handleNav = () => {
    setOpenNav(!openNav);
  };
  return (
    <header className=" lg:max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm  z-10">
      <div className="relative flex justify-between items-center px-4 py-1">
        <Logo />
        <div
          className="cursor-pointer flex items-center justify-center gap-2"
          onClick={handleNav}
        >
          {/* <p>
            Welcome, {worker?.gender === "MALE" ? "Mr." : "Ma."}{" "}
            {capitalizeWords(getLastWord(worker?.name))}
          </p> */}
          <IoIosMenu size={28} />
        </div>
        <nav
          onClick={handleNav}
          className={` ${
            openNav
              ? "translate-x-0 duration-200 opacity-100"
              : "duration-200 -translate-x-full opacity-0"
          } absolute bg-[#b9b9b990] duration-200 backdrop-blur-sm h-screen top-0 left-0 right-0 bottom-0 z-[1000]`}
        >
          <ul className="text-xl font-normal h-full bg-white w-3/4 md:w-1/2 max-[300px]:w-11/12 rounded-tr-xl rounded-br-xl px-5 pt-3 ">
            <div className="bg-gren-300 flex justify-start">
              <Logo h="h-20" />
            </div>
            <div className="flex flex-col bg-ble-400 gap-5 mt-5 text-lg">
              <Link legacyBehavior href="/newCustomer">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <FaUser size={20} />
                  <a href="" className="">
                    New Customer
                  </a>
                </li>
              </Link>
              {/* <Link legacyBehavior href="/newManagement">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <BsPersonPlus size={20} stroke="2" />
                  <a href="">New Management</a>
                </li>
              </Link> */}
              <Link legacyBehavior href="/newPersonnel">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <BsPersonFillGear size={24} />
                  <a href="">New Personnel</a>
                </li>
              </Link>
              <Link legacyBehavior href="/newPoc">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <GiGasPump size={24} />
                  <a href="">New POC</a>
                </li>
              </Link>
              <Link legacyBehavior href="/newProduct">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <PiDropFill size={20} />
                  <a href="">New Product</a>
                </li>
              </Link>

              <Link legacyBehavior href="/ad300/stats/usedVoucher">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <FaHistory size={20} />
                  <a href="">UVC</a>
                </li>
              </Link>
              <div onClick={logoutHandler}>
                <li
                  onClick={handleNav}
                  className="flex items-center mt-auto text-error space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <TbLogout2 size={24} />
                  <a href="">Sign Out</a>
                </li>
              </div>
            </div>
          </ul>
          {/* <div className="">Logout</div> */}
        </nav>
      </div>
    </header>
  );
}
