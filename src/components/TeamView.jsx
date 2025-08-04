//my dream dog list (prop from App)
import React, { useState, useEffect } from "react";
import { getTeam, removeFromTeam } from "../api/airtable";
import styles from "./TeamView.module.css";

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
    <div className="container">
      <h2>My Dream Dog Team</h2>
      {error && <div>Error loading team: {error}</div>}
      <ul>
        {team.map((breed) => (
          <li key={breed.airtableId}>
            <img
              src={breed.image_url}
              alt={breed.name}
              className={styles.dogImage}
            />
            <div>{breed.name}</div>
            <div>{breed.life_span}</div>
            <button onClick={() => handleRemove(breed.airtableId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamView;
