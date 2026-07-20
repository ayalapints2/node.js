import {
  getAllStudents,
  findStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  registerCourse,
  unregisterCourse,
  getAvailableCourses
} from '../Service/studentService.js';

// GET    /api/students
export function getAll(req, res) {
  res.json(getAllStudents());
}

// GET    /api/students/:id
export function getOne(req, res) {
  const student = findStudent(Number(req.params.id));
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
}

// POST   /api/students
export function create(req, res) {
  const { name, courses } = req.body;
  if (!name) return res.status(400).json({ error: '"name" is required' });
  const student = createStudent(name, courses);
  res.status(201).json(student);
}

// PUT    /api/students/:id
export function update(req, res) {
  const student = updateStudent(Number(req.params.id), req.body);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
}

// DELETE /api/students/:id
export function remove(req, res) {
  const deleted = deleteStudent(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: 'Student not found' });
  res.json({ message: 'Student deleted' });
}

// POST   /api/students/:id/courses
export function register(req, res) {
  const result = registerCourse(Number(req.params.id), req.body.course);
  res.status(result.success ? 201 : result.status).json(result);
}

// DELETE /api/students/:id/courses/:course
export function unregister(req, res) {
  const result = unregisterCourse(Number(req.params.id), req.params.course);
  res.status(result.success ? 200 : result.status).json(result);
}

// ── Courses ──────────────────────────────────────────────

// GET    /api/courses
export function getAllCourses(req, res) {
  res.json(getAvailableCourses());
}
