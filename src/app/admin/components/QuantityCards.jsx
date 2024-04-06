import Link from "next/link";
import React from "react";

export default function QuantityCards({ info, available, total }) {
  const percentage = (available / total) * 100;

  const barProgress = () => {
    const result = (available / total) * 100;
    return `${Math.round(result)}%`;
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
  //   console.log(barProgress());

  const barColor = () => {
    if (percentage < 40) {
      return "bg-error";
    } else if (percentage >= 40 && percentage < 65) {
      return "bg-yellow-500";
    } else return "bg-primary";
  };

  //   console.log(available);
  //   console.log(percentage);
  //   console.log(barProgress());

  return (
    <Link href="/admin/stats/[productId]" as={`/admin/stats/${info.productId}`}>
      <div className="rounded-xl border px-4 pt-1 pb-4 hover:text-white active:bg-primaryActive cursor-pointer active:border-primaryActive hover:bg-primaryActive duration-200 mt-4">
        <div className="flex justify-between items-end">
          <h4 className="text-lg font-medium">
            {capitalizeWords(info?.name) + " " + "Level"}
          </h4>
          <div className="text-base">
            {available}/{total}
          </div>
        </div>
        <div className="h-2 bg-gray-300 rounded-xl mt-4 overflow-hidden">
          <div
            style={{ width: barProgress() }}
            className={`h-full rounded-xl w-[${barProgress()}%]   ${barColor()} `}
          ></div>
        </div>
      </div>
    </Link>
  );
}
