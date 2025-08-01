import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DogBreeds from "./components/DogBreeds";
import DogFacts from "./components/DogFacts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <DogBreeds></DogBreeds>
      <DogFacts></DogFacts>
    </div>
  );
}

export default App;
