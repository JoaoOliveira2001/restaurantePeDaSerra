export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const url = 'https://script.google.com/macros/s/AKfycbw8sP2L9-3xqkjum6UBdcazZZYabbOMOypuvw27Zlu6rysvnWE2PtfPBxZ3AtcfdP1a/exec';
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      console.error('Erro ao buscar cardápio:', text);
      return res.status(500).json({ error: 'Erro ao obter cardápio', details: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro interno ao buscar cardápio:', error);
    res.status(500).json({ error: 'Erro interno', details: error.message });
  }
}
