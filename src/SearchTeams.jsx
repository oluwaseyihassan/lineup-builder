import React, { useState, useEffect } from "react";

const SearchTeams = ({showSearch, setShowSearch}) => {

  
  return (
    <div className={`${showSearch ? 'block' : 'hidden'} absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] z-40 h-40 bg-red-400`}>
      <input type="search" name="" id="" />
      <div></div>
    </div>
  );
};

export default SearchTeams;
