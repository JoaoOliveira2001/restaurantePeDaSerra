import React, { useEffect, useState } from "react";

/**
 * Landing page que carrega o cardápio de uma API pública e
 * exibe os itens em seções separadas por tipo.
 */
export default function ApiMenu() {
  const [items, setItems] = useState([]); // itens retornados pela API
  const [status, setStatus] = useState("loading"); // 'loading', 'success' ou 'error'

  useEffect(() => {
    // URL do endpoint público que retorna o cardápio em JSON
    const url =
      "https://script.google.com/macros/s/AKfycbw8sP2L9-3xqkjum6UBdcazZZYabbOMOypuvw27Zlu6rysvnWE2PtfPBxZ3AtcfdP1a/exec";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setStatus("success");
      })
      .catch((err) => {
        console.error("Falha ao carregar cardápio:", err);
        setStatus("error");
      });
  }, []);

  // Agrupa os itens por tipo (lanche, combo, bebida, etc.)
  const grouped = items.reduce((acc, item) => {
    const type = item.type || "outros";
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  if (status === "loading") {
    return <p className="p-6 text-center">Carregando...</p>;
  }

  if (status === "error") {
    return (
      <p className="p-6 text-center text-red-600">
        Não foi possível carregar o cardápio
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {Object.entries(grouped).map(([type, items]) => (
        <section key={type} className="mb-10">
          <h2 className="text-2xl font-playfair mb-4 capitalize">{type}</h2>
          {/* Grid responsivo: 1 coluna no mobile, 3-4 no desktop */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow">
                <img
                  src={item.image || "https://via.placeholder.com/300x200?text=Sem+Imagem"}
                  alt={item.name}
                  className="h-40 w-full object-cover rounded-t-lg"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-700">{item.description}</p>
                  <span className="font-bold block">
                    R$ {Number(item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
