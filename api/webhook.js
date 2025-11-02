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
    let data;

    try {
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      data = null;
    }

    if (!response.ok) {
      console.error("Erro ao enviar para webhook:", text);
      return res
        .status(response.status || 500)
        .json({ error: "Erro ao encaminhar webhook", details: text || response.statusText });
    }

    if (
      data &&
      data.code === 0 &&
      typeof data.message === "string" &&
      data.message.toLowerCase().includes("no item to return got found")
    ) {
      console.error("Webhook retornou erro conhecido:", data);
      return res.status(502).json({
        error: "Erro ao encaminhar webhook",
        details: data.message,
        originalResponse: data,
      });
    }

    res.status(200).json({
      message: "Webhook encaminhado com sucesso",
      payload: data ?? text ?? null,
    });
  } catch (error) {
    console.error("Erro interno ao encaminhar webhook:", error);
    res.status(500).json({ error: "Erro interno ao encaminhar webhook", details: error.message });
  }
}
