import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Phone, MapPin, Clock, Star, Plus, Minus } from 'lucide-react';

const PeDaSerraLanding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('lanches');
  const [isScrolled, setIsScrolled] = useState(false);

  const products = {
    lanches: [
      { id: 1, name: 'X-Burger Serra', price: 18.90, description: 'Hambúrguer artesanal, queijo, alface, tomate, cebola', image: '🍔' },
      { id: 2, name: 'X-Bacon Montanha', price: 22.50, description: 'Hambúrguer, bacon, queijo, alface, tomate, maionese', image: '🍔' },
      { id: 3, name: 'X-Salada Premium', price: 20.90, description: 'Hambúrguer, queijo, alface, tomate, cebola, pepino', image: '🍔' },
      { id: 4, name: 'X-Tudo Especial', price: 25.90, description: 'Hambúrguer duplo, bacon, queijo, ovo, salada completa', image: '🍔' }
    ],
    marmitas: [
      { id: 5, name: 'Marmita Tradicional', price: 15.90, description: 'Arroz, feijão, carne, salada, batata frita', image: '🍱' },
      { id: 6, name: 'Marmita Frango', price: 14.90, description: 'Arroz, feijão, frango grelhado, salada, legumes', image: '🍱' },
      { id: 7, name: 'Marmita Peixe', price: 17.90, description: 'Arroz, feijão, peixe assado, salada, farofa', image: '🍱' },
      { id: 8, name: 'Marmita Vegetariana', price: 13.90, description: 'Arroz integral, feijão, legumes refogados, salada', image: '🍱' }
    ],
    porcoes: [
      { id: 9, name: 'Porção Batata Frita', price: 12.90, description: 'Batata frita crocante (500g)', image: '🍟' },
      { id: 10, name: 'Porção Frango à Passarinho', price: 18.90, description: 'Frango temperado e frito (400g)', image: '🍗' },
      { id: 11, name: 'Porção Calabresa', price: 16.90, description: 'Calabresa acebolada (300g)', image: '🌭' },
      { id: 12, name: 'Porção Queijo Coalho', price: 14.90, description: 'Queijo coalho grelhado (250g)', image: '🧀' }
    ],
    bebidas: [
      { id: 13, name: 'Refrigerante Lata', price: 4.50, description: 'Coca-Cola, Pepsi, Guaraná, Fanta', image: '🥤' },
      { id: 14, name: 'Suco Natural', price: 6.90, description: 'Laranja, maracujá, abacaxi, manga', image: '🧃' },
      { id: 15, name: 'Água Mineral', price: 3.50, description: 'Água mineral 500ml', image: '💧' },
      { id: 16, name: 'Cerveja Gelada', price: 5.90, description: 'Skol, Brahma, Heineken', image: '🍺' }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products[activeCategory].filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">🏔️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">PÉ DA SERRA</h1>
                <p className="text-sm text-gray-300">Lanches Artesanais</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Phone size={16} />
                <span className="text-sm">(11) 99811-0650</span>
              </div>
              <div className="relative">
                <ShoppingCart className="text-yellow-400" size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Sabores da Serra
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Lanches artesanais com ingredientes frescos e o melhor tempero da região
            </p>
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <Clock size={20} />
                <span>Seg-Dom: 18h-23h</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <MapPin size={20} />
                <span>Cabreúva - SP</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <Star size={20} />
                <span>4.8/5 Avaliação</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(products).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-yellow-400 text-black shadow-lg'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 text-yellow-400">
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800/70 transition-all duration-300 group">
                <div className="p-6">
                  <div className="text-4xl text-center mb-4">{product.image}</div>
                  <h4 className="text-xl font-semibold mb-2 text-white">{product.name}</h4>
                  <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-400">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      {cart.find(item => item.id === product.id) ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold">
                            {cart.find(item => item.id === product.id)?.quantity || 0}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                        >
                          <Plus size={16} />
                          <span>Adicionar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-yellow-400 text-black p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">Carrinho</span>
            <ShoppingCart size={20} />
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-black/20 pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-yellow-400 py-2 rounded mt-2 hover:bg-gray-800 transition-colors">
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-yellow-400 font-bold text-xl">PÉ DA SERRA</h4>
              <p className="text-gray-400">Lanches Artesanais</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Phone size={16} />
                <span>(11) 99811-0650</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <MapPin size={16} />
                <span>Cabreúva - SP</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-gray-400">
            <p>&copy; 2025 Pé da Serra. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PeDaSerraLanding;
