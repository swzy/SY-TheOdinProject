let myLibrary = [
    new Book('Test Book','Brian S.',100,'Read'),
    new Book('Another Book', 'Anonymous', 456, 'Not Read')
];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.markAsRead = function() {
    console.log("Prototype function was clicked.");
    //Book.isRead = 'Read';
}

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    update_Library(myLibrary.length - 1);

    console.log(`New book with title: ${newBook.title} has been added to the library!`)
}

// Fires once when page loads
function initial_displayLibrary() {
    update_Library(0);
}

// Responsible for appending books to library
function update_Library(index) {
    let library_table = document.getElementById('library_table')

    for(let i = index; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let book_details = [];
        book_details.push(book.title);
        book_details.push(book.author);
        book_details.push(book.pages);
        book_details.push(book.isRead);

        let new_book_row = document.createElement('tr');
        new_book_row.setAttribute('id', `${book.title}:${book.author}`);

        for(let i = 0; i < book_details.length; i++) {
            new_cell = document.createElement('td');
            new_detail = document.createTextNode(book_details[i]);
            if (book_details[i] === book.isRead) {
                new_cell.addEventListener('click', function(book) {
                    markAsRead();
                })
            }
            new_cell.appendChild(new_detail);
            new_book_row.appendChild(new_cell);
        }
        let test_text_node = document.createTextNode('X');
        let removal_cell = document.createElement('td');
        removal_cell.addEventListener('click', function() {
            document.getElementById(`${book.title}:${book.author}`).remove();
            console.log(`Removed ${book.title} from the library!`);
        })
        removal_cell.appendChild(test_text_node);
        new_book_row.appendChild(removal_cell)

        library_table.appendChild(new_book_row);
    }
}

function quickFormSubmit() {
    let elements = document.getElementById('newBook_form').elements;
    
    title = elements.item(0).value;
    author = elements.item(1).value;
    pages = elements.item(2).value;

    if (title === '') {
        title = "No title";
    } if (author === '') {
        author = "No title";
    } if (pages === '') {
        pages = "Unknown";
    }

    addBookToLibrary(title, author, pages, "Not Read");

    // let form_div = document.getElementById('new_book')
    // while (form_div && form_div.lastChild != null ) {
    //     console.log("Removing new_book form!")
    //     form_div.removeChild(form_div.lastChild);
    // }
}

//"DOMContentLoaded" event fires only after DOM Objects of the document are fully loaded and 'seen' by JS
document.addEventListener("DOMContentLoaded", function() {
    initial_displayLibrary();
})