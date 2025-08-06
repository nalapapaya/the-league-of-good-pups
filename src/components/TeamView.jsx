//my dream dog list (prop from App)
import React, { useState, useEffect } from "react";
import { getTeam, removeFromTeam } from "../api/airtable";
import styles from "./TeamView.module.css";
import { Link } from "react-router-dom";
import StatEditor from "./StatEditor";

const TeamView = ({ team, setTeam }) => {
  const [error, setError] = useState(null);

  //get added team
  useEffect(() => {
    const loadTeam = async () => {
      try {
        const teamData = await getTeam();
        setTeam(teamData);
      } catch (error) {
        // console.log("error loading team");
        setError(error.message);
      }
    };

    loadTeam();
  }, []);

  //remove from team
  const handleRemove = async (airtableId) => {
    try {
      await removeFromTeam(airtableId);
      setTeam((prev) => prev.filter((dog) => dog.airtableId !== airtableId));
      // console.log(`${airtableId} deleted from team.`);
    } catch (error) {
      // console.log(`error deleting ${airtableId}`);
      setError(error.message);
    }
  };

  return (
    <div className={styles.teamContainer}>
      <Link className={styles.backToHomeBtn} to="/">
        Back to Home
      </Link>
      <h2>My Dream Dog Team</h2>
      {error && <div>Error loading team: {error}</div>}
      <ul>
        {team.map((breed) => (
          <li key={breed.airtableId}>
            <div>
              <img
                src={breed.image_url}
                alt={breed.name}
                className={styles.dogImage}
              />
            </div>
            <section>
              <div>Name: {breed.name}</div>
              <StatEditor
                airtableId={breed.airtableId}
                existingHeight={breed.height}
                existingWeight={breed.weight}
                setTeam={setTeam}
              />
              <div>Lifespan: {breed.life_span}</div>
            </section>
            <section>
              <div>Temperament: {breed.temperament}</div>
              <div>Bred for: {breed.bred_for || "Not available"}</div>
              <div>Breed Group: {breed.breed_group || "Not available"}</div>
              <div>Origin: {breed.origin || "Not available"}</div>
            </section>
            <button onClick={() => handleRemove(breed.airtableId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {team.length === 0 && <div>No members yet</div>}
    </div>
  );
};

export default TeamView;
