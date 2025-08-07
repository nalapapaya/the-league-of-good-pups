import React, { useState, useEffect } from "react";
import styles from "./DogFacts.module.css";

const dogFactsURL = import.meta.env.VITE_SERVER_DOGFACTS;

const DogFacts = () => {
  const [facts, setFacts] = useState([]);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getFacts = async () => {
    try {
      const res = await fetch(dogFactsURL + "facts");
      if (res.ok) {
        const data = await res.json();
        setFacts(data.data); // data.data contains the array of facts
        setShowPopup(true);
      } else {
        setError("Failed to fetch dog facts.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const hasSeenFact = sessionStorage.getItem("hasSeenFact");
    if (!hasSeenFact) {
      getFacts();
      sessionStorage.setItem("hasSeenFact", "true");
    }
  }, []);

  const closePopup = () => setShowPopup(false);
  if (error) return <div>Error loading dog facts: {error}</div>;
  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.popupCont}>
        <h2 className={styles.factH2}>Woof Fact</h2>
        <h3 className={styles.factH3}>Did you know?</h3>
        {facts.length > 0 ? (
          <div>{facts[0].attributes.body}</div>
        ) : (
          <div style={{ fontStyle: "italic", color: "#888" }}>
            No fact found.
          </div>
        )}
        <div className={styles.factBtnCont}>
          <button className={styles.factBtn}
            onClick={closePopup}>
            I know it now!
          </button>
          <button
          className={styles.factBtn}
            onClick={closePopup}>
            Of course i do!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DogFacts;
