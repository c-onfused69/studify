// bookManager.js
import { getFromStorage, saveToStorage } from './storage.js';
import { createBookCard } from './domUtils.js';

let currentSearch = '';
let currentSort = '';

const initialBooks = [
  { id: '1', title: 'Atomic Habits', author: 'James Clear', price: 18 },
  { id: '2', title: 'The Alchemist', author: 'Paulo Coelho', price: 12 }
];

export function initializeBooks() {
  if (!getFromStorage('books')) {
    saveToStorage('books', initialBooks);
  }
}

export function renderBooks() {
  let books = getFromStorage('books') || [];

  if (currentSearch) {
    books = books.filter(book =>
      book.title.toLowerCase().includes(currentSearch) ||
      book.author.toLowerCase().includes(currentSearch)
    );
  }

  if (currentSort === 'title') {
    books.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentSort === 'price') {
    books.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  const container = document.getElementById('book-list-container');
  container.innerHTML = '';

  books.forEach(book => {
    const card = createBookCard(book);
    container.appendChild(card);
  });

  attachDeleteEvents();
}

export function deleteBook(id) {
  let books = getFromStorage('books') || [];
  books = books.filter(book => book.id !== id);
  saveToStorage('books', books);
  renderBooks();
}

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const confirmDelete = confirm('Are you sure you want to delete this book?');
      if (confirmDelete) {
        deleteBook(id);
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
