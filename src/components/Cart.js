export default function Cart({ items, total }) {
  if (!items.length) return null;

  return (
    <div className="cart">
      <h4 className="title">Carrinho</h4>
      <ul className="list">
        {items.map(it => (
          <li key={it.id} className="row">
            <span>{it.qty}x {it.name}</span>
            <span>R$ {(it.price * it.qty).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="row total">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
