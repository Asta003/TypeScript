class BookItem {
    id: string;
    title: string;
    author: string;
    createdAt: Date;

    constructor(title: string, author: string) {
        this.id = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        this.title = this.cleanText(title);
        this.author = this.cleanText(author);
        this.createdAt = new Date();
    }

    private cleanText(text: string): string {
        return text.trim().replace(/\s+/g, ' ');
    }
}

class Library {
    private items: BookItem[] = [];

    add(book: BookItem): boolean {
        if (this.hasDuplicate(book)) {
            return false;
        }
        this.items.push(book);
        return true;
    }

    getAll(): BookItem[] {
        return [...this.items];
    }

    count(): number {
        return this.items.length;
    }

    hasDuplicate(book: BookItem): boolean {
        return this.items.some(existing => 
            existing.title.toLowerCase() === book.title.toLowerCase() &&
            existing.author.toLowerCase() === book.author.toLowerCase()
        );
    }
}
class BookManager {
    private titleField: HTMLInputElement;
    private authorField: HTMLInputElement;
    private addBtn: HTMLButtonElement;
    private errorBox: HTMLElement;
    private counterDisplay: HTMLElement;
    private listContainer: HTMLElement;
    private storage: Library;

    constructor() {
        this.titleField = document.getElementById('bookTitle') as HTMLInputElement;
        this.authorField = document.getElementById('bookAuthor') as HTMLInputElement;
        this.addBtn = document.getElementById('addBookBtn') as HTMLButtonElement;
        this.errorBox = document.getElementById('errorMessage') as HTMLElement;
        this.counterDisplay = document.getElementById('bookCounter') as HTMLElement;
        this.listContainer = document.getElementById('booksList') as HTMLElement;
        
        this.storage = new Library();
        
        this.addBtn.onclick = () => this.addNewBook();
        this.refreshList();
    }

    private showError(msg: string): void {
        this.errorBox.textContent = msg;
        this.errorBox.style.display = 'block';
        setTimeout(() => {
            this.errorBox.style.display = 'none';
        }, 3000);
    }

    private clearForm(): void {
        this.titleField.value = '';
        this.authorField.value = '';
    }

    private refreshList(): void {
        this.counterDisplay.textContent = this.storage.count().toString();
        this.listContainer.innerHTML = '';
        
        const allBooks = this.storage.getAll();
        for (let book of allBooks) {
            const card = this.createCard(book);
            this.listContainer.appendChild(card);
        }
    }

    private createCard(book: BookItem): HTMLDivElement {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h3>${this.escapeHtml(book.title)}</h3>
            <p>Автор: ${this.escapeHtml(book.author)}</p>
            <small>ID: ${book.id}</small>
        `;
        return card;
    }

    private escapeHtml(str: string): string {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    private addNewBook(): void {
        const rawTitle = this.titleField.value;
        const rawAuthor = this.authorField.value;
        
        const cleanTitle = rawTitle.trim().replace(/\s+/g, ' ');
        const cleanAuthor = rawAuthor.trim().replace(/\s+/g, ' ');
        
        if (!cleanTitle || !cleanAuthor) {
            this.showError('Заполните оба поля!');
            return;
        }
        
        const newBook = new BookItem(cleanTitle, cleanAuthor);
        
        if (this.storage.hasDuplicate(newBook)) {
            this.showError('Такая книга уже есть в списке!');
            return;
        }
        
        this.storage.add(newBook);
        this.clearForm();
        this.refreshList();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BookManager();
});