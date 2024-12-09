import React from "react";
//components
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <>
      <div className="SearchBar m-2 items-center flex justify-end">
        <SearchBar />
      </div>
    </>
  );
}
