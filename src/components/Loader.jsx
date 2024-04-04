import React from "react";
import spinner from "/public/images/mini_spinner.png";
import Image from "next/image";
import { ImSpinner9 } from "react-icons/im";

export default function Loader({ w = "6", h = "6" }) {
  return (
    <div className="text-white animate-spin">
      <ImSpinner9 size={28} />
    </div>
  );
}
