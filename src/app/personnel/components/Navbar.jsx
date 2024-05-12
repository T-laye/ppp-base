"use client";
import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { GiGasPump } from "react-icons/gi";
import { PiDropFill } from "react-icons/pi";
import { BsPersonFillGear } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { RiAccountCircleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { MdVerifiedUser } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";

export default function Navbar() {
  const pathname = usePathname();
  //   const { pathName } = useRouter();

  //   console.log(pathname);

  return (
    <nav className="fixed z-5 bottom-0  left-0 right-0 h-14 border-t border-t-gray-100 bg-white lg:max-w-2xl mx-auto">
      <ul className="h-full flex justify-evenly ">
        <Link href="/personnel/stats" legacyBehavior>
          <li
            className={`${
              pathname.startsWith("/personnel/stats")
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            <ImStatsBars size={20} />
            <a className="text-xs text-center max-[300px]:text-[10px] block ">
              Statistics
            </a>
          </li>
        </Link>
        <Link href="/personnel/verify" legacyBehavior>
          <li
            className={`${
              pathname.startsWith("/personnel/verify")
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            <MdVerifiedUser size={22} />

            <a className="text-xs text-center max-[300px]:text-[10px] block ">
              Verification
            </a>
          </li>
        </Link>

        <Link href="/personnel/usedVoucher" legacyBehavior>
          <li
            className={`${
              pathname.startsWith("/personnel/usedVoucher")
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            <FaHistory size={22} />
            <a className="text-xs max-[300px]:text-[10px]">UVC</a>
          </li>
        </Link>
        {/* <Link href="/personnel/account" legacyBehavior>
          <li
            className={`${
              pathname === "/personnel/account"
                ? "text-primary"
                : "text-gray-500"
            } flex flex-col items-center justify-between bg-green-40 h-full py-2 cursor-pointer`}
          >
            <RiAccountCircleFill size={26} />
            <a className="text-xs max-[300px]:text-[10px]">Account</a>
          </li>
        </Link> */}
      </ul>
    </nav>
  );
}
