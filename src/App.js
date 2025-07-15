import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Logo3D from "./pages/Logo3D";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/logo" element={<Logo3D />} />
    </Routes>
  );
}

export default App;
