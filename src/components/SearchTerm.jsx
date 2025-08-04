import React from "react";
import { useState, useEffect } from "react";

const SearchTerm = ({ allBreeds, setFilteredBreeds }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = allBreeds.filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBreeds(filtered);
  },[searchTerm, allBreeds]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search Breed Name"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      ></input>
    </div>
  );
};

export default SearchTerm;
