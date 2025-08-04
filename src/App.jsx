import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BreedPage from "./pages/BreedPage";
import TeamView from "./components/TeamView";
import { useState } from "react";

function App() {

  const [team, setTeam] = useState([]);

  return (
    <div className="container">
      <h1> Dog Breed Explorer</h1>
      <hr />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/breeds/:id"
            element={<BreedPage team={team} setTeam={setTeam}/>}
          />
          <Route path="/team" element={<TeamView team={team} setTeam={setTeam}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
