import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BreedPage from "./pages/BreedPage";
import TeamView from "./components/TeamView";
import { useState } from "react";
import ViewTeamBtn from "./components/ViewTeamBtn";
import { Link } from "react-router-dom";

function App() {
  const [team, setTeam] = useState([]);

  return (
    <>
      <div className="container">
        <Link className="homePage" to="/">
          Dog Breed Explorer
        </Link>
        <ViewTeamBtn />
      </div>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/breeds/:id"
          element={<BreedPage team={team} setTeam={setTeam} />}
        />
        <Route
          path="/team"
          element={<TeamView team={team} setTeam={setTeam} />}
        />
      </Routes>
    </>
  );
}

export default App;
