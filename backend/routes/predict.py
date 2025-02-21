from flask import Blueprint, request, jsonify
from utils.reddit_api import get_reddit_user_details
from utils.preprocessing import preprocess_data
import joblib
import os

bp = Blueprint("predict", __name__)

# Load pre-trained model
model_path = os.path.join(os.path.dirname(__file__), "../models/reddit_bot_detection_model.pkl")
model = joblib.load(model_path)

@bp.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        username = data.get("screen_name")

        if not username:
            return jsonify({"error": "Missing 'screen_name' in request"}), 400

        # Fetch Reddit user details
        user_data = get_reddit_user_details(username)
        if not user_data:
            return jsonify({"error": "User not found on Reddit"}), 404

        # Preprocess user data
        features = preprocess_data(user_data)
        prediction = model.predict([features])

        return jsonify({
            "screen_name": username,
            "post_karma": user_data["post_karma"],
            "comment_karma": user_data["comment_karma"],
            "cake_day": user_data["cake_day"],
            "achievements": user_data["achievements"],
            "trophy_case": user_data["trophy_case"],
            "is_bot": bool(prediction[0])
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
