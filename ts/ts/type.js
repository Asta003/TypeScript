"use strict";

class Book {
    id;
    title;
    author;
    createdAt;
    constructor(title, author) {
        this.id = this.generateId();
        this.title = this.normalizeString(title);
        this.author = this.normalizeString(author);
        this.createdAt = new Date();
    }
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    normalizeString(str) {
        return str.trim().replace(/\s+/g, ' ');
    }
    getInfo() {
        return `${this.title} — ${this.author}`;
    }
}

class BookStorage {
    books = [];
    addBook(book) {
        if (this.isDuplicate(book)) {
            return false;
        }
        this.books.push(book);
        return true;
    }
    getAllBooks() {
        return [...this.books];
    }
    getCount() {
        return this.books.length;
    }
    isDuplicate(book) {
        return this.books.some((existingBook) => existingBook.title.toLowerCase() === book.title.toLowerCase() &&
            existingBook.author.toLowerCase() === book.author.toLowerCase());
    }
}

class BookApp {
    titleInput;
    authorInput;
    addButton;
    errorBlock;
    counterSpan;
    booksContainer;
    storage;
    constructor() {
        this.titleInput = document.getElementById('bookTitle');
        this.authorInput = document.getElementById('bookAuthor');
        this.addButton = document.getElementById('addBookBtn');
        this.errorBlock = document.getElementById('errorMessage');
        this.counterSpan = document.getElementById('bookCounter');
        this.booksContainer = document.getElementById('booksList');
        this.storage = new BookStorage();
        this.init();
    }
    init() {
        this.addButton.addEventListener('click', () => {
            this.handleAddBook();
        });
        this.render();
    }
    normalizeString(str) {
        return str.trim().replace(/\s+/g, ' ');
    }
    showError(message) {
        this.errorBlock.textContent = message;
        this.errorBlock.style.display = 'block';
        setTimeout(() => {
            this.errorBlock.style.display = 'none';
        }, 3000);
    }
    clearInputs() {
        this.titleInput.value = '';
        this.authorInput.value = '';
    }
    validateInputs(title, author) {
        if (!title || !author) {
            this.showError('Пожалуйста, заполните оба поля: название и автор.');
            return false;
        }
        return true;
    }
    render() {
        this.counterSpan.textContent = this.storage.getCount().toString();
        this.booksContainer.innerHTML = '';
        const allBooks = this.storage.getAllBooks();
        allBooks.forEach((book) => {
            const card = this.createBookCard(book);
            this.booksContainer.appendChild(card);
        });
    }
    createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        const titleElem = document.createElement('h3');
        titleElem.textContent = book.title;
        const authorElem = document.createElement('p');
        authorElem.textContent = `Автор: ${book.author}`;
        const idElem = document.createElement('small');
        idElem.textContent = `ID: ${book.id}`;
        card.appendChild(titleElem);
        card.appendChild(authorElem);
        card.appendChild(idElem);
        return card;
    }
    handleAddBook() {
        const rawTitle = this.titleInput.value;
        const rawAuthor = this.authorInput.value;
        const title = this.normalizeString(rawTitle);
        const author = this.normalizeString(rawAuthor);
        if (!this.validateInputs(title, author)) {
            return;
        }
        const newBook = new Book(title, author);
        if (this.storage.isDuplicate(newBook)) {
            this.showError('Такая книга уже есть в списке!');
            return;
        }
        const added = this.storage.addBook(newBook);
        if (added) {
            this.clearInputs();
            this.render();
        }
        else {
            this.showError('Не удалось добавить книгу.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BookApp();
});
