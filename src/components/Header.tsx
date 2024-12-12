import React from "react";

import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <>
      <div className="items-center flex justify-end">
        <SearchBar />
      </div>
    </>
  );
}
