import React from "react";

import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <>
      <div className="items-center flex justify-end">
        <SearchBar />
      </div>
    </>
  );
};
export default Header;