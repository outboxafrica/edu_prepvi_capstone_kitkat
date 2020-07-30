window.addEventListener("DOMContentLoaded", mainFn);

function mainFn() {
    // const style = document.querySelector("i");
    //console.log(getComputedStyle(style).color);
    class Book {
        constructor(title, author, isbn) {
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }
    //end Book
    class UI {
        static addBook(book) {
            const storedBooks = [

            ];
            storedBooks.push(book);
            const books = storedBooks;

            const booklist = document.querySelector("#book-list");
            books.forEach(book => {
                const row = document.createElement("tr");
                row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><span class="delete close"> &times;</span></td>
        `;
                booklist.appendChild(row);
            });
        }

        static showAlert(msg, className) {
            const form = document.querySelector(".my-form");
            const container = document.querySelector(".form-container");
            const div = document.createElement("div");
            div.textContent = msg;
            div.className = `alert alert-${className}`;
            container.insertBefore(div, form);

            setTimeout(() => document.querySelector(".alert").remove(), 1000)
        }

        static clearFields() {
            document.querySelector("#title").value = '';
            document.querySelector("#author").value = '';
            document.querySelector("#isbn").value = '';
        }
        static removeBook(target) {
            target.parentElement.parentElement.remove();
            UI.showAlert("Book Deleted!!", "warning");
        }

    }
    //end UI

    window.addEventListener("DOMContentLoaded", UI.addBook({
        title: 'Understanding Mathematics',
        author: 'James Kater',
        isbn: "121"
    }));
    window.addEventListener("DOMContentLoaded", UI.addBook({
        title: 'Understanding Physics',
        author: 'Bob Marley',
        isbn: "122"
    }));
    window.addEventListener("DOMContentLoaded", UI.addBook({
        title: 'Javascript for dummies',
        author: 'Ron Wesely',
        isbn: "123"
    }));
    window.addEventListener("DOMContentLoaded", UI.addBook({
        title: 'Trails',
        author: 'Peterson Nails',
        isbn: "124"
    }));
    window.addEventListener("DOMContentLoaded", UI.addBook({
        title: 'learning Process',
        author: 'Knowells Marknon',
        isbn: "125"
    }));


    document.querySelector(".my-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const isbn = document.querySelector("#isbn").value;

        if (title === '' || author === '' || isbn === '') {
            UI.showAlert("Please fill all fields", "danger");
        } else {
            const book = new Book(title, author, isbn);

            UI.addBook(book);

            UI.showAlert("Book Successfully Added", "success");
            UI.clearFields();
        }

    });

    document.querySelector("#book-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            UI.removeBook(e.target);
        }
    })



}