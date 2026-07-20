import express from 'express';
import router from './routes.js';

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(router);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
