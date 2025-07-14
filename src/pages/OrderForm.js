import React, { useState } from "react";

export default function OrderForm() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pagamento: "dinheiro",
    troco: "",
    observacoes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pedido enviado", form);
    alert("Pedido enviado! Consulte o console para ver os dados.");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Finalizar Pedido</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset>
          <legend className="font-semibold mb-2">Dados do cliente</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome completo"
              required
              className="border p-2 rounded"
            />
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Telefone/WhatsApp"
              required
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="E-mail"
              required
              className="border p-2 rounded md:col-span-2"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-semibold mb-2">Endereço de entrega</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="cep"
              value={form.cep}
              onChange={handleChange}
              placeholder="CEP"
              required
              className="border p-2 rounded"
            />
            <input
              name="rua"
              value={form.rua}
              onChange={handleChange}
              placeholder="Rua / Logradouro"
              required
              className="border p-2 rounded"
            />
            <input
              name="numero"
              value={form.numero}
              onChange={handleChange}
              placeholder="Número"
              required
              className="border p-2 rounded"
            />
            <input
              name="complemento"
              value={form.complemento}
              onChange={handleChange}
              placeholder="Complemento"
              className="border p-2 rounded"
            />
            <input
              name="bairro"
              value={form.bairro}
              onChange={handleChange}
              placeholder="Bairro"
              required
              className="border p-2 rounded"
            />
            <input
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              placeholder="Cidade"
              required
              className="border p-2 rounded"
            />
            <input
              name="estado"
              value={form.estado}
              onChange={handleChange}
              placeholder="Estado"
              required
              className="border p-2 rounded"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-semibold mb-2">Informações do pedido</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="pagamento"
              value={form.pagamento}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão na entrega</option>
              <option value="pix">Pix</option>
            </select>
            {form.pagamento === "dinheiro" && (
              <input
                name="troco"
                value={form.troco}
                onChange={handleChange}
                placeholder="Troco para"
                className="border p-2 rounded"
              />
            )}
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              placeholder="Observações / instruções"
              className="border p-2 rounded md:col-span-2"
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-[#FFD700] text-black px-4 py-2 rounded-full"
        >
          Enviar Pedido
        </button>
      </form>
    </div>
  );
}
