from pymongo import MongoClient
from dotenv import load_dotenv
import os
from datetime import datetime

# Load environment variables
load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
db = client.bot_detector

def print_collection(collection_name):
    print(f"\n=== {collection_name.upper()} ===")
    collection = db[collection_name]
    for doc in collection.find():
        # Convert timestamp to readable format if it exists
        if 'timestamp' in doc:
            doc['timestamp'] = doc['timestamp'].strftime('%Y-%m-%d %H:%M:%S')
        print(doc)

def main():
    print("Database Contents:")
    print_collection('predictions')
    print_collection('feedback')
    print_collection('reports')

if __name__ == "__main__":
    main() 