import React from "react";

const produtos = [
  {
    nome: "Porção de Mini Burger",
    descricao: "Composta por 6 sabores: X Burger, X Salada, X Bacon e mais.",
    preco: 59.9,
    imagem: "https://via.placeholder.com/150",
  },
  {
    nome: "Porção de Batata Frita",
    descricao: "Batatas crocantes acompanhadas de molho especial.",
    preco: 25.0,
    imagem: "https://via.placeholder.com/150",
  },
  {
    nome: "Porção de Frango a Passarinho",
    descricao: "Frango temperado e frito, servido com limão.",
    preco: 42.5,
    imagem: "https://via.placeholder.com/150",
  },
];

function Porcoes() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-playfair mb-4">Porções</h1>
      <ul className="divide-y divide-gray-200">
        {produtos.map((item) => (
          <li key={item.nome} className="py-4 flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1 sm:pr-4">
              <h2 className="font-semibold text-lg">{item.nome}</h2>
              <p className="text-sm text-gray-600">{item.descricao}</p>
              <p className="font-semibold mt-2">R$ {item.preco.toFixed(2)}</p>
            </div>
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-28 h-24 object-cover rounded mt-2 sm:mt-0 sm:ml-4"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Porcoes;
