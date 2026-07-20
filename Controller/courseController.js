import { getAvailableCourses } from '../Service/studentService.js';

// GET /api/courses
export function getAll(req, res) {
  res.json(getAvailableCourses());
}
