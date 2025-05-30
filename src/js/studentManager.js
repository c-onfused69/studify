// studentManager.js
import { getFromStorage, saveToStorage } from './storage.js';
import { createStudentCard } from './domUtils.js';

let currentSearch = '';
let currentSort = '';

const initialStudents = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 21 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 22 }
];

// Initialize localStorage with initial students if empty
export function initializeStudents() {
  if (!getFromStorage('students')) {
    saveToStorage('students', initialStudents);
  }
}

export function renderStudents() {
  let students = getFromStorage('students') || [];

  // Filter by search
  if (currentSearch) {
    students = students.filter(student =>
      student.name.toLowerCase().includes(currentSearch) ||
      student.email.toLowerCase().includes(currentSearch)
    );
  }

  // Sort
  if (currentSort === 'name') {
    students.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === 'age') {
    students.sort((a, b) => parseInt(a.age) - parseInt(b.age));
  }

  const container = document.getElementById('student-list-container');
  container.innerHTML = '';

  students.forEach(student => {
    const card = createStudentCard(student);
    container.appendChild(card);
  });

  attachDeleteEvents();
}

export function deleteStudent(id) {
  let students = getFromStorage('students') || [];
  students = students.filter(student => student.id !== id);
  saveToStorage('students', students);
  renderStudents();
}

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const confirmDelete = confirm('Are you sure you want to delete this student?');
      if (confirmDelete) {
        deleteStudent(id);
      }
    });
  });
}

export function setSearchTerm(term) {
  currentSearch = term.toLowerCase();
}

export function setSortTerm(term) {
  currentSort = term;
}
