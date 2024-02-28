import React from "react";

export default function CustomerList({ pending, name }) {
  return (
    <li className="flex mb-4 border border-gray-200 bg-red-30 active:text-primary active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-100">
      <div>{name}</div>
      <button
        className={`${
          pending ? "btn bg-primary" : "btn-secondary bg-customGray"
        } `}
      >
        {pending ? "Approve" : "Enlist"}
      </button>
    </li>
  );
}
