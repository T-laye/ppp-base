import Link from "next/link";
import React from "react";

export default function CustomerList({ pending, name, approved }) {
  return (
    <Link href="/admin/vouchers/id">
      <li className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white  active:text-hite hover:bg-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 ">
        <div>{name}</div>
        {!approved && <button className="btn bg-primary">Approve</button>}
      </li>
    </Link>
  );
}
