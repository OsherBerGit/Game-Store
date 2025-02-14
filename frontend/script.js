
function setLoggedIn() {
    localStorage.setItem('isLoggedIn', 'true');
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('main-section').classList.remove('hidden');
}

function setLoggedOut() {
    localStorage.removeItem('isLoggedIn');
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('main-section').classList.add('hidden');
}

// Modify the login function
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await axios.get('http://127.0.0.1:5000/users');
        const user = response.data.users.find(user => 
            user.username === username && user.password === password
        );
        if (user) {
            alert("Login successful!");
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            setLoggedIn(); // Use the new function
        } else {
            alert("Invalid username or password.");
        }
    }
    catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to load users');
    }
}

// Modify the logout function
async function logout() {
    alert("Logging out!");
    setLoggedOut(); // Use the new function
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if(!username || !password) {
        alert("Please fill the necessery fields.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:5000/users', {
            username: username,
            password: password
        });
        
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        alert('Registration added successfully!');
    } catch (error) {
        console.error('Error registering:', error);
        alert('Failed to register');
    }
}

async function getCustomers() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/customers');
        const customersList = document.getElementById('customers-list');
        customersList.innerHTML = '';
        response.data.customers.forEach(customer => {
            customersList.innerHTML += `
                <div class="grid-item">
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
        alert("Please fill the necessery fields.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:5000/customers', {
            name: name,
            email: email,
            phone_number: phone_number
        });
        
        document.getElementById('customer-name').value = '';
        document.getElementById('customer-email').value = '';
        document.getElementById('customer-phone_number').value = '';

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
        if (loan_id != -1) {
            await axios.delete(`http://127.0.0.1:5000/loans/${loan_id}`);
            getLoans();
        }
    } catch (error) {
        console.error('Error removing Loan:', error);
        alert('Failed to remove Loan');
    }

    try {
        await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
       
        document.getElementById('customer-id-remove').value = '';

        getCustomers();
        
        alert('Customer removed successfully!');
    } catch (error) {
        console.error('Error removing Customer:', error);
        // alert('Failed to remove Customer');
    }
}

async function getGames() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/games');
        const gamesList = document.getElementById('games-list');
        gamesList.innerHTML = ''; // Clear existing list

        response.data.games.forEach(game => {
            gamesList.innerHTML += `
                <div class="grid-item">
                    <h3>${game.name}</h3>
                    <p>Genre: ${game.genre}</p>
                    <p>Price: ${game.price}$</p>
                    <button onclick="removeGame(${game.id})" id="delgame-btn">Remove Game</button>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching games:', error);
        alert('Failed to load games');
    }
}

async function addGame() {
    const name = document.getElementById('game-name').value;
    const genre = document.getElementById('game-genre').value;
    const price = document.getElementById('game-price').value;

    if(!name || !genre || !price) {
        alert("Please fill the necessery fields.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:5000/games', {
            name: name,
            genre: genre,
            price: price
        });

        // Clear form fields
        document.getElementById('game-name').value = '';
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

async function removeGame(id) {
    loan_id = -1;

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

    try {
        if (loan_id != -1) {
            await axios.delete(`http://127.0.0.1:5000/loans/${loan_id}`);
            getLoans();
        }
    } catch (error) {
        console.error('Error removing Loan:', error);
        alert('Failed to remove Loan');
    }

    try {
        await axios.delete(`http://127.0.0.1:5000/games/${id}`);
        
        document.getElementById('game-id-remove').value = '';
        getGames();
        
        alert('Game removed successfully!');
    } catch (error) {
        console.error('Error removing Game:', error);
        // alert('Failed to remove Game');
    }
}

// async function removeGame() {
//     const id = document.getElementById('game-id-remove').value;
//     loan_id = -1;
//     isExist = false;
    
//     if(!id) {
//         alert("Please fill the game id field.");
//         return;
//     }

//     try {
//         const response = await axios.get('http://127.0.0.1:5000/games');
//         response.data.games.forEach(game => {
//             if (game.id == id) {
//                 isExist = true;
//             }
//         });
//     } catch (error) {
//         console.error('Error checking games:', error);
//         alert('Failed to load games');
//     }

//     try {
//         const response = await axios.get('http://127.0.0.1:5000/loans');
//         response.data.loans.forEach(loan => {
//             if (loan.game_id == id) {
//                 loan_id = loan.id;
//             }
//         });
//     } catch (error) {
//         console.error('Error checking loans:', error);
//         alert('Failed to load loans');
//     }

//     if(!isExist) {
//         alert("Game has not found.");
//         return;
//     }

//     try {
//         if (loan_id != -1) {
//             await axios.delete(`http://127.0.0.1:5000/loans/${loan_id}`);
//             getLoans();
//         }
//     } catch (error) {
//         console.error('Error removing Loan:', error);
//         alert('Failed to remove Loan');
//     }

//     try {
//         await axios.delete(`http://127.0.0.1:5000/games/${id}`);
        
//         document.getElementById('game-id-remove').value = '';
//         getGames();
        
//         alert('Game removed successfully!');
//     } catch (error) {
//         console.error('Error removing Game:', error);
//         // alert('Failed to remove Game');
//     }
// }

async function getLoans() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/loans');
        const games = await axios.get('http://127.0.0.1:5000/games');
        const loansList = document.getElementById('loans-list');
        loansList.innerHTML = ''; // Clear existing list
        gName = "";
        cName = "";

        response.data.loans.forEach(loan => {
            games.data.loans.forEach(game => {
                if (game.id == loan.id)
                    gName = game.name;
            });


            loansList.innerHTML += `
                <div class="grid-item">
                    <h3>${loan.id}</h3>
                    <p>Game: ${gName}</p>
                    <p>Customer: ${loan.customer_id}</p>
                    <p>Loan Date: ${loan.loan_date}</p>
                    <button onclick="removeLoan(${loan.id})" id="delloan-btn">Remove Loan</button>
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
        
        document.getElementById('game-id-loan').value = '';
        document.getElementById('customer-id').value = '';

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

        document.getElementById('loan-id').value = '';
        getLoans();

        alert('Loan removed successfully!');
    } catch (error) {
        console.error('Error removing Loan:', error);
        // alert('Failed to remove Loan');
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('main-section').classList.remove('hidden');
    }
    getAll();
});