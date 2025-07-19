export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: 'Cupom não informado' });
  }

  try {
    const url = `https://script.google.com/macros/s/AKfycbzkUEc8W0n7fgUQ5raLNyIZ03dT9S63ZrZUvrbEg2gZbwcBkPlutCJhuFnpvuSX4EKi/exec?cupom=${encodeURIComponent(code)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();

    const valid = Array.isArray(data) && data.some((r) => {
      const cupom = String(r.Cupom || '').toUpperCase();
      const diff = Number(r.diffDays || 0);
      return cupom === code.toUpperCase() && diff >= 0;
    });

    res.status(200).json({ valid });
  } catch (err) {
    console.error('API /verificar-cupom error:', err);
    res.status(500).json({ error: 'Erro ao validar cupom' });
  }
}
