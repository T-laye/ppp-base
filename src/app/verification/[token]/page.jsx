"use client";
import Logo from "@/components/Logo";
import SignHeader from "@/components/SignHeader";
import { useParams } from "next/navigation";
import React from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";

export default function Page() {
  const params = useParams();
  return (
    <section>
      <div className="container mx-auto px-4 h-screen flex flex-col items-center ">
        <div className="mt-10">
          <Logo h="h-20" />
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <MdOutlineVerifiedUser size={160} className="text-primary" />
          <p className="text-center font-medium text-lg mt-4 w-10/12">
            Verification is successful for OKORO MADUKA having the email:
            okoro@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
