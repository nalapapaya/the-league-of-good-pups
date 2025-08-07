import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ViewTeamBtn.module.css"

const ViewTeamBtn = () => {
  const navigate = useNavigate();

  return (
    <>
      <button className={styles.teamBtn} onClick={() => navigate("/team")}>View Team</button>
    </>
  );
};

export default ViewTeamBtn;
