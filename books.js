let rendered = false
window.addEventListener("DOMContentLoaded", mainFn);

function mainFn() {
    let booksExist = sessionStorage.getItem ("storedBooks")
    let storedBooks = [];
    if (booksExist){
         storedBooks = JSON.parse(sessionStorage.getItem ("storedBooks"));
    }
const switchBook = (book)=>{
    storedBooks = [...storedBooks.filter(bk => {return bk.isbn!==book.isbn}),book]
    
}
    
    class Book {
        constructor(title, author, category) {
            this.title = title;
            this.author = author;
            this.isbn = Math.floor(1000 + Math.random() * 9000);;
            this.category = category;
            this.borrowedBy = "";
            this.borrowed = false;
            this.available = true;
            this.borrowThis = function (userId) {
                this.borrowedBy = userId;
                this.borrowed = true;
                this.available = false;
            }
            this.returnThis = function () {
                this.borrowedBy = "";
                this.borrowed = false;
                this.available = true;
            }
        }
    }
    //end Book
    class UI {
        static addBook(book) {
           console.log("book is", book)
           if (!storedBooks.includes(book)){

               storedBooks.push(book);
               sessionStorage.setItem("storedBooks", JSON.stringify(storedBooks))
           }
            const books = storedBooks;

            const booklist = document.querySelector("#book-list");
            books.forEach(book => {
                const row = document.createElement("tr");
                row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.category}</td>
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
const defaultBooks = [
    {   title: 'Understanding Mathematics',
        author: 'James Kater',
        category: 'Mathematics'
    },
    {
        title: 'Javascript for dummies',
        author: 'Ron Wesely',
        category: 'Programming'
    },
    {
        title: 'Trails',
        author: 'Peterson Nails',
        category: 'Fiction'
    },{
        title: 'Learning Process',
        author: 'Knowells Marknon',
        category: 'Mathematics'
    }
]

const loadDefault = () =>{
    if (rendered){
        return
    }
    rendered = true 
    if (!booksExist) {
        console.log(101)
        defaultBooks.forEach((book)=>{
            let bk = new Book(book.title, book.author, book.category)
            UI.addBook(bk)
        })
    }
    else {
        console.log(108)
        storedBooks.forEach((book)=>{
            let bk = new Book(book.title, book.author, book.category)
            UI.addBook(bk)
        })
    }
}
    window.addEventListener("DOMContentLoaded", loadDefault());

    document.querySelector(".my-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const category = document.querySelector("#category").value;

        if (title === '' || author === '' || category === '') {
            UI.showAlert("Please fill all fields", "danger");
        } else {
            const book = new Book(title, author, category);

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