// Middleware לאימות API Key
// רץ לפני כל בקשה נכנסת

const VALID_API_KEYS = ['abc123', 'xyz789'];

function checkApiKey(req, res, next) {
  // לוג — להוכחה שה-middleware רץ בכל קריאה
  console.log(`[AUTH] ${req.method} ${req.originalUrl} — בודק אימות...`);

  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    console.log(`[AUTH] ❌ חסר x-api-key`);
    return res.status(401).json({ error: 'חסר x-api-key — נדרש אימות' });
  }

  if (!VALID_API_KEYS.includes(apiKey)) {
    console.log(`[AUTH] ❌ מפתח לא תקף`);
    return res.status(401).json({ error: 'x-api-key לא תקף' });
  }

  console.log(`[AUTH] ✓ אומת בהצלחה`);
  next();
}

export default checkApiKey;
