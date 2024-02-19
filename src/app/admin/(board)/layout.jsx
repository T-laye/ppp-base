import Logo from "@/components/Logo";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import Navbar from "../components/Navbar";

export default function layout({ children }) {
  return (
    <div>
      <header className="bg-white h-[7vh] fixed top-0 left-0 right-0 shadow-sm px-4 flex justify-between items-center">
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
