"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import { BsCardList, BsPersonFillGear } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { GiGasPump } from "react-icons/gi";
import { IoIosMenu } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { PiDropFill } from "react-icons/pi";
import { MdVerifiedUser } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { ImStatsBars } from "react-icons/im";
import { RiAccountCircleFill } from "react-icons/ri";
import { useLogoutMutation } from "@/redux/slices/usersApiSlice";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const handleNav = () => {
    setOpenNav(!openNav);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push("/");
      // console.log("log out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className=" lg:max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm    z-10">
      <div className="relative flex justify-between items-center px-4 py-1">
        <Logo />
        <div className="cursor-pointer text-error">
          {/* <IoIosMenu size={28} /> */}
          <TbLogout2 size={28} onClick={logoutHandler} />
        </div>
        {/* <nav
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
              <Link legacyBehavior href="/personnel">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <ImStatsBars size={20} />
                  <a href="">Statistics</a>
                </li>
              </Link>
              <Link legacyBehavior href="/verification">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <MdVerifiedUser size={20} />
                  <a href="">Verify Voucher</a>
                </li>
              </Link>
              <Link legacyBehavior href="/usedVoucher">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <FaHistory size={20} />
                  <a href="">HIstory</a>
                </li>
              </Link>
              <Link legacyBehavior href="/personnel/account">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <RiAccountCircleFill size={20} />
                  <a href="">Account</a>
                </li>
              </Link>
              <Link legacyBehavior href="/">
                <li
                  onClick={handleNav}
                  className="flex items-center mt-auto text-error space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <TbLogout2 size={24} />
                  <a href="">Sign Out</a>
                </li>
              </Link>
            </div>
          </ul>
        </nav> */}
      </div>
    </header>
  );
}
