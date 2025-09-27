export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const url = "https://n8n.ynovamarketplace.com/webhook/site";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Erro ao enviar para webhook:", text);
      return res.status(500).json({ error: "Erro ao encaminhar webhook", details: text });
    }

    res.status(200).json({ message: "Webhook encaminhado com sucesso" });
  } catch (error) {
    console.error("Erro interno ao encaminhar webhook:", error);
    res.status(500).json({ error: "Erro interno ao encaminhar webhook", details: error.message });
  }
}
