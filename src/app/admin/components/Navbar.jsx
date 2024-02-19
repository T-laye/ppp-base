"use client";
import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { GiGasPump } from "react-icons/gi";
import { PiDropFill } from "react-icons/pi";
import { BsPersonFillGear } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  //   const { pathName } = useRouter();

  //   console.log(pathname);

  return (
    <nav className="fixed bottom-0  left-0 right-0 h-14 border-t border-t-gray-100 bg-white max-w-2xl mx-auto">
      <ul className="h-full flex justify-evenly text-gray-500">
        <Link href="/admin/product" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/product" ? "text-primary" : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 `}
          >
            {/* <div className="h-2 bg-blue-600"> */}
            <PiDropFill size={24} />
            {/* </div> */}

            <a className="text-xs block ">Product</a>
          </li>
        </Link>
        <Link href="/admin/customers" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/customers" ? "text-primary" : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 `}
          >
            <FaUsers size={26} />
            <a className="text-xs">Customers</a>
          </li>
        </Link>
        <Link href="/admin/poc" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/poc" ? "text-primary" : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 `}
          >
            <GiGasPump size={24} />
            <a className="text-xs">POC</a>
          </li>
        </Link>
        <Link href="/admin/personnels" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/personnels"
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 `}
          >
            <BsPersonFillGear size={28} />
            <a className="text-xs">Personnels</a>
          </li>
        </Link>
        <Link href="/admin/account" legacyBehavior>
          <li
            className={`${
              pathname === "/admin/account" ? "text-primary" : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 `}
          >
            <RiAccountCircleFill size={26} />
            <a className="text-xs">Account</a>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
