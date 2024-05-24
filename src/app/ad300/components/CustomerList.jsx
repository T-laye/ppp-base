"use client";

import axios from "axios";
import Image from "next/image";
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
      href="/ad300/stats/customers/[id]"
      as={`/ad300/stats/customers/${c.customerId}`}
    >
      <li
        // onClick={getCustomerDetails}
        className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white  active:text-white hover:bg-primaryActive rounded-xl py-2 text-base px-2 items-center gap-3 duration-200 "
      >
        <div className="h-12 w-12 rounded-lg overflow-hidden ">
          <Image
            className="h-full w-full object-cover"
            src={c?.image}
            alt={c?.name}
            height={500}
            width={500}
          />
        </div>
        <div>{capitalizeWords(c?.name)}</div>
        {/* {!approved && <button className="btn bg-primary">Add Voucher</button>} */}
      </li>
    </Link>
  );
}
