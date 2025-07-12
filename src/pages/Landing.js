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
    <div className="font-sans bg-gray-100 min-h-screen text-gray-800">
      <header className="fixed top-0 left-0 w-full bg-black text-white shadow z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
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
            <a href="#reservas" className="hover:text-[#FFD700]">Reservas</a>
            <a href="#contato" className="hover:text-[#FFD700]">Contato</a>
          </nav>
          <button className="bg-[#FFD700] text-black px-4 py-2 rounded-full shadow hover:brightness-110">
            Peça agora
          </button>
        </div>
      </header>

      <section
        id="inicio"
        className="h-72 md:h-96 bg-cover bg-center flex items-center justify-center text-white mt-16"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80)' }}
      >
        <h1 className="text-3xl md:text-5xl font-playfair bg-black bg-opacity-60 p-4 rounded">
          Sabores que conectam você à natureza
        </h1>
      </section>

      <div id="menu" className="sticky top-16 bg-black text-white flex overflow-x-auto no-scrollbar space-x-6 px-4 py-2 justify-center">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`whitespace-nowrap font-semibold ${active === c.key ? 'text-[#FFD700]' : ''}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <main className="max-w-5xl mx-auto p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu[active].map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="font-playfair text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">R$ {item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-[#FFD700] text-black px-3 py-1 rounded-full shadow"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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

      <section id="sobre" className="max-w-5xl mx-auto p-4 my-12 flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://images.unsplash.com/photo-1502899576159-f224dc2349ec?auto=format&fit=crop&w=600&q=80"
          alt="Paisagem serrana"
          className="w-full md:w-1/2 rounded-lg shadow"
        />
        <p className="text-gray-700 leading-relaxed">
          O Pé da Serra nasceu para celebrar a culinária regional com um toque de
          sofisticação. Em nosso restaurante, cada prato é preparado com
          ingredientes selecionados e muito carinho.
        </p>
      </section>

      <section id="promocoes" className="bg-black text-[#FFD700] py-8">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <h2 className="font-playfair text-2xl">Promoções</h2>
          <p>Confira nossos pratos do dia e aproveite ofertas especiais!</p>
        </div>
      </section>

      <footer id="contato" className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-lg text-white mb-2">Contato</h3>
            <p>Fone: (11) 99999-9999</p>
            <p>Email: contato@pedaserra.com</p>
          </div>
          <div>
            <h3 className="font-playfair text-lg text-white mb-2">Redes Sociais</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-[#FFD700]">Instagram</a></li>
              <li><a href="#" className="hover:text-[#FFD700]">Facebook</a></li>
            </ul>
          </div>
          <div>
            <iframe
              className="w-full h-32 rounded"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.401176463542!2d-46.660399484475675!3d-23.588503768091687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM1JzE4LjYiUyA0NsKwMzknMzIuMSJX!5e0!3m2!1sen!2sbr!4v1600000000000!5m2!1sen!2sbr"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <p className="mt-8 text-center text-sm">© 2025 Pé da Serra</p>
      </footer>
    </div>
  );
}
