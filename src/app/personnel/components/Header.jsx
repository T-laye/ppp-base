"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () => {
    setOpenNav(!openNav);
  };
  return (
    <header className=" max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm    z-10">
      <div className="relative flex justify-between items-center px-4 py-1">
        <Logo />
        <div className="cursor-pointer flex items-center text-error space-x-2 active:text-primary duration-200 hover:text-primary">
          <Link href="/">
            <TbLogout2 size={32} />
          </Link>
          {/* <a href="">Sign Out</a> */}
        </div>
      </div>
    </header>
  );
}
