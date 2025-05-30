// storage.js
export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
