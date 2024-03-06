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

export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () => {
    setOpenNav(!openNav);
  };
  return (
    <header className=" max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm    z-10">
      <div className="relative flex justify-between items-center px-4 py-1">
        <Logo />
        <div className="cursor-pointer" onClick={handleNav}>
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
              <Link legacyBehavior href="/newVoucher">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <FaListAlt size={20} />
                  <a href="" className="">
                    New Voucher
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
              <Link legacyBehavior href="/usedVoucher">
                <li
                  onClick={handleNav}
                  className="flex items-center space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <FaHistory size={20} />
                  <a href="">Used Voucher</a>
                </li>
              </Link>
              {/* <Link legacyBehavior href="/admin">
                <li
                  onClick={handleNav}
                  className="flex items-center mt-auto text-error space-x-2 active:text-primary duration-200 hover:text-primary"
                >
                  <TbLogout2 size={24} />
                  <a href="">Sign Out</a>
                </li>
              </Link> */}
            </div>
          </ul>
          {/* <div className="">Logout</div> */}
        </nav>
      </div>
    </header>
  );
}

//  <ul className="h-full flex justify-evenly ">
//         <Link href="/admin/product" legacyBehavior>
//           <li
//             className={`${
//               pathname === "/admin/product" ? "text-primary" : "text-gray-500"
//             } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
//           >
//             {/* <div className="h-2 bg-blue-600"> */}
//             {/* </div> */}

//             <a className="text-xs max-[300px]:text-[10px] block ">Product</a>
//           </li>
//         </Link>
//         <Link href="/admin/customers" legacyBehavior>
//           <li
//             className={`${
//               pathname === "/admin/customers" ? "text-primary" : "text-gray-500"
//             } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
//           >
//             <FaUsers size={26} />
//             <a className="text-xs max-[300px]:text-[10px]">Customers</a>
//           </li>
//         </Link>
//         <Link href="/admin/poc" legacyBehavior>
//           <li
//             className={`${
//               pathname === "/admin/poc" ? "text-primary" : "text-gray-500"
//             } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
//           >
//             <a className="text-xs max-[300px]:text-[10px]">POC</a>
//           </li>
//         </Link>
//         <Link href="/admin/personnels" legacyBehavior>
//           <li
//             className={`${
//               pathname === "/admin/personnels"
//                 ? "text-primary"
//                 : "text-gray-500"
//             } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
//           >
//             <BsPersonFillGear size={28} />
//             <a className="text-xs max-[300px]:text-[10px]">Personnels</a>
//           </li>
//         </Link>
//         <Link href="/admin/account" legacyBehavior>
//           <li
//             className={`${
//               pathname === "/admin/account" ? "text-primary" : "text-gray-500"
//             } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
//           >
//             <RiAccountCircleFill size={26} />
//             <a className="text-xs max-[300px]:text-[10px]">Account</a>
//           </li>
//         </Link>
//       </ul>
