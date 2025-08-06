//value editor for dog stats
import React, { use, useState } from "react";
import { updateDogStats } from "../api/airtable";
import styles from "./StatEditor.module.css";

const StatEditor = ({
  airtableId,
  existingWeight,
  existingHeight,
  existingLifespan,
}) => {
  const [newHeight, setNewHeight] = useState(() => {
    if (!existingHeight || !existingHeight.includes("-")) return "";
    const [low, high] = existingHeight.split("-").map(Number);
    return high - low;
  });
  const [newWeight, setNewWeight] = useState(() => {
    if (!existingWeight || !existingWeight.includes("-")) return "";
    const [low, high] = existingWeight.split("-").map(Number);
    return high - low;
  });
  const [newLifeSpan, setNewLifeSpan] = useState(() => {
    if (!existingLifespan || !existingLifespan.includes("-")) return "";
    const [low, high] = existingLifespan.split("-").map(Number);
    return high - low;
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDogStats(airtableId, { 
        height: String(newHeight), //airtable accepts string only
        weight: String(newWeight),
        life_span: `${newLifeSpan} years`,
      });
      setMessage("Stats updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update.");
    }
  };

  return (
    <div className="statContainer">
      <form onSubmit={handleSubmit}>
        <label>
          Height:
          <input
            type="number"
            value={newHeight}
            onChange={(event) => setNewHeight(event.target.value)}
          ></input>
        </label>
        <label>
          Weight:
          <input
            type="number"
            value={newWeight}
            onChange={(event) => setNewWeight(event.target.value)}
          ></input>
        </label>
        <label>
          Lifespan:
          <input
            type="number"
            value={newLifeSpan}
            onChange={(event) => setNewLifeSpan(event.target.value)}
          ></input>
        </label>
        <button type="submit">Save</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default StatEditor;
