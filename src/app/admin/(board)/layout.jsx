import Logo from "@/components/Logo";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import Navbar from "../components/Navbar";

export default function layout({ children }) {
  return (
    <div className="">
      <header className=" max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm px-4 flex justify-between items-center py-1 z-10">
        <Logo />
        <div>
          <IoIosMenu size={28} />
        </div>
      </header>

      <main className="pt-12">{children}</main>

      <footer>
        <Navbar />
      </footer>
    </div>
  );
}
