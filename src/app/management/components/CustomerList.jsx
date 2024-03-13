import Link from "next/link";
import React from "react";

export default function CustomerList({ pending, name, approved }) {
  return (
    <Link href="/management/customers/id">
      <div className="flex mb-4 border border-gray-200 bg-red-30 hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200">
        <div>{name}</div>
        {!approved && <button className="btn bg-primary">Create</button>}
      </div>
    </Link>
  );
}
