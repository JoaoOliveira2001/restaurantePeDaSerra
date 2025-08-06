import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Porcoes from "./pages/Porcoes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/porcoes" element={<Porcoes />} />
    </Routes>
  );
}

export default App;
