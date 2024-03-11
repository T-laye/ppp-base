"use client";
import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { GiGasPump } from "react-icons/gi";
// import { PiDropFill } from "react-icons/pi";
import { ImStatsBars } from "react-icons/im";
import { BsPersonFillGear } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { BsCardList } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  //   const { pathName } = useRouter();

  //   console.log(pathname);

  return (
    <nav className="fixed z-5 bottom-0  left-0 right-0 h-14 border-t border-t-gray-100 bg-white max-w-2xl mx-auto">
      <ul className="h-full flex justify-evenly ">
        <Link href="/admin/stats" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/stats" || pathname.startsWith("/admin/stats")
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            {/* <div className="h-2 bg-blue-600"> */}
            {/* <PiDropFill size={24} /> */}
            <ImStatsBars size={24} />
            {/* </div> */}

            <a className="text-xs max-[300px]:text-[10px] block ">Statistics</a>
          </li>
        </Link>
        <Link href="/admin/vouchers" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/vouchers" ||
              pathname.startsWith("/admin/vouchers")
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            <FaListAlt size={20} />
            <a className="text-xs max-[300px]:text-[10px]">Vouchers</a>
          </li>
        </Link>
        <Link href="/admin/poc" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/poc" || pathname.startsWith("/admin/poc")
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            <GiGasPump size={24} />
            <a className="text-xs max-[300px]:text-[10px]">POC</a>
          </li>
        </Link>
        <Link href="/admin/workForce" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/workForce" ||
              pathname.startsWith("/admin/workForce")
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            <FaUsers size={26} />
            <a className="text-xs max-[300px]:text-[10px]">Work Force</a>
          </li>
        </Link>
        <Link href="/admin/account" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/account" ||
              pathname.startsWith("/admin/account")
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            <RiAccountCircleFill size={26} />
            <a className="text-xs max-[300px]:text-[10px]">Account</a>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
