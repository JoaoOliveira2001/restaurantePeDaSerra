import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react";

export default function Landing() {
  const categories = [
    { key: "lanche", label: "Lanches" },
    { key: "combo", label: "Combos" },
    { key: "porção", label: "Porções" },
    { key: "bebida", label: "Bebidas" },
  ];

  const [active, setActive] = useState("lanche");
  const [menu, setMenu] = useState({ lanche: [], combo: [], "porção": [], bebida: [] });
  const [cart, setCart] = useState([]);
  const cartRef = useRef(null);

  useEffect(() => {
    fetch('/api/cardapio')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((items) => {
        setMenu({
          lanche: items.filter((i) => i.type === "lanche"),
          combo: items.filter((i) => i.type === "combo"),
          "porção": items.filter((i) => i.type === "porção"),
          bebida: items.filter((i) => i.type === "bebida"),
        });
      })
      .catch(console.error);
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1, obs: "" }];
    });
  };

  const increase = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateObs = (id, text) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, obs: text } : i))
    );
  };

  const total = cart.reduce((t, i) => t + i.price * i.qty, 0);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <header className="relative fixed top-0 left-0 w-full text-white z-50">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
          alt="Montanhas"
          className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm -z-10"
        />
        <div className="relative max-w-4xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=80&q=80"
              alt="Logo Pé da Serra"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-playfair text-xl">Pé da Serra</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#inicio" className="hover:text-[#FFD700]">Início</a>
            <a href="#menu" className="hover:text-[#FFD700]">Cardápio</a>
            <a href="#contato" className="hover:text-[#FFD700]">Contato</a>
          </nav>
        </div>
      </header>

      <section
        id="inicio"
        className="h-60 bg-cover bg-center flex items-center justify-center text-white mt-14"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1600891964373-1ec2bd9d1d9e?auto=format&fit=crop&w=1350&q=80)',
        }}
      >
        <div className="bg-black bg-opacity-60 p-4 rounded">
          <h1 className="text-3xl font-playfair mb-2">Pé da Serra</h1>
          <p className="text-sm font-light">
            Sabores que conectam você à natureza
          </p>
        </div>
      </section>

      <div
        id="menu"
        className="sticky top-14 bg-black text-white flex overflow-x-auto no-scrollbar space-x-6 px-4 py-2 justify-center"
      >
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`whitespace-nowrap ${
              active === c.key ? "text-[#FFD700]" : ""
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <main className="max-w-4xl mx-auto p-4 space-y-4 pt-2">
        {menu[active].map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-playfair text-lg">{item.name}</h3>
              {item.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {item.description}
                </p>
              )}
              <div className="flex justify-between items-center">
                <span className="font-bold">
                  R$ {item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-[#FFD700] text-black px-3 py-1 rounded-full shadow"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {cart.length > 0 && (
        <>
          <button
            onClick={scrollToCart}
            className="fixed bottom-4 right-4 bg-[#FFD700] text-black p-3 rounded-full shadow-lg z-50"
          >
            <ShoppingCart size={20} />
          </button>
          <div
            ref={cartRef}
            className="w-full bg-white shadow-lg p-4 pb-6 mt-4"
          >
            <h4 className="font-playfair mb-2 flex items-center gap-2">
              <ShoppingCart size={18} /> Carrinho
            </h4>
            <ul className="max-h-40 overflow-y-auto text-sm mb-2">
              {cart.map((it) => (
                <li
                  key={it.id}
                  className="mb-2 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{it.name}</span>
                    <div className="flex items-center space-x-1">
                      <button onClick={() => decrease(it.id)} className="p-1">
                        <Minus size={14} />
                      </button>
                      <span>{it.qty}</span>
                      <button onClick={() => increase(it.id)} className="p-1">
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="p-1 text-red-600"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={it.obs}
                    onChange={(e) => updateObs(it.id, e.target.value)}
                    placeholder="Observações"
                    className="mt-1 w-full border rounded px-2 py-1 text-xs"
                  />
                  <div className="text-right text-xs mt-1">
                    R$ {(it.price * it.qty).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button className="mt-2 w-full bg-[#FFD700] text-black py-2 rounded-full">
              Finalizar Pedido
            </button>
          </div>
        </>
      )}

      <footer
        id="contato"
        className="mt-16 p-4 text-center text-sm text-gray-600"
      >
        © 2025 Pé da Serra
      </footer>
    </div>
  );
}
