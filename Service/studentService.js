import students from '../data/students.js';
import availableCourses from '../data/courses.js';

// ── Student CRUD ────────────────────────────────────────────

export function findStudent(id) {
  const student = students.find(s => s.id === id);
  return student || null;
}

export function getAllStudents() {
  return students;
}

export function createStudent(name, courses = []) {
  const newStudent = { id: Date.now(), name, courses };
  students.push(newStudent);
  return newStudent;
}

export function updateStudent(id, { name, courses }) {
  const student = findStudent(id);
  if (!student) return null;

  if (name !== undefined) student.name = name;
  if (courses !== undefined) student.courses = courses;

  return student;
}

export function deleteStudent(id) {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return false;

  students.splice(index, 1);
  return true;
}

// ── Course registration ─────────────────────────────────────

export function registerCourse(studentId, courseName) {
  const student = findStudent(studentId);
  if (!student) return { success: false, status: 404, error: 'Student not found' };

  if (!courseName) return { success: false, status: 400, error: '"course" is required' };

  if (!availableCourses.includes(courseName)) {
    return { success: false, status: 400, error: `"${courseName}" is not an available course`, availableCourses };
  }

  if (student.courses.includes(courseName)) {
    return { success: false, status: 409, error: `Already registered for "${courseName}"` };
  }

  student.courses.push(courseName);
  return { success: true, student };
}

export function unregisterCourse(studentId, courseName) {
  const student = findStudent(studentId);
  if (!student) return { success: false, status: 404, error: 'Student not found' };

  const index = student.courses.indexOf(courseName);
  if (index === -1) {
    return { success: false, status: 404, error: `Student is not registered for "${courseName}"` };
  }

  student.courses.splice(index, 1);
  return { success: true, student };
}

// ── Courses ──────────────────────────────────────────────────

export function getAvailableCourses() {
  return availableCourses;
}
