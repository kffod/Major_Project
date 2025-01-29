import joblib
import pandas as pd
from flask import Flask, request, jsonify, render_template
import praw
import datetime  # Correct import here

app = Flask(__name__)

# Load the pre-trained model
model = joblib.load('reddit_bot_detection_model.pkl')

# Initialize Reddit API (Replace with your credentials)
reddit = praw.Reddit(
    client_id='i9bY5so8H71m5yGQcBjHiw',
    client_secret='aVIBtnEqrNub8jiUWkfuEVEB1AhGvg',
    user_agent='bot-detection-script'
)

# Function to fetch Reddit user details
def get_reddit_user_details(username):
    try:
        # Fetch Reddit user data
        user = reddit.redditor(username)

        # Fetch user details including karma, achievements, and trophy case
        user_data = {
            'screen_name': username,
            'name': user.name,
            'description': user.subreddit['public_description'] if hasattr(user, 'subreddit') else "",
            'verified': "TRUE" if user.verified else "FALSE",
            'listed_count': user.comment_karma + user.link_karma,
            'post_karma': user.link_karma,
            'comment_karma': user.comment_karma,
            'cake_day': user.created_utc,  # This is the account creation time
            'achievements': get_user_achievements(user),
            'trophy_case': get_user_trophies(user)
        }
        return user_data
    except Exception as e:
        return None

# Dummy functions to retrieve achievements and trophy case data (you can customize them as needed)
def get_user_achievements(user):
    return ["Popular Post", "Buzz-Worthy Post", "Picasso"]

def get_user_trophies(user):
    return ["Four-Year Club", "Verified Email"]

# Function to preprocess input data for the model
def preprocess_data(input_data):
    input_data['verified'] = 1 if input_data.get('verified', 'FALSE') == 'TRUE' else 0
    input_data['listed_count'] = int(input_data.get('listed_count', 0))

    # Return the 3 features that were used for training the model
    return {
        'post_karma': input_data['post_karma'],
        'comment_karma': input_data['comment_karma'],
        'listed_count': input_data['listed_count'],
    }

# Function to predict if a user is a bot using the trained model
def bot_prediction_algorithm(input_data):
    input_data = preprocess_data(input_data)
    features = [
        input_data['post_karma'],
        input_data['comment_karma'],
        input_data['listed_count'],
    ]
    prediction = model.predict([features])
    return prediction[0]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        screen_name = request.form['screen_name']
        input_data = get_reddit_user_details(screen_name)
        if not input_data:
            return render_template('index.html', error="User not found on Reddit")

        prediction = bot_prediction_algorithm(input_data)
        prediction_message = "This account seems to be a bot 🤖" if prediction == 1 else "This account does not seem to be a bot 👨🏻"
        
        return render_template('index.html', 
                               prediction_message=prediction_message, 
                               user_info=input_data, 
                               prediction=prediction)
    except Exception as e:
        return render_template('index.html', error=str(e))

@app.route('/api/predict', methods=['POST'])
def api_predict():
    try:
        data = request.get_json()
        screen_name = data['screen_name']
        
        input_data = get_reddit_user_details(screen_name)
        if not input_data:
            return jsonify({"error": "User not found on Reddit"}), 404
        
        prediction = bot_prediction_algorithm(input_data)
        
        return jsonify({
            "screen_name": input_data['screen_name'],
            "post_karma": input_data['post_karma'],
            "comment_karma": input_data['comment_karma'],
            "cake_day": input_data['cake_day'],
            "achievements": input_data['achievements'],
            "trophy_case": input_data['trophy_case'],
            "is_bot": bool(prediction)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.template_filter('datetimeformat')
def datetimeformat(value):
    return datetime.datetime.utcfromtimestamp(value).strftime('%Y-%m-%d %H:%M:%S')

if __name__ == '__main__':
    app.run(debug=True)
