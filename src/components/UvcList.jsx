import Link from "next/link";
import React from "react";

export default function UvcList({ name, date, product, id }) {
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

    function formatDate(dateString) {
      // Parse the date string
      const date = new Date(dateString);
      // console.log(date);
      if (name) {
        const dateOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const timeOptions = { hour: "numeric", minute: "numeric" };

        // Format the date and time according to options
        const formattedDate = date.toLocaleDateString("en-US", dateOptions);
        const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

        return `${formattedDate} at ${formattedTime}`;
      }
      return;
    }
  return (
    <Link href={`/uvc/${id}`}>
      <div className="flex mb-4 border-2  bg-red-30 hover:text-white hover:bg-primary border-primary rounded-xl py-4 text-base px-4 md:px-6 items-center justify-between duration-200 cursor-pointer">
        <div className="flex flex-col">
          <div className=" text-lg font-medium leading-5">
            {capitalizeWords(name)}
          </div>
          <div className=" text-xs font-medium  mt-1">{formatDate(date)}</div>
        </div>
        <div className="font-medium">{capitalizeWords(product)}</div>
      </div>
    </Link>
  );
}
