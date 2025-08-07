//my dream dog list (prop from App)
import React, { useState, useEffect } from "react";
import { getTeam, removeFromTeam } from "../api/airtable";
import styles from "./TeamView.module.css";
import { Link } from "react-router-dom";
import StatEditor from "./StatEditor";

const TeamView = ({ team, setTeam }) => {
  const [error, setError] = useState(null);
  const [adjustedLifespans, setAdjustedLifespans] = useState({});

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
      <h2>Dream Pack</h2>
      {error && <div>Error loading team: {error}</div>}
      <ul>
        {team.map((breed) => (
          <li key={breed.airtableId}>
            <div>
              <img
                src={breed.image_url}
                alt={breed.name}
                height="120"
                width="140"
                style={{
                  borderRadius: "20px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>
            <section className={styles.infoSection}>
              <table>
                <tbody>
                  <tr>
                    <th>Name: </th>
                    <td>{breed.name}</td>
                    <th>Bred for:</th>
                    <td>{breed.bred_for || "Not available"}</td>
                  </tr>
                  <tr>
                    <th>Lifespan:</th>
                    <td>{breed.life_span}</td>
                    <th className={styles.breedGroup}>Breed Group: </th>
                    <td>{breed.breed_group || "Not available"}</td>
                  </tr>
                  <tr>
                    <th>Origin:</th>
                    <td colSpan="3">{breed.origin || "Not available"}</td>
                  </tr>
                  <tr>
                    <th>Temperament: </th>
                    <td colSpan="3">{breed.temperament}</td>
                  </tr>
                </tbody>
              </table>
              <StatEditor
                airtableId={breed.airtableId}
                existingHeight={breed.height}
                existingWeight={breed.weight}
                lifeSpanRange={breed.life_span}
                setTeam={setTeam}
                setAdjLifespan={(lifespan) =>
                  setAdjustedLifespans((prev) => ({
                    ...prev,
                    [breed.airtableId]: lifespan,
                  }))
                }
              />
              <button onClick={() => handleRemove(breed.airtableId)}>
                Remove
              </button>
            </section>
          </li>
        ))}
      </ul>
      {team.length === 0 && <div>No members yet</div>}
    </div>
  );
};

export default TeamView;
