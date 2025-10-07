import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const codeSnippets = {
  react: [
    'npm i @vercel/analytics',
    'import { Analytics } from "@vercel/analytics/react"',
    '<Analytics /> // inside your app'
  ],
  vue: [
    'npm i @vercel/analytics-vue',
    'import Analytics from "@vercel/analytics-vue"',
    '<Analytics />'
  ],
};

function Step({ number, title, description, code }) {
  const handleCopy = () => navigator.clipboard.writeText(code);

  return (
    <div className="bg-gray-800 p-6 rounded-lg flex flex-col space-y-4 flex-1">
      <h3 className="text-xl font-semibold text-white">
        <span className="text-green-400 mr-2">{number}</span>
        {title}
      </h3>
      <p className="text-gray-300 flex-1">{description}</p>
      <pre className="bg-gray-900 rounded p-4 text-green-400 font-mono text-sm relative">
        <code>{code}</code>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <Copy size={16} />
        </button>
      </pre>
    </div>
  );
}

export default function InstallGuide() {
  const [tech, setTech] = useState('react');
  const snippets = codeSnippets[tech];

  return (
    <div className="bg-gray-900 text-white py-12 px-4 md:px-8 rounded-xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Começar</h2>
          <p className="text-gray-300 max-w-md">
            Para começar a contar visitantes e visualizações de página, siga estas etapas.
          </p>
        </div>
        <div>
          <select
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-2"
          >
            <option value="react">Reagir</option>
            <option value="vue">Vue</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Step
          number="1"
          title="Instale nosso pacote"
          description="Adicione o pacote às dependências do seu projeto."
          code={snippets[0]}
        />
        <Step
          number="2"
          title="Importe o componente"
          description="Importe o Analytics no arquivo principal." 
          code={snippets[1]}
        />
        <Step
          number="3"
          title="Adicione à sua aplicação"
          description="Coloque o componente dentro do provedor de rotas." 
          code={snippets[2]}
        />
      </div>
    </div>
  );
}


