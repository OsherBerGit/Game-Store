from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from models import db
from models.admin import User
from models.customer import Customer
from models.game import Game
from models.loans import Loan

app = Flask(__name__)  # - create a flask instance
# - enable all routes, allow requests from anywhere (optional - not recommended for security)
CORS(app, resources={r"/*": {"origins": "*"}})

# Specifies the database connection URL. In this case, it's creating a SQLite database
# named 'gamestore.db' in your project directory. The three slashes '///' indicate a
# relative path from the current directory
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gamestore.db'
db.init_app(app)  # initializes the databsewith the flask application

# this is a decorator from the flask module to define a route for for adding a game, supporting POST requests.(check the decorator summary i sent you and also the exercises)
@app.route('/games', methods=['POST'])
def add_game():
    data = request.json  # this is parsing the JSON data from the request body
    new_game = Game(
        name=data['name'],
        genre=data['genre'],
        price=data['price']
    )
    db.session.add(new_game)  # add the new game to the database session
    db.session.commit()  # commit the session to save in the database
    return jsonify({'message': 'Game added to database.'}), 201

# a decorator to Define a new route that handles GET requests
@app.route('/games', methods=['GET'])
def get_games():
    try:
        games = Game.query.all() # Get all the games from the database

        # Create empty list to store formatted game data we get from the database
        games_list = []

        for game in games:                         # Loop through each game from database
            game_data = {                          # Create a dictionary for each game
                'id': game.id,
                'name': game.name,
                'genre': game.genre,
                'price': game.price
            }
            # Add the iterated game dictionary to our list
            games_list.append(game_data)

        return jsonify({                           # Return JSON response
            'message': 'Games retrieved successfully',
            'games': games_list
        }), 200

    except Exception as e:
        return jsonify({
            'error': 'Failed to retrieve games',
            'message': str(e)
        }), 500
        
@app.route('/games/<int:id>', methods=['DELETE'])
def delete_game(id):
    game = Game.query.get(id)
    
    if not game:
        return
    
    db.session.delete(game)  # Delete the game from the database session
    db.session.commit()  # Commit the session to save changes in the database
    
@app.route('/users', methods=['POST'])
def add_user():
    data = request.json
    new_user = User(
        username=data['username'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added to database.'}), 201

@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        
        users_list = []

        for user in users:
            user_data = {
                'id': user.id,
                'username': user.username,
                'password': user.password
            }
            users_list.append(user_data)

        return jsonify({
            'message': 'Users retrieved successfully',
            'users': users_list
        }), 200

    except Exception as e:
        return jsonify({
            'error': 'Failed to retrieve games',
            'message': str(e)
        }), 500

@app.route('/customers', methods=['POST'])
def add_customer():
    data = request.json
    new_customer = Customer(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number']
    )
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message': 'Customer added to database.'}), 201

@app.route('/customers', methods=['GET'])
def get_customers():
    try:
        customers = Customer.query.all()

        customers_list = []

        for customer in customers:
            customer_data = {
                'id': customer.id,
                'name': customer.name,
                'email': customer.email,
                'phone_number': customer.phone_number
            }
            customers_list.append(customer_data)

        return jsonify({
            'message': 'Customers retrieved successfully',
            'customers': customers_list
        }), 200

    except Exception as e:
        return jsonify({
            'error': 'Failed to retrieve customers',
            'message': str(e)
        }), 500
        
@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get(id)
    if not customer:
        return
    db.session.delete(customer)
    db.session.commit()
        
@app.route('/loans', methods=['POST'])
def add_loan():
    data = request.json
    new_loan = Loan(
        customer_id=data['customer_id'],
        game_id=data['game_id']
    )
    db.session.add(new_loan)
    db.session.commit()
    return jsonify({'message': 'Loan added to database.'}), 201

@app.route('/loans', methods=['GET'])
def get_loans():
    try:
        loans = Loan.query.all()

        loans_list = []

        for loan in loans:
            loan_data = {
                'id': loan.id,
                'customer_id': loan.customer_id,
                'game_id': loan.game_id,
                'loan_date': loan.loan_date
            }
            loans_list.append(loan_data)

        return jsonify({
            'message': 'Loans retrieved successfully',
            'loans': loans_list
        }), 200

    except Exception as e:
        return jsonify({
            'error': 'Failed to retrieve loans',
            'message': str(e)
        }), 500
        
@app.route('/loans/<int:id>', methods=['DELETE'])
def delete_loan(id):
    loan = Loan.query.get(id)
    if not loan:
        return
    db.session.delete(loan)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create all database tables defined in your models(check the models folder)

    # with app.test_client() as test:
    #     response = test.post('/books', json={  # Make a POST request to /books endpoint with book  data
    #         'title': 'Harry Potter',
    #         'author': 'J.K. Rowling',
    #         'year_published': 1997,
    #         'types': '1'  # lets say 1 is fantasy
    #     })
    #     print("Testing /books endpoint:")
    #     # print the response from the server
    #     print(f"Response: {response.data}")

    #     #  GET test here
    #     get_response = test.get('/books')
    #     print("\nTesting GET /books endpoint:")
    #     print(f"Response: {get_response.data}")

    app.run(debug=True)  # start the flask application in debug mode

    # DONT FORGET TO ACTIVATE THE ENV FIRST:
    # /env/Scripts/activate - for windows
    # source ./env/bin/activate - - mac
