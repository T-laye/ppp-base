import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-white h-[7vh] shadow-sm px-4 flex justify-between items-center">
      <div className="logo text-primary font-medium text-base">
        <Link href="/">PPP-BASE</Link>
      </div>
      <div>
        <button className="btn bg-primary">Sign Up</button>
      </div>
    </header>
  );
}
