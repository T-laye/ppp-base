import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({h='h-12'}) {
  return (
    <div className=" text-primary font-medium text-base ">
      <Link href="/">
        <div className={`${h} w-full object-contain`}>
          <Image
            src="/images/logo-removebg.png"
            alt="PPP-Base Logo"
            height={200}
            width={200}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>
    </div>
  );
}
