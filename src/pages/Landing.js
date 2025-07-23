import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, Plus, Minus, Trash, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvailabilityNotice from "../components/AvailabilityNotice";
import { checkAvailability } from "../utils/schedule";
import { hasFreeCoca, fetchFreeCocaList } from "../utils/promotions";
import { normalizePhone } from "../utils/phone";
import { fetchSiteStatus } from "../utils/siteStatus";

// 'value' holds a unique key for the option while 'price' stores the fee
const freteOptions = [
  { value: "pinhal", label: "Pinhal – R$ 10,00", price: 10 },
  { value: "vilareijo", label: "Vilareijo – R$ 6,00", price: 6 },
  { value: "condominio", label: "Condominio – R$ 8,00", price: 8 },
  { value: "cururu", label: "Cururu – R$ 7,00", price: 7 },
  { value: "colina", label: "Colina – R$ 4,00", price: 4 },
  { value: "jacare", label: "Jacaré – R$ 5,00", price: 5 },
  { value: "cai", label: "Caí – R$ 10,00", price: 10 },
  { value: "bonfim", label: "Bonfim – R$ 6,00", price: 6 },
  { value: "camping_cabreuva", label: "Camping Cabreúva – R$ 15,00", price: 15 },
  { value: "cabreuva", label: "Cabreúva – R$ 25,00", price: 25 },
  { value: "novo_bonfim", label: "Novo Bonfim – R$ 6,00", price: 6 },
];

