// add.js
import { handleFormSubmit, populateFormIfEditing } from './formValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  populateFormIfEditing();
  const form = document.getElementById('bookForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
