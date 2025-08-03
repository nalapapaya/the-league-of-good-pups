import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BreedPage from "./pages/BreedPage";

function App() {
  return (
    <div className="container">
            <h1> Dog Breed Explorer</h1>
      <hr />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breeds/:id" element={<BreedPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
