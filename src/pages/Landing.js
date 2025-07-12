import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

const menu = {
  burgers: [
    {
      id: 1,
      name: "Burger Clássico",
      description: "Pão brioche, carne 150g, queijo e molho especial",
      price: 25.9,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Burger da Serra",
      description: "Carne 180g, cheddar derretido e bacon crocante",
      price: 28.5,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    },
  ],
  bebidas: [
    {
      id: 3,
      name: "Refrigerante",
      description: "Lata 350ml (diversos sabores)",
      price: 6,
      image:
        "https://images.unsplash.com/photo-1580910051073-7dc275d89ff0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Suco Natural",
      description: "Frutas da estação, 300ml",
      price: 8,
      image:
        "https://images.unsplash.com/photo-1532635223-f7c5c112bc33?auto=format&fit=crop&w=600&q=80",
    },
  ],
  sobremesas: [
    {
      id: 5,
      name: "Cheesecake",
      description: "Cobertura de frutas vermelhas",
      price: 14,
      image:
        "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Brownie",
      description: "Com sorvete de creme",
      price: 12,
      image:
        "https://images.unsplash.com/photo-1589308078053-ec1fdf37c229?auto=format&fit=crop&w=600&q=80",
    },
  ],
};

export default function Landing() {
  const categories = [
    { key: "burgers", label: "Burgers" },
    { key: "bebidas", label: "Bebidas" },
    { key: "sobremesas", label: "Sobremesas" },
  ];

  const [active, setActive] = useState("burgers");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const total = cart.reduce((t, i) => t + i.price * i.qty, 0);

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
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600891964373-1ec2bd9d1d9e?auto=format&fit=crop&w=1350&q=80)' }}
      >
        <div className="bg-black bg-opacity-60 p-4 rounded">
          <h1 className="text-3xl font-playfair mb-2">Pé da Serra</h1>
          <p className="text-sm font-light">Sabores que conectam você à natureza</p>
        </div>
      </section>

      <div id="menu" className="sticky top-14 bg-black text-white flex overflow-x-auto no-scrollbar space-x-6 px-4 py-2 justify-center">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`whitespace-nowrap ${active === c.key ? 'text-[#FFD700]' : ''}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {menu[active].map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-playfair text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">R$ {item.price.toFixed(2)}</span>
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
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-64">
          <h4 className="font-playfair mb-2 flex items-center gap-2">
            <ShoppingCart size={18} /> Carrinho
          </h4>
          <ul className="max-h-40 overflow-y-auto text-sm">
            {cart.map((it) => (
              <li key={it.id} className="flex justify-between mb-1">
                <span>{it.qty}x {it.name}</span>
                <span>R$ {(it.price * it.qty).toFixed(2)}</span>
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
      )}

      <footer id="contato" className="mt-16 p-4 text-center text-sm text-gray-600">
        © 2025 Pé da Serra
      </footer>
    </div>
  );
}
