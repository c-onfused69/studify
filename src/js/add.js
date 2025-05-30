// add.js
import { handleFormSubmit, populateFormIfEditing } from './formValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  populateFormIfEditing();
  const form = document.getElementById('studentForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
