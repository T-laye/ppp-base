import Logo from "@/components/Logo";
import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

export default function layout({ children }) {
  return (
    <div className="">
     <Header />

      <main className="pt-12">{children}</main>

      <footer>
        {/* <Navbar /> */}
      </footer>
    </div>
  );
}
