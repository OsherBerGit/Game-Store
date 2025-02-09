
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username == 'admin' && password == 1234) {
        alert("Login successful!");
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('main-section').classList.remove('hidden');
    }
    else {
        alert("Invalid username or password.");
    }
}

async function logout() {
    alert("Logging out!");
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('main-section').classList.add('hidden');
}

async function getCustomers() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/customers');
        const customersList = document.getElementById('customers-list');
        customersList.innerHTML = ''; // Clear existing list
        response.data.customers.forEach(customer => {
            customersList.innerHTML += `
                <div class="customer-card">
                    <h3>${customer.name}</h3>
                    <p>ID: ${customer.id}</p>
                    <p>Email: ${customer.email}</p>
                    <p>Phone Number: ${customer.phone_number}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        alert('Failed to load customers');
    }
}

async function addCustomer() {
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone_number = document.getElementById('customer-phone_number').value;

    if(!name || !email || !phone_number) {
        alert("Please fill of of the necessery fields.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:5000/customers', {
            name: name,
            email: email,
            phone_number: phone_number
        });
        
        // Clear form fields
        document.getElementById('customer-name').value = '';
        document.getElementById('customer-email').value = '';
        document.getElementById('customer-phone_number').value = '';

        // Refresh the books list
        getCustomers();
        
        alert('Customer added successfully!');
    } catch (error) {
        console.error('Error adding customer:', error);
        alert('Failed to add Customer');
    }
}

async function removeCustomer() {
    const id = document.getElementById('customer-id-remove').value;
    loan_id = -1;
    isExist = false;
    
    if(!id) {
        alert("Please fill the game id field.");
        return;
    }

    try {
        const response = await axios.get('http://127.0.0.1:5000/customers');
        response.data.customers.forEach(customer => {
            if (customer.id == id) {
                isExist = true;
            }
        });
    } catch (error) {
        console.error('Error checking customers:', error);
        alert('Failed to load customers');
    }

    try {
        const response = await axios.get('http://127.0.0.1:5000/loans');
        response.data.loans.forEach(loan => {
            if (loan.customer_id == id) {
                loan_id = loan.id;
            }
        });
    } catch (error) {
        console.error('Error checking loans:', error);
        alert('Failed to load loans');
    }

    if(!isExist) {
        alert("Game has not found.");
        return;
    }

    try {
        await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
        if (loan_id != -1)
            await axios.delete(`http://127.0.0.1:5000/loans/${loan_id}`);
        
        // Clear form fields
        document.getElementById('customer-id-remove').value = '';

        // Refresh the books list
        getCustomer();
        
        alert('Customer removed successfully!');
    } catch (error) {
        console.error('Error removing Customer:', error);
        alert('Failed to remove Customer');
    }
}

async function getGames() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/games');
        const gamesList = document.getElementById('games-list');
        gamesList.innerHTML = ''; // Clear existing list

        response.data.games.forEach(game => {
            gamesList.innerHTML += `
                <div class="game-card">
                    <h3>${game.title}</h3>
                    <p>ID: ${game.id}</p>
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

async function addGame() {
    const title = document.getElementById('game-title').value;
    const genre = document.getElementById('game-genre').value;
    const price = document.getElementById('game-price').value;

    if(!title || !genre || !price) {
        alert("Please fill of of the necessery fields.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:5000/games', {
            title: title,
            genre: genre,
            price: price,
            is_loan: false
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

async function removeGame() {
    const id = document.getElementById('game-id-remove').value;
    loan_id = -1;
    isExist = false;
    
    if(!id) {
        alert("Please fill the game id field.");
        return;
    }

    try {
        const response = await axios.get('http://127.0.0.1:5000/games');
        response.data.games.forEach(game => {
            if (game.id == id) {
                isExist = true;
            }
        });
    } catch (error) {
        console.error('Error checking games:', error);
        alert('Failed to load games');
    }

    try {
        const response = await axios.get('http://127.0.0.1:5000/loans');
        response.data.loans.forEach(loan => {
            if (loan.game_id == id) {
                loan_id = loan.id;
            }
        });
    } catch (error) {
        console.error('Error checking loans:', error);
        alert('Failed to load loans');
    }

    if(!isExist) {
        alert("Game has not found.");
        return;
    }

    try {
        await axios.delete(`http://127.0.0.1:5000/games/${id}`);
        if (loan_id != -1)
            await axios.delete(`http://127.0.0.1:5000/loans/${loan_id}`);
        
        // Clear form fields
        document.getElementById('game-id-remove').value = '';

        // Refresh the books list
        getGames();
        
        alert('Game removed successfully!');
    } catch (error) {
        console.error('Error removing Game:', error);
        alert('Failed to remove Game');
    }
}

async function getLoans() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/loans');
        const loansList = document.getElementById('loans-list');
        loansList.innerHTML = ''; // Clear existing list

        response.data.loans.forEach(loan => {
            loansList.innerHTML += `
                <div class="loan-card">
                    <h3>${loan.id}</h3>
                    <p>Game: ${loan.game_id}</p>
                    <p>Customer: ${loan.customer_id}</p>
                    <p>Loan Date: ${loan.loan_date}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching loans:', error);
        alert('Failed to load loans');
    }
}

async function addLoan() {
    const game = document.getElementById('game-id-loan').value;
    const customer = document.getElementById('customer-id').value;
    isCustomerLoaned = false;
    isGameLoaned = false;

    if(!game || !customer) {
        alert("Please fill of of the necessery fields.");
        return;
    }

    try {
        const response = await axios.get('http://127.0.0.1:5000/loans');
        response.data.loans.forEach(loan => {
            if (loan.customer_id == customer) {
                isCustomerLoaned = true;
            }
            if (loan.game_id == game) {
                isGameLoaned = true;
            }
        });
    } catch (error) {
        console.error('Error checking loans:', error);
        alert('Failed to load loans');
    }

    if(isCustomerLoaned) {
        alert("The customer is already loaning a game.");
        return;
    }
    if(isGameLoaned) {
        alert("The game is already loaned.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:5000/loans', {
            customer_id: customer,
            game_id: game
        });
        
        // Clear form fields
        document.getElementById('game-id-loan').value = '';
        document.getElementById('customer-id').value = '';

        // Refresh the books list
        getLoans();
        
        alert('Loan added successfully!');
    } catch (error) {
        console.error('Error adding Loan:', error);
        alert('Failed to add Loan');
    }
}

async function removeLoan() {
    const id = document.getElementById('loan-id').value;
    isExist = false;
    
    if(!id) {
        alert("Please fill the game id field.");
        return;
    }

    try {
        const response = await axios.get('http://127.0.0.1:5000/loans');
        response.data.loans.forEach(loan => {
            if (loan.id == id) {
                isExist = true;
            }
        });
    } catch (error) {
        console.error('Error checking loans:', error);
        alert('Failed to load loans');
    }

    if(!isExist) {
        alert("Game has not found.");
        return;
    }

    try {
        await axios.delete(`http://127.0.0.1:5000/loans/${id}`);
        
        // Clear form fields
        document.getElementById('loan-id').value = '';

        // Refresh the books list
        getLoans();
        
        alert('Loan removed successfully!');
    } catch (error) {
        console.error('Error removing Loan:', error);
        alert('Failed to remove Loan');
    }
}

// Load all games when page loads

async function getAll() {
    try {
        getCustomers();
        getGames();
        getLoans();
    } catch (error) {
        console.error('Error fetching all:', error);
        alert('Failed to load all');
    }
}

document.addEventListener('DOMContentLoaded', getAll());
