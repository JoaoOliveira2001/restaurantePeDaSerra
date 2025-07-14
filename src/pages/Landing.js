import { useEffect, useState } from 'react';
import PriceButtons from '../components/PriceButtons';
import Cart from '../components/Cart';
import useCart from '../hooks/useCart';

export default function Landing() {
  const [cardapio, setCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeType, setActiveType] = useState('marmita');

  const { items, addItem, total } = useCart();

  useEffect(() => {
    async function fetchMenu() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbw8sP2L9-3xqkjum6UBdcazZZYabbOMOypuvw27Zlu6rysvnWE2PtfPBxZ3AtcfdP1a/exec');
        const data = await res.json();
        const normalized = data.map(it => ({
          ...it,
          cardapio: String(it.cardapio ?? it.Cardapio ?? '')
        }));
        setCardapio(normalized);
      } catch (err) {
        setError('Falha ao carregar cardápio');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // horários stub
  const horarios = {
    cardapio1: { inicio: 0, fim: 14 },
    cardapio2: { inicio: 14, fim: 23 }
  };

  const hour = new Date().getHours();
  const allowedCardapio =
    hour >= horarios.cardapio1.inicio && hour < horarios.cardapio1.fim
      ? '1'
      : '2';

  const filtered = cardapio.filter(
    it => it.type === activeType && it.cardapio === allowedCardapio
  );

  return (
    <div className="landing">
      <h1 className="title">Pé da Serra</h1>
      <div className="tabs">
        {['marmita', 'porcao', 'bebida'].map(tp => (
          <button
            key={tp}
            onClick={() => setActiveType(tp)}
            className={tp === activeType ? 'active' : ''}
          >
            {tp}
          </button>
        ))}
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <div className="grid grid-cols-3">
        {filtered.map(item => (
          <div key={item.id} className="card">
            <img
              src={item.image || 'https://via.placeholder.com/150'}
              alt={item.name}
              className="thumb"
            />
            <h3 className="name">{item.name}</h3>
            <p className="desc">{item.description}</p>
            <span className="time">Tempo: {item.time}</span>
            <PriceButtons price={item.price} item={item} onAdd={addItem} />
          </div>
        ))}
      </div>

      <Cart items={items} total={total} />
    </div>
  );
}
