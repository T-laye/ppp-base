import React from "react";

export default function ProgressBar({ available, total, name }) {
  const percentage = (available / total) * 100;

  const barProgress = () => {
    const result = (available / total) * 100;
    return `${Math.round(result)}%`;
  };

  //   console.log(barProgress());

  const barColor = () => {
    if (percentage < 40) {
      return "bg-error";
    } else if (percentage >= 40 && percentage < 65) {
      return "bg-yellow-400";
    } else return "bg-primary";
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

  return (
    <>
        <>
          <div className="flex justify-between items-end mt-3">
            <h4 className="text-lg">{capitalizeWords(name)}</h4>
            <div className="text-base">
              {available ?? 0}/{total ?? 0}
            </div>
          </div>
          <div className="h-2 bg-gray-300 rounded-xl mt-2 overflow-hidden">
      {available && (
            <div
              style={{ width: barProgress() }}
              className={`h-full rounded-xl w-[${barProgress()}%]   ${barColor()} `}
            ></div>
        )}
          </div>
        </>
    </>
  );
}
