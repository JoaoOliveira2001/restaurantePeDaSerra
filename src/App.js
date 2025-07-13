import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import ControlePedidos from "./pages/ControlePedidos";
import Dashboard from "./pages/Dashboard";
import Mesa from "./pages/Mesa";
import Cardapio from "./pages/Cardapio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pedido" element={<Home />} />
      <Route path="/controle-pedidos" element={<ControlePedidos />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mesa" element={<Mesa />} />
      <Route path="/cardapio" element={<Cardapio />} />
    </Routes>
  );
}

export default App;
