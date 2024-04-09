"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa6";

export default function PersonnelList({ info }) {
  const router = useRouter()
  const userColor = () => {
    if (info?.role.toLowerCase() === "admin") {
      return "text-primary";
    } else if (info?.role.toLowerCase() === "management") {
      return "text-yellow-400";
    } else return "text-customGray";
  };

  function capitalizeWords(sentence) {
    // Split the sentence into an array of words
    let words = sentence?.split(" ");

    // Iterate over each word
    for (let i = 0; i < words?.length; i++) {
      // Capitalize the first letter of each word
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a sentence
    return words?.join(" ");
  }

  const viewPerson = () => {
    router.push(`/admin/workForce/${info?.id}`);
  };

  return (
    // <Link
    //   href="/admin/workForce/id"
    //   as={`/admin/stats/workForce/${info?.id}`}
    // >
    <li
      onClick={viewPerson}
      className="flex mb-4 border border-gray-200 bg-red-30 hover:text-white hover:bg-primaryActive active:border-primaryActive rounded-xl py-3 text-base px-3 items-center justify-between duration-200 cursor-pointer"
    >
      <div>{capitalizeWords(info?.name)}</div>
      <div>
        <FaUser size={24} className={`${userColor()}`} />
      </div>
    </li>
    // </Link>
  );
}
