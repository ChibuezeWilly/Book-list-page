// CLASS FOR BOOKS.
class Books {
    constructor (title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}
// CLASS FOR UI
class UI {
    static displayBooks() {
        const storedBook = [
            {   title: "Eloquent JavaScript",
                    author: "Birman Heverbekee",
                    isbn: 12345
            },
            {
                    title: "You don't know JavaScript",
                    author: "Bredan Eich",
                    isbn: 678910
            }
            ]
            let books = storedBook
            books.forEach(book => UI.addBooksToList(book))
    }
    // A HARDCODED BOOK THAT HAS TITLE, AUTHOR, ISBN
    static addBooksToList(book) {
        // CREATE A ROW TO SHOW THE BOOKS WHEN YOU LOAD THE PAGE
        const element = document.createElement('tr');
        element.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><span class="btn btn-danger btn-sm delete">X</span></td>`
            document.getElementById("book-list").appendChild(element)
        }
        // METHOD TO SHOW ALERT 
    static alert(message, color) {
        let successText = document.getElementById("success-test")
        successText.innerText = message
        successText.style.backgroundColor = color

        setTimeout(() => {
        successText.innerText = ''
        successText.style.backgroundColor = ''
        }, 3000);
    }
        // METHOD TO CLEAR INPUT FIELDS
    static clearFields() {
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';
    }
        // METHOD TO REMOVE BOOKS
    static removeBooks(element1) {
        if (element1.target.classList.contains('delete')) {
        if (confirm("Are you sure you want to delete?")) {
                let book = element1.target.parentElement.parentElement;
                document.getElementById("book-list").removeChild(book)
            }
        }
    }
}

    // EVENT TO DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks)
    // EVENT TO ADD BOOKS
document.getElementById("book-form").addEventListener('submit', e => {
    e.preventDefault()
    let inputEl = document.getElementById("title").value;
    let authorEl = document.getElementById("author").value;
    let isbn =  document.getElementById("isbn").value;

    // VALIDATION CHECK
    if (inputEl === '' || authorEl === '' || isbn === '') {
        UI.alert("Input all fields", 'red')
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';
    } else {
        const books = new Books(inputEl, authorEl, isbn)
        UI.addBooksToList(books)
        UI.alert("Book successfully added", 'green')
        UI.clearFields()
        UI.removeBooks()
    }
    }
)
    // EVENT TO REMOVE BOOKS
document.getElementById("book-list").addEventListener('click', UI.removeBooks)

// Event storage
class Store {
    static getBook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static addBook(book) {
        const books = Store.getBook()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = Store.getBook()
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                book.splice(index, 1)
            }
            localStorage.setItem('books', JSON.stringify(books))
        })
    }
}