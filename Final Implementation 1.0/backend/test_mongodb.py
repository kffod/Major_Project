from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_mongodb_connection():
    try:
        # Connect to MongoDB
        client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
        
        # Test the connection
        client.server_info()
        
        # Create a test database and collection
        db = client.test_database
        collection = db.test_collection
        
        # Insert a test document
        test_doc = {"name": "test", "value": 1}
        collection.insert_one(test_doc)
        
        # Find the document
        result = collection.find_one({"name": "test"})
        
        print("✅ MongoDB connection successful!")
        print("Test document:", result)
        
        # Clean up
        collection.delete_one({"name": "test"})
        client.drop_database('test_database')
        
    except Exception as e:
        print("❌ MongoDB connection failed!")
        print("Error:", str(e))

if __name__ == "__main__":
    test_mongodb_connection() 