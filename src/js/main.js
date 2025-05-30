// main.js
import { initializeStudents, renderStudents, setSearchTerm, setSortTerm } from './studentManager.js';
import { handleFormSubmit, populateFormIfEditing } from './formValidation.js';

// Initialize sample data if localStorage empty
initializeStudents();

if (document.querySelector('#student-list-container')) {
  renderStudents();

  // Search input event
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      setSearchTerm(e.target.value);
      renderStudents();
    });
  }

  // Sort select event
  const sortSelect = document.getElementById('sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      setSortTerm(e.target.value);
      renderStudents();
    });
  }
}

if (document.querySelector('#student-form')) {
  populateFormIfEditing();
  document.querySelector('#student-form').addEventListener('submit', handleFormSubmit);
}
