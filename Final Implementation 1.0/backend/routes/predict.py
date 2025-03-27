from flask import Blueprint, request, jsonify
from utils.reddit_api import get_reddit_user_details
from utils.preprocessing import preprocess_data
import joblib
import os
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

bp = Blueprint("predict", __name__)

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
db = client.bot_detector

# Load pre-trained model
try:
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models/reddit_bot_detection_model.pkl")
    model = joblib.load(model_path)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None

@bp.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        username = data.get("screen_name")

        if not username:
            return jsonify({"error": "Missing username"}), 400

        logger.info(f"Processing prediction for user: {username}")
        user_data = get_reddit_user_details(username)
        
        if not user_data:
            return jsonify({"error": "User not found"}), 404

        features = preprocess_data(user_data)
        prediction = model.predict([features])[0]

        response_data = {
            **user_data,
            "is_bot": bool(prediction)
        }

        return jsonify(response_data)

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500
