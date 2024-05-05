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
    <header className=" lg:max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm  z-10">
      <Logo />
      <div>
        {/* <button onClick={goToSignUp} className="btn bg-primary">
          {signInPage ? "Sign Up" : "Sign In"}
        </button> */}
      </div>
    </header>
  );
}
