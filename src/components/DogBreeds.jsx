import React, { useState, useEffect } from "react";
const dogBreedApiUrl = import.meta.env.VITE_SERVER_DOGBREED;
const dogBreedKey = import.meta.env.VITE_DOGBREED_API_KEY;

const DogBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch(dogBreedApiUrl + "v1/breeds", {
        headers: {
          "x-api-key": dogBreedKey,
        },
      });

      if (res.ok) {
        const data = await res.json();
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
  return <div className="list-container">
    {/* {JSON.stringify(breeds)} */}
    </div>;
};

export default DogBreeds;
