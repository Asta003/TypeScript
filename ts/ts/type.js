class BookItem {
    constructor(title, author, nextId) {
        this.id = nextId;
        this.title = this.cleanText(title);
        this.author = this.cleanText(author);
        this.createdAt = new Date();
    }

    cleanText(text) {
        return text.trim().replace(/\s+/g, ' ');
    }
}

class Library {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }

    add(bookData) {
        if (this.hasDuplicate(bookData.title, bookData.author)) {
            return false;
        }

        const book = new BookItem(bookData.title, bookData.author, this.nextId);
        this.nextId++;
        
        this.items.push(book);
        return true;
    }

    getAll() {
        return [...this.items];
    }

    count() {
        return this.items.length;
    }

    hasDuplicate(title, author) {
        return this.items.some(existing => 
            existing.title.toLowerCase() === title.toLowerCase() &&
            existing.author.toLowerCase() === author.toLowerCase()
        );
    }
}

class BookManager {
    constructor() {
        this.titleField = document.getElementById('bookTitle');
        this.authorField = document.getElementById('bookAuthor');
        this.addBtn = document.getElementById('addBookBtn');
        this.errorBox = document.getElementById('errorMessage');
        this.counterDisplay = document.getElementById('bookCounter');
        this.listContainer = document.getElementById('booksList');
        
        this.storage = new Library();
        
        this.addBtn.onclick = () => this.addNewBook();
        this.refreshList();
    }

    showError(msg) {
        this.errorBox.textContent = msg;
        this.errorBox.style.display = 'block';
        setTimeout(() => {
            this.errorBox.style.display = 'none';
        }, 3000);
    }

    clearForm() {
        this.titleField.value = '';
        this.authorField.value = '';
    }

    refreshList() {
        this.counterDisplay.textContent = this.storage.count().toString();
        this.listContainer.innerHTML = '';
        
        const allBooks = this.storage.getAll();
        for (let book of allBooks) {
            const card = this.createCard(book);
            this.listContainer.appendChild(card);
        }
    }

    createCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h3>${this.escapeHtml(book.title)}</h3>
            <p>Автор: ${this.escapeHtml(book.author)}</p>
            <small>ID: ${book.id}</small>
        `;
        return card;
    }

    escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    addNewBook() {
        const rawTitle = this.titleField.value;
        const rawAuthor = this.authorField.value;
        
        const cleanTitle = rawTitle.trim().replace(/\s+/g, ' ');
        const cleanAuthor = rawAuthor.trim().replace(/\s+/g, ' ');
        
        if (!cleanTitle || !cleanAuthor) {
            this.showError('Заполните все поля');
            return;
        }
        
        if (this.storage.hasDuplicate(cleanTitle, cleanAuthor)) {
            this.showError('Такая книга уже есть в списке');
            return;
        }
        
        const success = this.storage.add({ title: cleanTitle, author: cleanAuthor });
        
        if (success) {
            this.clearForm();
            this.refreshList();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BookManager();
});
