import React from "react";
import { useNavigate } from "react-router-dom";

const ViewTeamBtn = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/team")}>View Team</button>
    </>
  );
};

export default ViewTeamBtn;
