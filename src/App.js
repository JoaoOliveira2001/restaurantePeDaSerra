import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import OrderForm from "./pages/OrderForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pedido" element={<OrderForm />} />
    </Routes>
  );
}

export default App;
