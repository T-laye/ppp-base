"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Logo from "./Logo";

export default function SignHeader({ signInPage }) {
  const router = useRouter();

  const goToSignUp = () => {
    router.push(`${signInPage ? "/signUp" : "/"}`);
  };

  return (
    <header className="bg-white h-[7vh] shadow-sm px-4 flex justify-between items-center">
      <Logo />
      <div>
        {/* <button onClick={goToSignUp} className="btn bg-primary">
          {signInPage ? "Sign Up" : "Sign In"}
        </button> */}
      </div>
    </header>
  );
}
