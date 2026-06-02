"use strict";
class BookItem {
    constructor(title, author) {
        this.id = BookItem.nextId++;
        this.title = title;
        this.author = author;
        this.createdAt = new Date();
    }
    getDisplayString() {
        return `ID: ${this.id} | "${this.title}" | Автор: ${this.author}`;
    }
}
BookItem.nextId = 1;
class BookStorage {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    getBooks() {
        return [...this.books];
    }
    getCount() {
        return this.books.length;
    }
    existsWithSameTitleAndAuthor(title, author) {
        const normalizedTitle = this.normalizeString(title);
        const normalizedAuthor = this.normalizeString(author);
        return this.books.some(book => {
            const bookTitleNorm = this.normalizeString(book.title);
            const bookAuthorNorm = this.normalizeString(book.author);
            return bookTitleNorm === normalizedTitle && bookAuthorNorm === normalizedAuthor;
        });
    }
    normalizeString(str) {
        return str.trim().toLowerCase().replace(/\s+/g, ' ');
    }
}
// ==================== КЛАСС 3: Приложение ====================
class BookApp {
    constructor() {
        this.titleInput = document.getElementById('titleInput');
        this.authorInput = document.getElementById('authorInput');
        this.addButton = document.getElementById('addBookBtn');
        this.errorDiv = document.getElementById('errorMessage');
        this.counterSpan = document.getElementById('bookCounter');
        this.booksContainer = document.getElementById('booksContainer');
        this.storage = new BookStorage();
        this.addButton.addEventListener('click', () => this.handleAddBook());
    }
    normalizeString(str) {
        let trimmed = str.trim();
        trimmed = trimmed.replace(/\s+/g, ' ');
        if (trimmed.length === 0)
            return trimmed;
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    }
    showError(message) {
        this.errorDiv.textContent = message;
        setTimeout(() => {
            if (this.errorDiv.textContent === message) {
                this.errorDiv.textContent = '';
            }
        }, 3000);
    }
    clearInputs() {
        this.titleInput.value = '';
        this.authorInput.value = '';
    }
    renderUI() {
        this.booksContainer.innerHTML = '';
        const books = this.storage.getBooks();
        this.counterSpan.textContent = String(books.length);
        if (books.length === 0) {
            this.booksContainer.innerHTML = '<p> Пока нет добавленных книг.</p>';
            return;
        }
        for (const book of books) {
            const card = document.createElement('div');
            card.style.border = '1px solid #ccc';
            card.style.padding = '10px';
            card.style.marginBottom = '10px';
            const titleElem = document.createElement('h3');
            titleElem.textContent = ` ${book.title}`;
            const authorElem = document.createElement('p');
            authorElem.textContent = ` Автор: ${book.author}`;
            const idElem = document.createElement('small');
            idElem.textContent = ` ID: ${book.id}`;
            card.appendChild(titleElem);
            card.appendChild(authorElem);
            card.appendChild(idElem);
            this.booksContainer.appendChild(card);
        }
    }
    handleAddBook() {
        const normalizedTitle = this.normalizeString(this.titleInput.value);
        const normalizedAuthor = this.normalizeString(this.authorInput.value);
        if (normalizedTitle === '' || normalizedAuthor === '') {
            this.showError('Ошибка: Название и автор не могут быть пустыми!');
            return;
        }
        if (this.storage.existsWithSameTitleAndAuthor(normalizedTitle, normalizedAuthor)) {
            this.showError(` Такая книга уже есть: "${normalizedTitle}" - ${normalizedAuthor}`);
            return;
        }
        const newBook = new BookItem(normalizedTitle, normalizedAuthor);
        this.storage.addBook(newBook);
        this.clearInputs();
        this.renderUI();
        this.errorDiv.style.color = 'green';
        this.errorDiv.textContent = ` Книга добавлена!`;
        setTimeout(() => {
            if (this.errorDiv.textContent === ` Книга добавлена!`) {
                this.errorDiv.textContent = '';
                this.errorDiv.style.color = 'red';
            }
        }, 2000);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new BookApp();
});