export default function Landing() {
  const categories = [
    { key: "lanche", label: "Lanches" },
    { key: "marmita", label: "Marmitas" },
    { key: "combo", label: "Combos" },
    { key: "porção", label: "Porções" },
    { key: "bebida", label: "Bebidas" },
    { key: "outros", label: "Outros" },
  ];

  const [active, setActive] = useState("lanche");
  const activeCategory =
    active === "marmita" ? "marmitas" : active === "lanche" ? "lanches" : null;
  const categoryAvailable = activeCategory
    ? checkAvailability(activeCategory)
    : true;
  const [menu, setMenu] = useState({
    lanche: [],
    marmita: [],
    combo: [],
    porção: [],
    bebida: [],
    outros: [],
  });
  const [cart, setCart] = useState([]);
  const cartRef = useRef(null);
  const formRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [promoPhones, setPromoPhones] = useState([]);
  const [siteEnabled, setSiteEnabled] = useState(true);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    recebimento: "entrega",
    frete: "",
    pagamento: "dinheiro",
    troco: "",
    observacoes: "",
  });

  useEffect(() => {
    fetch("/api/cardapio")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((items) => {
        const normalized = items.map((it) => ({
          ...it,
          price: Number(String(it.price).replace(",", ".")),
        }));
        setMenu({
          lanche: normalized.filter((i) => i.type === "lanche"),
          marmita: normalized.filter((i) => i.type === "marmita"),
          combo: normalized.filter((i) => i.type === "combo"),
          porção: normalized.filter((i) => i.type === "porção"),
          bebida: normalized.filter((i) => i.type === "bebida"),
          outros: normalized.filter((i) => i.type === "outros"),
        });
      })
      .catch(console.error);

    fetchFreeCocaList()
      .then(setPromoPhones)
      .catch((err) => {
        console.error("Falha ao obter promoções:", err);
        setPromoPhones([]);
      });

    fetchSiteStatus()
      .then(setSiteEnabled)
      .catch((err) => {
        console.error("Falha ao obter status do site:", err);
        setSiteEnabled(true);
      });
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1, obs: "" }];
    });
    toast.success(`✅ ${item.name} adicionado ao carrinho`, {
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const increase = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateObs = (id, text) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, obs: text } : i)));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const sendWhatsAppMessage = ({
    nome,
    telefone,
    itensList,
    bebidasList,
    total,
    enderecoMsg,
    frete,
    pagamentoMsg,
    observacoes,
    order,
  }) => {
    const cleanPhone = normalizePhone(telefone);
    const hasPromo = hasFreeCoca(cleanPhone, promoPhones);
    const promoText = hasPromo
      ? "\n\n*Promoção:* Você tem direito a uma Coca Lata grátis!"
      : "";

    const msg =
      `*Cliente:* ${nome}\n` +
      `*Telefone:* ${cleanPhone}\n` +
      `*Endereço:* ${enderecoMsg}\n` +
      `*Valor do frete:* R$ ${frete.toFixed(2)}\n\n` +
      `*Itens:*\n${itensList}` +
      (bebidasList ? `\n\n*Bebidas:*\n${bebidasList}` : "") +
      `\n\n*Pagamento:* ${pagamentoMsg}\n` +
      (observacoes ? `\n*Observações Gerais:*\n${observacoes}\n` : "") +
      `\n*Total:* R$ ${total.toFixed(2)}${promoText}\n`;

    // Mensagem não é mais enviada automaticamente para o WhatsApp.

    fetch("/api/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, order }),
    }).catch((err) => {
      console.error("Falha ao enviar webhook:", err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.recebimento === "entrega" && !form.frete) {
      toast.error("Por favor, selecione o frete para entrega.");
      return;
    }

    const id = Math.random().toString(36).substr(2, 9).toUpperCase();
    const data = new Date().toISOString().split("T")[0];

    const endereco =
      form.recebimento === "entrega"
        ? `${form.rua}, ${form.numero}${
            form.complemento ? " - " + form.complemento : ""
          }, ${form.bairro}`
        : "Retirada no local";

    const produtos = cart
      .map((i) => `${i.name} x${i.qty}${i.obs ? " (" + i.obs + ")" : ""}`)
      .join(", ");

    const itensList = cart
      .filter((i) => i.type !== "bebida")
      .map(
        (i) =>
          `* ${i.name} (${i.qty}x)${i.obs ? ` - Obs: ${i.obs}` : ""} - R$ ${(
            i.price * i.qty
          ).toFixed(2)}`
      )
      .join("\n");

    const bebidasList = cart
      .filter((i) => i.type === "bebida")
      .map(
        (i) =>
          `* ${i.name} (${i.qty}x)${i.obs ? ` - Obs: ${i.obs}` : ""} - R$ ${(
            i.price * i.qty
          ).toFixed(2)}`
      )
      .join("\n");

    const quantidade = cart.reduce((t, i) => t + i.qty, 0);
    const totalItens = cart.reduce((t, i) => t + i.price * i.qty, 0);
    const freteObj = freteOptions.find((f) => f.value === form.frete);
    const frete = freteObj ? freteObj.price : 0;

    const cleanPhone = normalizePhone(form.telefone);
    const pedido = {
      id,
      data,
      nome: form.nome,
      telefone: cleanPhone,
      endereco,
      produtos,
      frete,
      quantidade,
      total: Number((totalItens + frete).toFixed(2)),
      pagamento:
        form.pagamento === "dinheiro" && form.troco
          ? `Dinheiro (troco para ${form.troco})`
          : form.pagamento,
      status: "Pendente",
      observacoes: form.observacoes,
    };

    const pagamentoMsg =
      form.pagamento === "dinheiro" && form.troco
        ? `Dinheiro (troco para ${form.troco})`
        : form.pagamento.charAt(0).toUpperCase() + form.pagamento.slice(1);

    const enderecoMsg = endereco;

    sendWhatsAppMessage({
      nome: form.nome,
      telefone: cleanPhone,
      itensList,
      bebidasList,
      total: totalItens + frete,
      enderecoMsg,
      frete,
      pagamentoMsg,
      observacoes: form.observacoes,
      order: pedido,
    });

    toast.success("Recebemos o seu pedido! Muito obrigado.");
    setCart([]);
    setShowForm(false);

    fetch("/api/enviar-pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Erro ao enviar pedido");
        }
      })
      .catch((err) => {
        console.error("Falha ao enviar pedido:", err);
        toast.error("Erro ao enviar pedido");
      });
  };

  const total = cart.reduce((t, i) => t + i.price * i.qty, 0);

  const openCart = () => {
    setDrawerOpen(true);
  };

  const closeCart = () => {
    setDrawerOpen(false);
  };

  const openForm = () => {
    setDrawerOpen(false);
    setShowForm(true);
    setTimeout(
      () => formRef.current?.scrollIntoView({ behavior: "smooth" }),
      0
    );
  };

  const logoUrl = "https://i.imgur.com/0qfGnRz.jpeg";

  if (!siteEnabled) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-semibold">Loja fechada no momento</h1>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <header className="sticky top-0 w-full text-white z-50 bg-black">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img
              src={logoUrl}
              alt="Logo Pé da Serra"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-playfair text-xl">Pé da Serra</span>
          </div>
          <nav className="hidden md:flex space-x-6"></nav>
        </div>
      </header>

      <section
        id="inicio"
        className="relative h-60 flex items-center justify-center text-white"
      >
        <img
          src="https://i.imgur.com/DbVYSxW.png"
          alt="Serra"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center p-4">
          <img
            src={logoUrl}
            alt="Logo Pé da Serra"
            className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
          />
          <h1 className="text-3xl font-playfair mb-2">Pé da Serra</h1>
          <p className="text-sm font-light">
            Sabores que conectam você à natureza
          </p>
        </div>
      </section>

      <div
        id="menu"
        className="sticky top-16 bg-black text-white flex overflow-x-auto no-scrollbar space-x-6 px-4 py-2 justify-start md:justify-center z-40"
      >
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`whitespace-nowrap ${
              active === c.key ? "text-[#FFD700]" : ""
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <main className="max-w-4xl mx-auto p-4 space-y-4 pt-2">
        <AvailabilityNotice category={activeCategory} />
        {categoryAvailable &&
          menu[active].map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-playfair text-lg">{item.name}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                )}
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

      <ToastContainer position="bottom-right" style={{ bottom: "5rem" }} />

      <button
        onClick={openCart}
        className="fixed bottom-4 right-4 bg-[#FFD700] text-2xl p-3 rounded-full shadow-lg z-50"
      >
        🛒
      </button>

      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />

      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg z-50 transform transition-transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 pb-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-playfair flex items-center gap-2">
              <img
                src={logoUrl}
                alt="Logo Pé da Serra"
                className="w-5 h-5 object-cover rounded-full"
              />
              <ShoppingCart size={18} /> Carrinho
            </h4>
            <button onClick={closeCart} className="p-1">
              <X size={18} />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto text-sm mb-2">
            {cart.length === 0 && (
              <li className="text-center py-8 text-gray-500">Carrinho vazio</li>
            )}
            {cart.map((it) => (
              <li
                key={it.id}
                className="mb-2 border-b pb-2 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{it.name}</span>
                  <div className="flex items-center space-x-1">
                    <button onClick={() => decrease(it.id)} className="p-1">
                      <Minus size={14} />
                    </button>
                    <span>{it.qty}</span>
                    <button onClick={() => increase(it.id)} className="p-1">
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(it.id)}
                      className="p-1 text-red-600"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={it.obs}
                  onChange={(e) => updateObs(it.id, e.target.value)}
                  placeholder="Observações"
                  className="mt-1 w-full border rounded px-2 py-1 text-xs"
                />
                <div className="text-right text-xs mt-1">
                  R$ {(it.price * it.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <div className="flex justify-between font-bold mb-2">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={openForm}
              className="w-full bg-[#FFD700] text-black py-2 rounded-full"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div
          ref={formRef}
          className="max-w-2xl mx-auto p-4 mt-4 bg-white shadow"
        >
          <img
            src={logoUrl}
            alt="Logo Pé da Serra"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-4 text-center">
            Finalizar Pedido
          </h2>
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
              </div>
              <select
                name="recebimento"
                value={form.recebimento}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="entrega">Entrega</option>
                <option value="retirada">Retirada no local</option>
              </select>
            </fieldset>

            {form.recebimento === "entrega" && (
              <fieldset>
                <legend className="font-semibold mb-2">
                  Endereço de entrega
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </fieldset>
            )}

            <fieldset>
              <legend className="font-semibold mb-2">
                Informações do pedido
              </legend>
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
                {form.recebimento === "entrega" && (
                  <select
                    name="frete"
                    value={form.frete}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  >
                    <option value="">Escolha o frete</option>
                    {freteOptions.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
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
              Finalizar Pedido
            </button>
          </form>
        </div>
      )}

      <footer
        id="contato"
        className="mt-16 p-4 text-center text-sm text-gray-600 space-y-1"
      >
        <img
          src={logoUrl}
          alt="Logo Pé da Serra"
          className="w-10 h-10 object-cover rounded-full mx-auto mb-2"
        />
        <p className="font-semibold">Contact</p>
        <p>+55 11 99811-0650</p>
        <p>Cabreúva, SP</p>
        <p className="mt-2">© 2025 Pé da Serra</p>
      </footer>
    </div>
  );
}
