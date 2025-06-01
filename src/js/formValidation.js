// formValidation.js
import { getFromStorage, saveToStorage } from './storage.js';

let imageBase64 = '';

export function handleFormSubmit(e) {
  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const editingId = urlParams.get('id');

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const price = document.getElementById('price').value.trim();

  if (!title || !author || !price) {
    alert('Please fill all fields!');
    return;
  }

  let books = getFromStorage('books') || [];

  if (editingId) {
    // Edit book
    books = books.map(book => {
      if (book.id === editingId) {
        return { id: editingId, title, author, price, image: imageBase64 || book.image || '' };
      }
      return book;
    });
    alert('Book updated!');
  } else {
    // Add new book
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      price,
      image: imageBase64 || ''
    };
    books.push(newBook);
    alert('Book added!');
  }

  saveToStorage('books', books);
  window.location.href = 'index.html';
}

export function populateFormIfEditing() {
  const urlParams = new URLSearchParams(window.location.search);
  const editingId = urlParams.get('id');
  if (!editingId) return;

  const books = getFromStorage('books') || [];
  const book = books.find(b => b.id === editingId);
  if (!book) return;

  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('price').value = book.price;

  if (book.image) {
    imageBase64 = book.image;
    const preview = document.getElementById('preview');
    preview.src = book.image;
    preview.style.display = 'block';
  }
}

// Convert selected image to base64
document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('image');
  const preview = document.getElementById('preview');

  if (imageInput) {
    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imageBase64 = e.target.result;
          preview.src = imageBase64;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
