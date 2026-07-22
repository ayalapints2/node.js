import students from '../data/students.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// נתיב לתיקיית data
const dataDir = path.join(__dirname, '..', 'data');

// ניקוי תיקיית data (מחיקת תתי-תיקיות קיימות כדי להתחיל נקי)
if (fs.existsSync(dataDir)) {
  const existing = fs.readdirSync(dataDir);
  existing.forEach(item => {
    const itemPath = path.join(dataDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      fs.rmSync(itemPath, { recursive: true, force: true });
    }
  });
}

students.forEach(student => {
  // תיקייה לכל תלמיד — מחליפים רווחים בקו תחתון
  const studentFolder = student.name.replace(/\s+/g, '_');
  const studentDir = path.join(dataDir, studentFolder);
  fs.mkdirSync(studentDir, { recursive: true });

  console.log(`תיקיית תלמיד: ${studentFolder}`);

  student.courses.forEach(course => {
    // קובץ לכל קורס — מחליפים רווחים בקו תחתון
    const courseFile = course.replace(/\s+/g, '_') + '.js';
    const coursePath = path.join(studentDir, courseFile);

    // תוכן הקובץ
    const content = `// קורס: ${course}
// תלמיד: ${student.name}
// ID תלמיד: ${student.id}

export default {
  course: '${course}',
  student: {
    id: ${student.id},
    name: '${student.name}'
  }
};
`;

    fs.writeFileSync(coursePath, content, 'utf8');
    console.log(`  └── ${courseFile}`);
  });
});

console.log('\n✓ מבנה התיקיות נוצר בהצלחה');
