//individual dog card for main page (prop from DogBreeds)
import React from "react";
import { useNavigate } from "react-router-dom";

const DogCard = (props) => {
  const nav = useNavigate();

  const handleViewDetails = () => {
    nav(`/breeds/${props.id}`);
  };

  return (
    <div className="dog-card">
      {props.image?.url ? ( //checks if img exists before accessing url
        <img
          src={props.image.url}
          alt={props.name}
          height="150"
          width="200"
          style={{ borderRadius: "20px", objectFit: "cover", objectPosition: "top"}}
        />
      ) : (
        <div style={{ height: "150px", width: "200px", background: "#eee" }}>
          No Image
        </div>
      )}
      <h3>{props.name}</h3>
      <div>Lifespan: {props.life_span}</div>
      <button onClick={handleViewDetails} style={{margin: "20px"}}>View Details</button>
    </div>
  );
};

export default DogCard;
