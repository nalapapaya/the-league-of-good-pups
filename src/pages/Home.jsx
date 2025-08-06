//landing page
import React from "react";
import DogBreeds from "../components/DogBreeds";
import styles from "./Home.module.css";
import SearchTerm from "../components/SearchTerm";
import { useState, useEffect } from "react";

const Home = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.thedogapi.com/v1/breeds");
      const data = await res.json();
      setAllBreeds(data);
      setFilteredBreeds(data); //default no filter
    };
    fetchData();
  }, []);

  return (
    <div className="homeContainer">
      <SearchTerm allBreeds={allBreeds} setFilteredBreeds={setFilteredBreeds} />
      <DogBreeds breeds={filteredBreeds} setBreeds={setBreeds} />
    </div>
  );
};

export default Home;
