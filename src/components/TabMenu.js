import React from "react";

const tabs = [
  { key: "marmita", label: "Marmitas" },
  { key: "porcao", label: "Porções" },
  { key: "bebida", label: "Bebidas" },
];

export default function TabMenu({ active, onChange }) {
  return (
    <div className="flex justify-center my-4 space-x-4">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-4 py-2 rounded-full font-semibold ${active === t.key ? "bg-[#5d3d29] text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
