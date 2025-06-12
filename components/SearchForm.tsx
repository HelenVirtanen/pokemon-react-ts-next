import React from "react";
import { search } from "../utils/icons";

function SearchForm() {
  return (
    <form className="relative w-[80%] md:w-[50%]">
      <input
        type="text"
        placeholder="Search Pokemon!"
        className="bg-white u-shadow-1 w-full py-5 px-6 rounded-xl text-lg outline-none text-gray-800"
      />
      <span className="absolute right-6 text-3xl top-[50%] translate-y-[-50%] text-amber-200 pointer-events-none">
        {search}
      </span>
    </form>
  );
}

export default SearchForm;
