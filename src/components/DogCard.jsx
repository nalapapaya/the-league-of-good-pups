//individual dog card for main page (prop from DogBreeds)
import React from "react";
import { useNavigate } from "react-router-dom";

const DogCard = (props) => {
  const nav = useNavigate();

  const handleViewDetails = () => {
    nav(`/breed/${props.id}`);
  };

  return (
    <div className="dog-card">
      {props.image?.url ? (
        <img
          src={props.image.url}
          alt={props.name}
          height="80"
          width="80"
          style={{ borderRadius: "20px" }}
        />
      ) : (
        <div style={{ height: "80px", width: "80px", background: "#eee" }}>
          No Image
        </div>
      )}
      <h3>{props.name}</h3>
      <div>Lifespan: {props.life_span}</div>
      <button onClick={handleViewDetails}>View Details</button>
    </div>
  );
};

export default DogCard;
