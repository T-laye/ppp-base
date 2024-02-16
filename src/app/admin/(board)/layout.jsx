import Logo from "@/components/Logo";
import React from "react";
import { IoIosMenu } from "react-icons/io";

export default function layout({ children }) {
  return (
    <div>
      <header className="bg-white h-[7vh] shadow-sm px-4 flex justify-between items-center">
        <Logo />
        <div>
          <IoIosMenu size={28} />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
