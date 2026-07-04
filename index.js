import http from 'http';
   const arr=[
        {name:'cake',
            id:3452,
           Description:'learn to make a cake'
        },
           {name:'playing',
            id:3258,
           Description:'learn to playing to exempl giutar'
        },
             {name:'swiming',
            id:3588,
           Description:'how to swim in the water'
        },     {name:'danc',
            id:3658,
           Description:'to enjoy with the danc and exersis'
        }
    ]
    
const server = http.createServer((req, res) => {
    //בדיקת כתובת
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>שלום! זוהי דוגמת שרת HTTP</h1><p><a href="/about">אודות</a></p>');
  }//אם נכנסנו ל
   else if (req.url === '/about') {

     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
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
     res.end(html);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 — הדף לא נמצא</h1>');
  }
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`השרת רץ — פתח את הדפדפן בכתובת http://localhost:${PORT}`);
});
