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
import { useLogoutMutation } from "@/redux/slices/usersApiSlice";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
   const dispatch = useDispatch();
   const router = useRouter();
   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
     try {
       await logoutApiCall().unwrap();
       dispatch(logout());
       router.push("/");
       console.log("log out");
     } catch (err) {
       console.log(err);
     }
   };

  const handleNav = () => {
    setOpenNav(!openNav);
  };
  return (
    <header className=" max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm    z-10">
      <div className="relative flex justify-between items-center px-4 py-1">
        <Logo />
        <div className="cursor-pointer text-error" onClick={handleNav}>
          {/* <IoIosMenu size={28} /> */}
          <div>
          <TbLogout2 size={28} onClick={logoutHandler} />
          </div>
        </div>
      </div>
    </header>
  );
}
