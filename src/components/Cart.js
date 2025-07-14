import React from "react";
import { useCart } from "./CartProvider";

export default function Cart() {
  const { items, addItem, removeItem, updateObservations, total } = useCart();

  if (items.length === 0) {
    return <p className="p-4 text-center">Seu carrinho está vazio</p>;
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-bold">Carrinho</h2>
      {items.map((item) => (
        <div key={item.id} className="space-y-1 border-b pb-2 last:border-none">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeItem(item.id)}
                className="px-2 bg-red-500 text-white rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => addItem(item)}
                className="px-2 bg-green-600 text-white rounded"
              >
                +
              </button>
            </div>
          </div>
          <textarea
            className="w-full border rounded p-1 text-sm"
            placeholder="Observações"
            value={item.observations || ""}
            onChange={(e) => updateObservations(item.id, e.target.value)}
          />
        </div>
      ))}
      <div className="font-bold text-right">Total: R$ {total.toFixed(2)}</div>
    </div>
  );
}
