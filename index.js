import express from 'express';
import router from './routes.js';

const app = express();
const PORT = 3002;

//  שימוש במסלולים מהמודול החיצוני
app.use(router);

// 404
app.use((req, res) => {
  res.status(404).send('<h1>404 — הדף לא נמצא</h1>');
});

app.listen(PORT, () => {
  console.log(`השרת רץ — פתח את הדפדפן בכתובת http://localhost:${PORT}`);
});
