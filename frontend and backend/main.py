import pickle
from flask import Flask, request, render_template, redirect, url_for, flash  # Import flash
import pandas as pd
import mysql.connector  # Import the MySQL connector

# Initialize the Flask app
app = Flask(__name__)
app.secret_key = '9d8071a38319759ee0f2d902600ad4509929f867b94e357a'  # Required for session management and flashing messages

# Define the twitter_bot class (you must include the same class definition as when saving the model)
class twitter_bot:
    pass  
    # Your twitter_bot class definition here (if necessary, add the class content)

# Load the trained model
with open('twitter_bot_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Database connection setup
def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',        # Typically localhost
        user='root',             # Your MySQL username
        password='',             # Your MySQL password (usually empty for XAMPP by default)
        database='twitter_bot_db'  # The database name you created
    )
    return connection

# Preprocess the input data (same as your preprocessing steps)
def preprocess_data(input_data):
    input_data['id'] = int(input_data['id'])  # Convert 'id' to integer
    input_data['verified'] = 1 if input_data['verified'] == 'TRUE' else 0  # Convert 'verified' to binary
    input_data['listed_count'] = int(input_data['listed_count'])  # Ensure 'listed_count' is an integer
    return input_data

# Prediction function using the loaded model
def bot_prediction_algorithm(input_data):
    # Apply the preprocessing
    input_data = preprocess_data(input_data)

    # Define bot-related words/phrases (simplified for demo)
    bag_of_words_bot = r'BOT|Bot|bot|b0t|cannabis|tweet me|mishear|follow me|updates every|gorilla|yes_ofc|forget'

    # Check if the name, description, or screen_name contains bot-like words
    if (pd.Series([input_data['name']]).str.contains(bag_of_words_bot, case=False, na=False).any() or
        pd.Series([input_data['description']]).str.contains(bag_of_words_bot, case=False, na=False).any() or
        pd.Series([input_data['screen_name']]).str.contains(bag_of_words_bot, case=False, na=False).any() or
        pd.Series([input_data['status']]).str.contains(bag_of_words_bot, case=False, na=False).any()):
        return 1  # Bot detected
    else:
        return 0  # Not a bot

# Home route to render the form
@app.route('/')
def home():
    return render_template('index.html')

# Prediction route that will process the form input
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data
        input_data = {
            'id': request.form['id'],
            'verified': request.form['verified'],
            'name': request.form['name'],
            'description': request.form['description'],
            'screen_name': request.form['screen_name'],
            'status': request.form['status'],
            'listed_count': request.form['listed_count']
        }

        # Use bot prediction algorithm
        prediction = bot_prediction_algorithm(input_data)

        # Create a prediction message
        if prediction == 1:
            prediction_message = "This account seems to be a bot 🤖, 'STAY AWARE' "
        else:
            prediction_message = "This account does not seem to be a bot 👨🏻."

        # Return the result to the UI with a pop-up message
        return render_template('index.html', prediction_message=prediction_message, 
                               prediction=prediction, reported_screen_name=input_data['screen_name'])

    except Exception as e:
        return render_template('index.html', error=str(e))

# Feedback route to handle feedback form submission
@app.route('/feedback', methods=['POST'])
def feedback():
    feedback_text = request.form['feedback']  # Get feedback from the form
    # Save the feedback to the database
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        # Insert the feedback into the feedback table
        cursor.execute("INSERT INTO feedback (feedback_text) VALUES (%s)", (feedback_text,))
        connection.commit()  # Commit the transaction
        cursor.close()
        connection.close()
        flash("Thank you for your feedback! 😊")  # Flash a success message
    except Exception as e:
        flash(f"Error saving feedback: {str(e)}")  # Flash an error message
    return redirect(url_for('home'))  # Redirect back to the home page

# Report route to handle reporting accounts
@app.route('/report', methods=['POST'])
def report():
    reported_screen_name = request.form['reported_screen_name']
    # Save the reported account to the database
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        # Insert the reported account into the reported_accounts table
        cursor.execute("INSERT INTO reported_accounts (screen_name) VALUES (%s)", (reported_screen_name,))
        connection.commit()  # Commit the transaction
        cursor.close()
        connection.close()
        flash("The account has been reported successfully! ⚠️")  # Flash a success message
    except Exception as e:
        flash(f"Error reporting account: {str(e)}")  # Flash an error message
    return redirect(url_for('home'))

# Separate feedback page
@app.route('/feedback-page')
def feedback_page():
    return render_template('feedback_page.html')  # Render the feedback page template

# Start the Flask application
if __name__ == '__main__':
    app.run(debug=True)  # Run the app in debug mode
