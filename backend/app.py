from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from models import db
from models.customer import Customer
from models.game import Game
from models.loans import Loan

app = Flask(__name__)  # - create a flask instance
# - enable all routes, allow requests from anywhere (optional - not recommended for security)
CORS(app, resources={r"/*": {"origins": "*"}})

# Specifies the database connection URL. In this case, it's creating a SQLite database
# named 'gamestore.db' in your project directory. The three slashes '///' indicate a
# relative path from the current directory
app.config['SQLALCHEMY_DATABASE'] = 'sqlite:///gamestore.db'
db.init_app(app)  # initializes the databsewith the flask application

# this is a decorator from the flask module to define a route for for adding a game, supporting POST requests.(check the decorator summary i sent you and also the exercises)
@app.route('/games', methods=['POST'])
def add_game():
    data = request.json  # this is parsing the JSON data from the request body
    new_game = Game(
        title=data['title'],
        genre=data['genre'],
        price=data['price'],
        # is_loan=data['is_loan']
    )
    db.session.add(new_game)  # add the bew game to the database session
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
                'title': game.title,
                'genre': game.genre,
                'price': game.price,
                'is_loan': game.is_loan
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
        }), 500                                    #


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
