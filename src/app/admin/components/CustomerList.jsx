"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

export default function CustomerList({ c }) {

  function capitalizeWords(sentence) {
    // Split the sentence into an array of words
    let words = sentence.split(" ");

    // Iterate over each word
    for (let i = 0; i < words.length; i++) {
      // Capitalize the first letter of each word
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a sentence
    return words.join(" ");
  }
  return (
    <Link
      href="/admin/stats/customers/[id]"
      as={`/admin/stats/customers/${c.customerId}`}
    >
      <li
        // onClick={getCustomerDetails}
        className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white  active:text-hite hover:bg-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 "
      >
        <div>{capitalizeWords(c?.name)}</div>
        {/* {!approved && <button className="btn bg-primary">Add Voucher</button>} */}
      </li>
    </Link>
  );
}
