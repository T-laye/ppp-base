import Logo from "@/components/Logo";
import React, { Suspense } from "react";
import { IoIosMenu } from "react-icons/io";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function layout({ children }) {
  return (
    <div className="">
      <Header />
      <Suspense>
        <main className="pt-12">{children}</main>
      </Suspense>

      <footer>
        <Navbar />
      </footer>
    </div>
  );
}
