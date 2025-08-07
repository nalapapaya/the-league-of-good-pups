//value editor for dog stats
import React, { useState, useEffect } from "react";
import { updateDogStats, getTeam } from "../api/airtable";
import styles from "./StatEditor.module.css";
import {
  getAvgFromRange,
  calBMI,
  calOptimalBMI,
  calAdjLifespan,
} from "../functions/calculateBMI";

const StatEditor = ({
  airtableId,
  existingWeight,
  existingHeight,
  lifeSpanRange,
  setTeam,
  setAdjLifespan,
}) => {
  const [newHeight, setNewHeight] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [message, setMessage] = useState("");

  const [optimalBMI, setOptimalBMI] = useState(null);
  const [currBMI, setCurrBMI] = useState(null);
  const [optimalLife, setOptimalLife] = useState(null);
  const [adjLocalLifespan, setAdjLocalLifespan] = useState(null);

  // Load average stats from range
  useEffect(() => {
    if (existingHeight) {
      const avgHeight = getAvgFromRange(existingHeight);
      setNewHeight(avgHeight);
    }
    if (existingWeight) {
      const avgWeight = getAvgFromRange(existingWeight);
      setNewWeight(avgWeight);
    }
  }, [existingHeight, existingWeight]);

  // calculate optimal BMI
  useEffect(() => {
    if (existingHeight && existingWeight) {
      const avgHeight = getAvgFromRange(existingHeight);
      const avgWeight = getAvgFromRange(existingWeight);
      const bmi = calOptimalBMI(avgHeight, avgWeight);
      setOptimalBMI(bmi);
    }
  }, [existingHeight, existingWeight]);

  // calculate current BMI when user updates stats
  useEffect(() => {
    if (newHeight && newWeight) {
      const bmi = calBMI(Number(newHeight), Number(newWeight));
      setCurrBMI(bmi);
    }
  }, [newHeight, newWeight]);

  // convert lifespan range to optimal lifespan (use highest)
  useEffect(() => {
    if (lifeSpanRange) {
      if (lifeSpanRange.includes(" - ")) {
        const [low, high] = lifeSpanRange.split(" - ").map((str) => parseFloat(str));
        setOptimalLife(high);
      } else {
        setOptimalLife(parseFloat(lifeSpanRange));
      }
    }
  }, [lifeSpanRange]);

  // alculate adjusted lifespan
  useEffect(() => {
    if (optimalBMI && currBMI && optimalLife) {
      const lifespan = calAdjLifespan(optimalBMI, currBMI, optimalLife);
      setAdjLocalLifespan(lifespan); 
      setAdjLifespan(lifespan);
    }
  }, [optimalBMI, currBMI, optimalLife]);

  // save new stats
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDogStats(airtableId, {
        height: `${newHeight}`,
        weight: `${newWeight}`,
      });
      const teamData = await getTeam();
      setTeam(teamData);
      setMessage("Stats updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update.");
    }
  };

  return (
    <div>
      <form className={styles.statContainer} onSubmit={handleSubmit}>
        <table>
          <tbody className={styles.inputWrapper}>
            <tr>
              <th>Height:</th>
              <td>
                <input
                  className={styles.editInput}
                  type="text"
                  value={newHeight}
                  onChange={(event) => setNewHeight(event.target.value)}
                ></input>
                cm
              </td>
              <th>Weight:</th>
              <td>
                <input
                  className={styles.editInput}
                  type="text"
                  value={newWeight}
                  onChange={(event) => setNewWeight(event.target.value)}
                ></input>
                kg
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button className={styles.editBtn} type="submit">
            Save
          </button>
        </div>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default StatEditor;
