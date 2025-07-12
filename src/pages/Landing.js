import React from "react";

export default function Landing() {
  return (
    <div className="font-sans">
      <header className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=80&q=80"
              alt="Logo Pé da Serra"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-playfair text-xl">Pé da Serra</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#inicio" className="hover:text-yellow-400">Início</a>
            <a href="#cardapio" className="hover:text-yellow-400">Cardápio</a>
            <a href="#reservas" className="hover:text-yellow-400">Reservas</a>
            <a href="#contato" className="hover:text-yellow-400">Contato</a>
          </nav>
          <a
            href="#reservas"
            className="ml-4 bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500"
          >
            Peça agora
          </a>
        </div>
      </header>

      <section
        id="inicio"
        className="h-screen bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600891964373-1ec2bd9d1d9e?auto=format&fit=crop&w=1350&q=80)' }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded">
          <h1 className="text-5xl font-playfair mb-4">Pé da Serra</h1>
          <p className="text-xl font-light">Sabores que conectam você à natureza</p>
        </div>
      </section>

      <section id="cardapio" className="py-16 bg-gray-100">
        <h2 className="text-3xl font-playfair text-center mb-12">Cardápio</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-4">
          {[
            { title: 'Entradas', img: 'https://images.unsplash.com/photo-1604908176899-b6530bc0b5ef?auto=format&fit=crop&w=400&q=80' },
            { title: 'Pratos principais', img: 'https://images.unsplash.com/photo-1600891964373-1ec2bd9d1d9e?auto=format&fit=crop&w=400&q=80' },
            { title: 'Sobremesas', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80' },
            { title: 'Bebidas', img: 'https://images.unsplash.com/photo-1564758866813-4cac2f9721f0?auto=format&fit=crop&w=400&q=80' },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img src={c.img} alt={c.title} className="h-32 w-full object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-2">{c.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="sobre" className="py-16 max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Paisagem serrana"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-playfair mb-4">Sobre nós</h2>
          <p className="text-gray-700">
            Localizado ao pé da serra, nosso restaurante oferece uma experiência gastronômica que une ingredientes frescos e a tranquilidade da natureza. Venha se conectar conosco!
          </p>
        </div>
      </section>

      <section id="promocoes" className="py-16 bg-black text-yellow-400 text-center">
        <h2 className="text-3xl font-playfair mb-6">Promoções do dia</h2>
        <p>Confira nossas ofertas especiais e pratos selecionados.</p>
      </section>

      <footer id="contato" className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          <div>
            <h3 className="font-playfair text-xl mb-2 text-white">Pé da Serra</h3>
            <p>Cabreúva, SP</p>
            <p>Telefone: (11) 97243-4175</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Redes Sociais</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-yellow-400">Instagram</a></li>
              <li><a href="#" className="hover:text-yellow-400">Facebook</a></li>
              <li><a href="#" className="hover:text-yellow-400">WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Onde Estamos</h4>
            <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-sm">
              Mapa Indisponível
            </div>
          </div>
        </div>
        <p className="text-center text-sm mt-8">© 2025 Pé da Serra. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
