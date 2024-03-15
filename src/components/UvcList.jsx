import Link from "next/link";
import React from "react";

export default function UvcList({ name, role }) {
  return (
    <Link href="/uvc/id">
      <div className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primary active:border-primaryActive rounded-xl py-3 text-base px-4 md:px-6 items-center justify-between duration-200 cursor-pointer">
        <div className="flex flex-col">
          <div className="customGray text-lg font-medium leading-5">
            Mr. Matthew Enoguzo
          </div>
          <div className="text-xs font-medium text-gray-600 mt-1">
            20th Jan, 2024.
          </div>
        </div>
        <div className="font-medium">Fuel</div>
      </div>
    </Link>
  );
}
