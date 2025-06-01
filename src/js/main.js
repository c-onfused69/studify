import { getFromStorage } from './storage.js';
import { createBookCard } from './domUtils.js';

const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const bookListContainer = document.getElementById('book-list-container');

let books = getFromStorage('books') || [];

function renderBooks(filteredBooks) {
  bookListContainer.innerHTML = '';
  filteredBooks.forEach(book => {
    const card = createBookCard(book);
    bookListContainer.appendChild(card);
  });
}

function filterAndSortBooks() {
  const searchTerm = searchInput.value.toLowerCase();
  const sortBy = sortSelect.value;

  let filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm)
  );

  if (sortBy === 'name') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'author') {
    filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
  }

  renderBooks(filteredBooks);
}

// Initial render
renderBooks(books);

// Event listeners
searchInput.addEventListener('input', filterAndSortBooks);
sortSelect.addEventListener('change', filterAndSortBooks);

// Handle delete buttons dynamically
bookListContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    books = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
    filterAndSortBooks(); // re-render after delete
  }
});
