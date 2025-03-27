from datetime import datetime
from pymongo import MongoClient
from config import MONGODB_URI

client = MongoClient(MONGODB_URI)
db = client.reddit_predictions
collection = db.feedback

class Feedback:
    def __init__(self, user_id, prediction_id, rating, comment, timestamp=None):
        self.user_id = user_id
        self.prediction_id = prediction_id
        self.rating = rating
        self.comment = comment
        self.timestamp = timestamp or datetime.utcnow()

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'prediction_id': self.prediction_id,
            'rating': self.rating,
            'comment': self.comment,
            'timestamp': self.timestamp
        }

    def save(self):
        return collection.insert_one(self.to_dict()) 