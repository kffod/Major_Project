from pymongo import MongoClient
from pprint import pprint
import json

def view_database():
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client.bot_detector  # Your database name

    # List all collections
    print("\n=== Collections ===")
    collections = db.list_collection_names()
    for collection in collections:
        print(f"\nCollection: {collection}")
        print("=" * 50)
        
        # Get all documents in collection
        documents = list(db[collection].find({}))
        
        # Print each document nicely formatted
        for doc in documents:
            # Convert ObjectId to string for better viewing
            doc['_id'] = str(doc['_id'])
            pprint(doc)
            print("-" * 30)

        # Print total count
        print(f"\nTotal documents in {collection}: {len(documents)}")

def export_to_json():
    client = MongoClient('mongodb://localhost:27017/')
    db = client.bot_detector

    # Export each collection to a JSON file
    for collection_name in db.list_collection_names():
        documents = list(db[collection_name].find({}))
        
        # Convert ObjectId to string
        for doc in documents:
            doc['_id'] = str(doc['_id'])
        
        # Save to JSON file
        with open(f'db_export_{collection_name}.json', 'w') as f:
            json.dump(documents, f, indent=2)
        print(f"Exported {collection_name} to db_export_{collection_name}.json")

if __name__ == "__main__":
    while True:
        print("\n1. View database contents")
        print("2. Export to JSON")
        print("3. Exit")
        choice = input("Choose an option (1-3): ")

        if choice == '1':
            view_database()
        elif choice == '2':
            export_to_json()
        elif choice == '3':
            break
        else:
            print("Invalid choice!") 