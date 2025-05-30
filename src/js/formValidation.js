// formValidation.js
import { getFromStorage, saveToStorage } from './storage.js';

export function handleFormSubmit(e) {
  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const editingId = urlParams.get('id');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const age = document.getElementById('age').value.trim();

  if (!name || !email || !age) {
    alert('Please fill all fields!');
    return;
  }

  let students = getFromStorage('students') || [];

  if (editingId) {
    // Edit existing student
    students = students.map(student => {
      if (student.id === editingId) {
        return { id: editingId, name, email, age };
      }
      return student;
    });
    alert('Student updated!');
  } else {
    // Add new student
    const newStudent = {
      id: Date.now().toString(),
      name,
      email,
      age
    };
    students.push(newStudent);
    alert('Student added!');
  }

  saveToStorage('students', students);
  window.location.href = 'index.html';
}

export function populateFormIfEditing() {
  const urlParams = new URLSearchParams(window.location.search);
  const editingId = urlParams.get('id');
  if (!editingId) return;

  const students = getFromStorage('students') || [];
  const student = students.find(s => s.id === editingId);
  if (!student) return;

  document.getElementById('name').value = student.name;
  document.getElementById('email').value = student.email;
  document.getElementById('age').value = student.age;
}
