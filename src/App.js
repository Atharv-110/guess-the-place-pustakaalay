import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// import pages
import Menu from "./components/Menu";
import Instruction from "./components/Instruction";
import Level from "./components/Level";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Menu />} />
          <Route exact path="/instruction" element={<Instruction />} />
          <Route exact path="/level" element={<Level />} />
          <Route exact path="/game" element={<Game />} />
          {/* <Route exact path="/summary" element={<Summary />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
