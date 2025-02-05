// function to get all books from the API
// async function getBooks() {
//     try {
//         const response = await axios.get('http://127.0.0.1:5000/books');
//         const booksList = document.getElementById('books-list');
//         booksList.innerHTML = ''; // Clear existing list

//         response.data.books.forEach(book => {
//             booksList.innerHTML += `
//                 <div class="book-card">
//                     <h3>${book.title}</h3>
//                     <p>Author: ${book.author}</p>
//                     <p>Year: ${book.year_published}</p>
//                     <p>Type: ${book.types}</p>
//                 </div>
//             `;
//         });
//     } catch (error) {
//         console.error('Error fetching books:', error);
//         alert('Failed to load books');
//     }
// }

async function getGames() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/games');
        const gamesList = document.getElementById('games-list');
        gamesList.innerHTML = ''; // Clear existing list

        response.data.games.forEach(game => {
            gamesList.innerHTML += `
                <div class="game-card">
                    <h3>${game.title}</h3>
                    <p>Genre: ${game.genre}</p>
                    <p>Price: ${game.price}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching games:', error);
        alert('Failed to load games');
    }
}

// function to add a new book to the database
// async function addBook() {
//     const title = document.getElementById('book-title').value;
//     const author = document.getElementById('book-author').value;
//     const year_published = document.getElementById('book-year-published').value;
//     const types = document.getElementById('book-type').value;

//     try {
//         await axios.post('http://127.0.0.1:5000/books', {
//             title: title,
//             author: author,
//             year_published: year_published,
//             types: types
//         });
        
//         // Clear form fields
//         document.getElementById('book-title').value = '';
//         document.getElementById('book-author').value = '';
//         document.getElementById('book-year-published').value = '';
//         document.getElementById('book-type').value = '';

//         // Refresh the books list
//         getBooks();
        
//         alert('Book added successfully!');
//     } catch (error) {
//         console.error('Error adding book:', error);
//         alert('Failed to add book');
//     }
// }

async function addGame() {
    const title = document.getElementById('game-title').value;
    const genre = document.getElementById('game-genre').value;
    const price = document.getElementById('game-price').value;

    try {
        await axios.post('http://127.0.0.1:5000/games', {
            title: title,
            genre: genre,
            price: price,
            is_loan_status: false
        });
        
        // Clear form fields
        document.getElementById('game-title').value = '';
        document.getElementById('game-genre').value = '';
        document.getElementById('game-price').value = '';

        // Refresh the books list
        getGames();
        
        alert('Game added successfully!');
    } catch (error) {
        console.error('Error adding Game:', error);
        alert('Failed to add Game');
    }
}

// Load all books when page loads
document.addEventListener('DOMContentLoaded', getBooks);