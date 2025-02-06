// function to get all books from the API
async function getGames() {
    try {
        const response = await axios.get('http://127.0.0.1:5500/games');
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

// function to add a new game to the database
async function addGame() {
    const title = document.getElementById('game-title').value;
    alert(title);
    const genre = document.getElementById('game-genre').value;
    alert(genre);
    const price = document.getElementById('game-price').value;
    alert(price);

    if(!title || !genre || !price) {
        alert("Please fill of of the necessery fields.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:5500/games', {
            title: title,
            genre: genre,
            price: price
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

// Load all games when page loads
document.addEventListener('DOMContentLoaded', getGames());