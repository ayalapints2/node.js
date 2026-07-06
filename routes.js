import { Router } from 'express';
import arr from './data.js';

const router = Router();

//  GET  —  דף הבית
router.get('/', (req, res) => {
  res.send(`
    <h1>שלום! זוהי דוגמת שרת HTTP</h1>
    <p><a href="/about">אודות</a></p>
  `);
});

//  GET  —  דף אודות
router.get('/about', (req, res) => {
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
  const html = `
    <h1 style="font-family: Arial;">רשימת פריטים</h1>
    <ul style="list-style: none; padding: 0; font-family: Arial;">
      ${arr.map((item, i) => `
        <li style="
          background: ${colors[i % colors.length]};
          color: white;
          padding: 12px 16px;
          margin: 8px 0;
          border-radius: 8px;
          font-size: 18px;
        ">
          <strong>${item.name}</strong> (${item.id})<br>
          <span style="font-size: 14px; opacity: 0.9;">${item.Description}</span>
        </li>
      `).join('')}
    </ul>
    <p><a href="/" style="font-family: Arial;">חזרה</a></p>
  `;
  res.send(html);
});

export default router;
