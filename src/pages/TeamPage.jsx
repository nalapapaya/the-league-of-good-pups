//View team page
import React from "react";
import TeamView from "../components/TeamView";
import TeamChart from "../components/TeamChart";
import { getTeam } from "../api/airtable";
import styles from "./TeamPage.module.css"

const TeamPage = ({ team, setTeam }) => {
  return (
    <div className={styles.teamPageCont}>
      <TeamView team={team} setTeam={setTeam} />
      <div>
        <TeamChart team={team} />
      </div>
    </div>
  );
};

export default TeamPage;
