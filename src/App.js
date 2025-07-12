import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ControlePedidos from "./pages/ControlePedidos";
import Dashboard from "./pages/Dashboard";
import Mesa from "./pages/Mesa";
import PeDaSerraLanding from "./pages/PeDaSerraLanding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/controle-pedidos" element={<ControlePedidos />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mesa" element={<Mesa />} />
      <Route path="/landing" element={<PeDaSerraLanding />} />
    </Routes>
  );
}

export default App;
