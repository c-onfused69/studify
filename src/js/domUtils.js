import { deleteStudent } from './studentManager.js';

// domUtils.js
export function createStudentCard(student) {
  const div = document.createElement('div');
  div.className = 'student-card';
  div.innerHTML = `
    <h3>${student.name}</h3>
    <p>Email: ${student.email}</p>
    <p>Age: ${student.age}</p>
    <div class="actions">
      <button onclick="location.href='add-student.html?id=${student.id}'">Edit</button>
      <button class="delete-btn" data-id="${student.id}">Delete</button>
    </div>
  `;
  return div;
}
