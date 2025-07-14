import { useState } from 'react';

export default function PriceButtons({ price, item, onAdd }) {
  const [qty, setQty] = useState(1);

  const increment = () => setQty(q => q + 1);
  const decrement = () => setQty(q => (q > 1 ? q - 1 : 1));

  const handleAdd = () => {
    onAdd(item, qty);
    setQty(1);
  };

  return (
    <div className="price-buttons">
      <button onClick={decrement}>-</button>
      <span className="qty">{qty}</span>
      <button onClick={increment}>+</button>
      <button onClick={handleAdd} className="add">Adicionar</button>
      <span className="price">R$ {price.toFixed(2)}</span>
    </div>
  );
}
