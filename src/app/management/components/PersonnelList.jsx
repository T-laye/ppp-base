import React from "react";
import { FaUser } from "react-icons/fa6";

export default function PersonnelList({ name, role }) {
  // const userColor = () => {
  //   if (role === "admin") {
  //     return "text-primary";
  //   } else if (role === "management") {
  //     return "text-yellow-400";
  //   } else return;
  // };

  return (
    <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primary active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200">
      <div>{name}</div>
      <div>
        {/* <FaUser size={24} className={`${userColor()}`} /> */}
        <FaUser size={24} className={`text-primary`} />
      </div>
    </li>
  );
}
