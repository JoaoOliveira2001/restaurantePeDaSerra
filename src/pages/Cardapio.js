import React, { useEffect, useState } from 'react';

export default function Cardapio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/cardapio');
        if (!res.ok) throw new Error('Erro ao buscar card\u00e1pio');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const grouped = items.reduce((acc, item) => {
    const t = item.type || 'outros';
    (acc[t] = acc[t] || []).push(item);
    return acc;
  }, {});

  const formatPrice = (value) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      value,
    );

  if (loading) {
    return (
      <div className="text-center py-8">Carregando...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        N\u00e3o foi poss\u00edvel carregar o card\u00e1pio.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="text-center py-4 bg-[#5d3d29] text-white shadow-md">
        <h1 className="text-2xl font-bold">Card\u00e1pio - P\u00e9 da Serra</h1>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-8">
        {Object.entries(grouped).map(([type, list]) => (
          <section key={type}>
            <h2 className="text-xl font-bold mb-4 text-[#5d3d29]">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {list.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow flex flex-col"
                >
                  <div className="h-40 w-full overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                        Sem imagem
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 flex-1">{item.description}</p>
                    <span className="font-bold mt-2">{formatPrice(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
