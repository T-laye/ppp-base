import React from "react";
import spinner from "/public/images/mini_spinner.png";
import Image from "next/image";

export default function Loader({ w = "6", h = "6" }) {
  return (
    <div>
      <Image
        className={`animate-spin w-${w} h-${h}`}
        src={spinner}
        alt="Spinner"
        // height={80}
        // width={80}
        aria-hidden="true"
        priority
        as="image"
      />
    </div>
  );
}
