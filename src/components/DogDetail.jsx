//detailed view of dog breed (prop from DogBreeds)
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const dogBreedApiUrl = import.meta.env.VITE_SERVER_DOGBREED;
const dogBreedKey = import.meta.env.VITE_DOGBREED_API_KEY;
import styles from "./DogDetail.module.css";
import { addToTeam } from "../api/airtable";
import Loading from "../assets/Loading";

const DogDetail = ({ team, setTeam }) => {
  const { id } = useParams();
  const [breed, setBreed] = useState(null);
  const [error, setError] = useState(null);
  const [addMsg, setAddMsg] = useState("");

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
    // return <div>Loading...</div>;
    return <Loading />;
  } // stop render until breed available

  // add to team
  const handleAddToTeam = async () => {
    try {
      const newDog = await addToTeam(breed); //PUT airtable
      setTeam((prevState) => [
        ...prevState,
        { airtableId: newDog.id, ...newDog.fields },
      ]);
      setAddMsg("Added to team successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <br />
      <Link className={styles.backBtn} to="/">
        Back
      </Link>
      <div className={styles.detailPageCont}>
        <div className={styles.detailContainer}>
          <h2>{breed.name}</h2>
          <img
            src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
            alt={breed.name}
            style={{ maxWidth: "500px", borderRadius: "15px" }}
          />
          <table className={styles.detailTable}>
            <tbody>
              <tr className={styles.detailTr}>
                <th className={styles.detailTh}>Bred for:</th>
                <td className={styles.detailTd}>
                  {breed.bred_for || "Not available"}
                </td>
              </tr>
              <tr className={styles.detailTr}>
                <th className={styles.detailTh}>Breed Group:</th>
                <td className={styles.detailTd}>
                  {breed.breed_group || "Not available"}
                </td>
              </tr>
              <tr className={styles.detailTr}>
                <th className={styles.detailTh}>Temperament:</th>
                <td className={styles.detailTd}>
                  {breed.temperament || "Not available"}
                </td>
              </tr>
              <tr className={styles.detailTr}>
                <th className={styles.detailTh}>Origin:</th>
                <td className={styles.detailTd}>
                  {breed.origin || "Not available"}
                </td>
              </tr>
              <tr className={styles.detailTr}>
                <th className={styles.detailTh}>Height:</th>
                <td className={styles.detailTd}>{breed.height.metric} cm</td>
              </tr>
              <tr className={styles.detailTr}>
                <th className={styles.detailTh}>Weight:</th>
                <td className={styles.detailTd}>{breed.weight.metric} kg</td>
              </tr>
              <tr className={styles.detailTr}>
                <th className={styles.detailTh}>Lifespan:</th>
                <td className={styles.detailTd}>{breed.life_span}</td>
              </tr>
            </tbody>
          </table>
          {/* reserving space for msg */}
          <span className={styles.addMsg}>
            <div style={{ visibility: addMsg ? "visible" : "hidden" }}> 
              {addMsg || "placeholder"}
            </div>
          </span>
          <button className={styles.addToTeamBtn} onClick={handleAddToTeam}>
            Add to Team
          </button>
        </div>
      </div>
    </>
  );
};

export default DogDetail;
