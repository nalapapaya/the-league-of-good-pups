//value editor for dog stats
import React, { useState, useEffect } from "react";
import { updateDogStats, getTeam } from "../api/airtable";
import styles from "./StatEditor.module.css";
import { getAvgFromRange } from "../functions/calculateAvg";

const StatEditor = ({
  airtableId,
  existingWeight,
  existingHeight,
  setTeam,
}) => {
  const [newHeight, setNewHeight] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [message, setMessage] = useState("");

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
        <table className={styles.stateTable}>
          <tbody className={styles.inputWrapper}>
            <tr className={styles.stateTr}>
              <th className={styles.stateTh}>Height:</th>
              <td className={styles.stateTd}>
                <input
                  className={styles.editInput}
                  type="text"
                  value={newHeight}
                  onChange={(event) => setNewHeight(event.target.value)}
                ></input>
                <span style={{ marginLeft: '4px' }}>cm</span>
              </td>
              <th className={styles.stateTh}>Weight:</th>
              <td className={styles.stateTd}>
                <input
                  className={styles.editInput}
                  type="text"
                  value={newWeight}
                  onChange={(event) => setNewWeight(event.target.value)}
                ></input>
                <span style={{ marginLeft: '4px' }}>kg</span>
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
