from datetime import datetime
from pymongo import MongoClient
from config import MONGODB_URI

client = MongoClient(MONGODB_URI)
db = client.reddit_predictions
collection = db.reports

class Report:
    def __init__(self, user_id, content, report_text, timestamp=None):
        self.user_id = user_id
        self.content = content
        self.report_text = report_text
        self.timestamp = timestamp or datetime.utcnow()

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'content': self.content,
            'report_text': self.report_text,
            'timestamp': self.timestamp
        }

    def save(self):
        return collection.insert_one(self.to_dict()) 