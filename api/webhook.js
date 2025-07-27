export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const url = "http://93.127.210.229:5678/webhook/1b08915f-8b8b-4769-807c-9ae75ca09257";

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
