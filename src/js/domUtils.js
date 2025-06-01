import { deleteBook } from './bookManager.js';

export function createBookCard(book) {
  const div = document.createElement('div');
  div.className = 'book-card';
  div.innerHTML = `
    <img src="${book.image || 'default-book.jpg'}" alt="${book.title}" class="book-image"/>
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Price: $${book.price}</p>
    <div class="actions">
      <button onclick="location.href='add-book.html?id=${book.id}'">Edit</button>
      <button class="delete-btn" data-id="${book.id}">Delete</button>
    </div>
  `;
  return div;
}
