"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function AccountCard({ color, title, icon, link }) {
  const router = useRouter();

  const handleRoute = () => {
    router.push(link);
  };

  return (
    // <Link href="">
    <div
      onClick={handleRoute}
      className={`accountCard ${color} cursor-pointer hover:scale-[1.02] active:scale-[0.99] duration-200 flex-col items-center justify-between py-5 px-4`}
    >
      <div className="text-primry place-self-end">{icon}</div>
      <h3 className="text-2xl leading-7 bg-green-40 text-primar text-start place-self-start font-medium">
        {title}
      </h3>
      {/* <p className="text-xs font-semibold place-self-start">title</p> */}
    </div>
    // </Link>
  );
}
