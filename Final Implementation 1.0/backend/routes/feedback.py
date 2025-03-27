from flask import Blueprint, request, jsonify
from models.feedback import Feedback
from models.report import Report
from utils.gemini import generate_report
from datetime import datetime
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

bp = Blueprint('feedback', __name__)

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
db = client.bot_detector

def handle_options():
    response = jsonify({"status": "ok"})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return response

@bp.route('/api/feedback', methods=['POST', 'OPTIONS'])
def submit_feedback():
    if request.method == "OPTIONS":
        return handle_options()
        
    try:
        data = request.get_json()
        feedback_data = {
            'username': data.get('username'),
            'feedback': data.get('feedback'),
            'comment': data.get('comment'),
            'prediction': data.get('prediction'),
            'timestamp': datetime.utcnow()
        }
        
        # Save to MongoDB
        db.feedback.insert_one(feedback_data)
        logger.info(f"Feedback submitted for user: {data.get('username')}")
        return jsonify({'message': 'Feedback submitted successfully'}), 200
    except Exception as e:
        logger.error(f"Error submitting feedback: {str(e)}")
        return jsonify({'error': str(e)}), 400

@bp.route('/api/generate-report', methods=['POST', 'OPTIONS'])
def generate_report_endpoint():
    if request.method == "OPTIONS":
        return handle_options()
        
    try:
        data = request.get_json()
        user_data = data.get('userData')
        
        if not user_data:
            return jsonify({'error': 'No user data provided'}), 400

        # Generate report using Gemini
        report_text = generate_report(user_data)
        
        # Store report in MongoDB
        report_data = {
            'username': user_data.get('screen_name'),
            'report': report_text,
            'timestamp': datetime.utcnow()
        }
        db.reports.insert_one(report_data)
        
        logger.info(f"Report generated for user: {user_data.get('screen_name')}")
        return jsonify({
            'message': 'Report generated successfully',
            'report': report_text
        }), 200
    except Exception as e:
        logger.error(f"Error generating report: {str(e)}")
        return jsonify({'error': str(e)}), 400 