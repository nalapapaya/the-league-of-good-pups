//value editor for dog stats
import React, { use, useState, useEffect } from "react";
import { updateDogStats, getTeam } from "../api/airtable";
import styles from "./StatEditor.module.css";

//modifying addtoteam stats
const getAvgFromRange = (value) => {
  if (!value.includes("-")) return value;
  const [low, high] = value.split(" - ").map(Number);
  return String(Math.round((low + high) / 2));
};

const StatEditor = ({
  airtableId,
  existingWeight,
  existingHeight,
  setTeam,
}) => {
  // const [newHeight, setNewHeight] = useState(() => {
  //   if (!existingHeight) return "";
  //   else if (!existingHeight.includes("-")) {
  //   const [low, high] = existingHeight.split("-").map(Number);
  //   return String(Math.round((high + low) / 2))}
  //   else return existingHeight;
  // });

  // const [newWeight, setNewWeight] = useState(() => {
  //   if (!existingWeight || !existingWeight.includes("-")) return "";
  //   const [low, high] = existingWeight.split("-").map(Number);
  //   return Math.round((high + low) / 2);
  // });
  const [newHeight, setNewHeight] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [message, setMessage] = useState("");

  //avg stats on mount
  useEffect(() => {
    if (existingHeight) setNewHeight(getAvgFromRange(existingHeight));
    if (existingWeight) setNewWeight(getAvgFromRange(existingWeight));
  }, [existingHeight, existingWeight]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDogStats(airtableId, {
        height: `${newHeight}`, //airtable accepts string only
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
        <div className={styles.inputWrapper}>
          <label>Height:</label>
          <input
            className={styles.editInput}
            type="text"
            value={newHeight}
            onChange={(event) => setNewHeight(event.target.value)}
          ></input>
          <div>cm</div>
        </div>
        <div className={styles.inputWrapper}>
          <label>Weight:</label>
          <input
            className={styles.editInput}
            type="text"
            value={newWeight}
            onChange={(event) => setNewWeight(event.target.value)}
          ></input>
          <div>kg</div>
        </div>
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
