//list of dog cards
import React, { useState, useEffect } from "react";
import DogCard from "./DogCard";
const dogBreedApiUrl = import.meta.env.VITE_SERVER_DOGBREED;
const dogBreedKey = import.meta.env.VITE_DOGBREED_API_KEY;
import styles from "./DogBreeds.module.css";

const DogBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    // console.log("Fetching from:", dogBreedApiUrl + "v1/breeds");
    // console.log("Using API Key:", dogBreedKey);
    try {
      const res = await fetch(dogBreedApiUrl + "v1/breeds", {
        headers: {
          "x-api-key": dogBreedKey,
        },
      });

      if (res.ok) {
        const data = await res.json();
        // console.log("Fetched data:", data);
        setBreeds(data);
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // console.log("BREEDS:", breeds);
  }, [breeds]);

  return (
    <div className={styles.listContainer}>
      {/* {JSON.stringify(breeds)} */}
      <ul>
        {breeds.map((breed) => (
          <li key={breed.id}>
            <DogCard
              key={breed.id}
              id={breed.id}
              name={breed.name}
              life_span={breed.life_span}
              image={{
                url: breed.reference_image_id
                  ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
                  : null,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogBreeds;
