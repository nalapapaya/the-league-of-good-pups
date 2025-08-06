//View team page
import React from "react";
import TeamView from "../components/TeamView";


const TeamPage = ({ team, setTeam }) => {
  return (
    <div>
      
      <TeamView team={team} setTeam={setTeam} />
    </div>
  );
};

export default TeamPage;
