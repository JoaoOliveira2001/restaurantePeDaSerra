// /api/cardapio.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const scriptUrl =
      'https://script.google.com/macros/s/AKfycbw8sP2L9-3xqkjum6UBdcazZZYabbOMOypuvw27Zlu6rysvnWE2PtfPBxZ3AtcfdP1a/exec'
    const response = await fetch(scriptUrl)
    if (!response.ok) throw new Error(`Erro ao buscar cardápio: ${response.status}`)
    const items = await response.json()
    return res.status(200).json(items)
  } catch (err) {
    console.error('API /cardapio error:', err)
    return res.status(500).json({ error: err.message })
  }
}
