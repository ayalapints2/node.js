import { Router } from 'express';
import { students, availableCourses } from './data.js';

const router = Router();

// ── helper: find student or send 404 ──────────────────────────
function findStudent(req, res) {
  const student = students.find(s => s.id === Number(req.params.id));
  if (!student) {
    res.status(404).json({ error: 'Student not found' });
    return null;
  }
  return student;
}

// ── GET  /                     — home page ────────────────────
router.get('/', (req, res) => {
  res.send(`
    <h1>Students API</h1>
    <p>Visit <a href="/api/students">/api/students</a> for the student list (JSON).</p>
  `);
});

// ══════════════════ STUDENTS CRUD ══════════════════════════════

// GET    /api/students          — list all
router.get('/api/students', (req, res) => {
  res.json(students);
});

// GET    /api/students/:id      — get one
router.get('/api/students/:id', (req, res) => {
  const student = findStudent(req, res);
  if (!student) return;
  res.json(student);
});

// POST   /api/students          — create
router.post('/api/students', (req, res) => {
  const { name, courses } = req.body;
  if (!name) {
    return res.status(400).json({ error: '"name" is required' });
  }
  const newStudent = {
    id: Date.now(),
    name,
    courses: courses || []
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT    /api/students/:id      — update
router.put('/api/students/:id', (req, res) => {
  const student = findStudent(req, res);
  if (!student) return;

  const { name, courses } = req.body;
  if (name !== undefined) student.name = name;
  if (courses !== undefined) student.courses = courses;

  res.json(student);
});

// DELETE /api/students/:id      — delete
router.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }
  students.splice(index, 1);
  res.json({ message: 'Student deleted' });
});

// ══════════════════ COURSES ════════════════════════════════════

// GET    /api/courses           — list available courses
router.get('/api/courses', (req, res) => {
  res.json(availableCourses);
});

// POST   /api/students/:id/courses     — register for a course
router.post('/api/students/:id/courses', (req, res) => {
  const student = findStudent(req, res);
  if (!student) return;

  const { course } = req.body;
  if (!course) {
    return res.status(400).json({ error: '"course" is required' });
  }
  if (!availableCourses.includes(course)) {
    return res.status(400).json({
      error: `"${course}" is not an available course`,
      availableCourses
    });
  }
  if (student.courses.includes(course)) {
    return res.status(409).json({ error: `Already registered for "${course}"` });
  }

  student.courses.push(course);
  res.status(201).json({ message: `Registered for "${course}"`, student });
});

// DELETE /api/students/:id/courses/:course  — unregister
router.delete('/api/students/:id/courses/:course', (req, res) => {
  const student = findStudent(req, res);
  if (!student) return;

  const { course } = req.params;
  const index = student.courses.indexOf(course);
  if (index === -1) {
    return res.status(404).json({ error: `Student is not registered for "${course}"` });
  }

  student.courses.splice(index, 1);
  res.json({ message: `Unregistered from "${course}"`, student });
});

export default router;
