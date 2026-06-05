export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: 'You are a golf course database. Return ONLY a valid JSON array (no markdown, no explanation) of up to 5 real golf courses matching the search. Each object: {"name":"Full Official Course Name","city":"City","state":"ST"}. If none match, return [].',
        messages: [{ role: 'user', content: 'Search: ' + query }],
      }),
    });

    const data = await response.json();
    const raw = (data.content || []).map(b => b.text || '').join('').trim();
    const clean = raw.replace(/^```[a-z]*\n?/, '').replace(/```$/, '').trim();
    const results = JSON.parse(clean);
    res.status(200).json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
}
