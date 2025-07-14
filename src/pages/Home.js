import React, { useEffect, useState } from "react";
import PriceButtons from "../components/PriceButtons";
import TabMenu from "../components/TabMenu";
import Cart from "../components/Cart";
import { useCart } from "../components/CartProvider";

export default function Home() {
  const [cardapio, setCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeType, setActiveType] = useState("marmita");
  const [horarios, setHorarios] = useState(null);
  const [allowedCardapio, setAllowedCardapio] = useState(null);

  const { addItem } = useCart();

  // load menu
  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar cardápio");
        return res.json();
      })
      .then((data) => {
        const normalized = data.map((it) => ({
          ...it,
          cardapio: String(it.cardapio ?? it.Cardapio ?? ""),
        }));
        setCardapio(normalized);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  // load schedules
  useEffect(() => {
    fetch(process.env.REACT_APP_HORARIOS_URL)
      .then((res) => res.json())
      .then((data) => setHorarios(data))
      .catch((err) => console.error("erro horarios", err));
  }, []);

  // decide allowed cardapio
  useEffect(() => {
    if (!horarios) return;
    const h = new Date().getHours();
    const { cardapio1, cardapio2 } = horarios;
    let allowed = null;
    if (h >= cardapio1.inicio && h < cardapio1.fim) allowed = "1";
    else if (h >= cardapio2.inicio && h < cardapio2.fim) allowed = "2";
    setAllowedCardapio(String(allowed));
  }, [horarios]);

  const filtered = cardapio.filter(
    (item) => item.type === activeType && item.cardapio === allowedCardapio
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Cardápio</h1>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">Erro ao carregar cardápio.</p>}
      {!loading && !error && (
        <>
          <TabMenu active={activeType} onChange={setActiveType} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <div key={item.id} className="border rounded p-4 bg-white space-y-2">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <PriceButtons price={item.price} item={item} onAdd={addItem} />
              </div>
            ))}
          </div>
        </>
      )}
      <Cart />
    </div>
  );
}
