import { handlePageNumber } from "@/redux/slices/variableSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function Pagination({ totalPages }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(handlePageNumber(Number(e.target.value)));
  };

  // Generate an array of page numbers from 1 to totalPages
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="">
      <select onChange={handleChange} name="page" id="page">
        {pageNumbers.map((pageNumber) => (
          <option key={pageNumber} value={pageNumber}>
            Page {pageNumber}
          </option>
        ))}
      </select>
    </div>
  );
}
