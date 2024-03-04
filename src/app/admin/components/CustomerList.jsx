import React from "react";

export default function CustomerList({ pending, name, approved }) {
  return (
    <li className="flex mb-4 border border-gray-200 bg-red-30 active:text-primary active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-100">
      <div>{name}</div>
      {!approved && <button className="btn bg-primary">Approve</button>}
    </li>
  );
}
