import express from 'express';
import checkApiKey from './Middleware/auth.js';
import studentsRouter from './Router/students.js';
import coursesRouter from './Router/courses.js';

const app = express();
const PORT = 3002;

app.use(express.json());

// Middleware אימות — רץ לפני כל בקשה
app.use(checkApiKey);

// Routes
app.use('/api/students', studentsRouter);
app.use('/api/courses', coursesRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
