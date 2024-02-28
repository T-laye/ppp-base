import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";
import { IoIosMenu } from "react-icons/io";

export default function Header() {
  return (
    <header className=" max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm    z-10">
      <div className="relative flex justify-between items-center px-4 py-1">
        <Logo />
        <div>
          <IoIosMenu size={28} />
        </div>
        {/* <nav className="absolute bg-[#ffffff90] backdrop-blur-sm h-screen top-0 left-0 right-0 bottom-0 z-[1000]">
          <ul className="h-full bg-red-300 w-3/4 rounded-tr-xl rounded-br-xl p-5 ">
            <Logo />
            <Link href="#">
              <li>Add Personnel</li>
            </Link>
            <Link href="#">
              <li>Add POC</li>
            </Link>
            <Link href="#">
              <li>Add Customer</li>
            </Link>
            <Link href="#">
              <li>Add Product</li>
            </Link>
          </ul>
        </nav> */}
      </div>
    </header>
  );
}
