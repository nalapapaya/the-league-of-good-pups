//detailed view of dog breed (prop from DogBreeds)
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const dogBreedApiUrl = import.meta.env.VITE_SERVER_DOGBREED;
const dogBreedKey = import.meta.env.VITE_DOGBREED_API_KEY;
import styles from "./DogDetail.module.css";
import { addToTeam } from "../api/airtable";

const DogDetail = ({ team, setTeam }) => {
  const { id } = useParams();
  const [breed, setBreed] = useState(null);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch(`${dogBreedApiUrl}v1/breeds/${id}`, {
        headers: {
          "x-api-key": dogBreedKey,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setBreed(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!breed) {
    return <div>Loading...</div>;
  } // stop render until breed available

  // add to team
  const handleAddToTeam = async () => {
    try {
      const newDog = await addToTeam(breed); //PUT airtable
      setTeam((prevState) => [
        ...prevState,
        { airtableId: newDog.id, ...newDog.fields },
      ]);
      console.log(`${breed.name} added to team`);
    } catch (error) {
      console.error(error);
      console.log("failed to add to team");
    }
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <div className={styles.container}>
        <h2>{breed.name}</h2>
        <img
          src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
          alt={breed.name}
          style={{ maxWidth: "500px", borderRadius: "15px" }}
        />
        <table>
          <tbody>
            <tr>
              <th>Bred for:</th>
              <td>{breed.bred_for || "Not available"}</td>
            </tr>
            <tr>
              <th>Breed Group:</th>
              <td>{breed.breed_group || "Not available"}</td>
            </tr>
            <tr>
              <th>Temperament:</th>
              <td>{breed.temperament || "Not available"}</td>
            </tr>
            <tr>
              <th>Origin:</th>
              <td>{breed.origin || "Not available"}</td>
            </tr>
            <tr>
              <th>Height:</th>
              <td>{breed.height.metric} cm</td>
            </tr>
            <tr>
              <th>Weight:</th>
              <td>{breed.weight.metric} kg</td>
            </tr>
            <tr>
              <th>Lifespan:</th>
              <td>{breed.life_span}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleAddToTeam}>Add to Team</button>
      </div>
    </div>
  );
};

export default DogDetail;
