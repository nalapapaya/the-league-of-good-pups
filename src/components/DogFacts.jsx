//random dog fact component
import React, { useState, useEffect } from "react";
const dogFactsURL = import.meta.env.VITE_SERVER_DOGFACTS;

const DogFacts = () => {
  const [facts, setFacts] = useState([]);
  const [error, setError] = useState(null);

  const getFacts = async () => {
    try {
      const res = await fetch(dogFactsURL + "facts");

      if (res.ok) {
        const data = await res.json();
        setFacts(data);
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };
  useEffect(() => {
    getFacts();
  }, []);
  return <div className="container">
    </div>;
};

export default DogFacts;
