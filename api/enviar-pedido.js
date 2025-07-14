// api/enviar-pedido.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const pedido = req.body;

    // Webhook para registrar o pedido
    const url =
      "http://145.223.31.139:5678/webhook/bd2cb2de-d81e-429a-8527-3dda5cf315d8";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Erro na resposta do Apps Script:", text);
      return res.status(500).json({
        error: "Erro ao enviar para a planilha",
        details: text,
      });
    }

    res.status(200).json({ message: "Pedido enviado com sucesso" });

  } catch (error) {
    console.error("Erro interno ao enviar pedido:", error);
    res.status(500).json({ error: "Erro interno ao enviar pedido", details: error.message });
  }
}
