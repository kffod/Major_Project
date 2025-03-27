from pymongo import MongoClient
from datetime import datetime
import argparse

class DatabaseManager:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client.bot_detector

    def clear_collection(self, collection_name):
        """Clear all documents from a collection"""
        result = self.db[collection_name].delete_many({})
        return f"Deleted {result.deleted_count} documents from {collection_name}"

    def backup_collection(self, collection_name):
        """Backup a collection"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_collection = f"{collection_name}_backup_{timestamp}"
        
        # Copy all documents to backup collection
        documents = list(self.db[collection_name].find({}))
        if documents:
            self.db[backup_collection].insert_many(documents)
            return f"Backed up {len(documents)} documents to {backup_collection}"
        return "No documents to backup"

    def restore_backup(self, backup_collection, target_collection):
        """Restore from a backup collection"""
        documents = list(self.db[backup_collection].find({}))
        if documents:
            self.db[target_collection].delete_many({})
            self.db[target_collection].insert_many(documents)
            return f"Restored {len(documents)} documents to {target_collection}"
        return "No documents to restore"

    def view_collection_stats(self, collection_name):
        """View statistics for a collection"""
        stats = {
            'document_count': self.db[collection_name].count_documents({}),
            'size': self.db[collection_name].estimated_document_count(),
            'indexes': list(self.db[collection_name].list_indexes())
        }
        return stats

def main():
    parser = argparse.ArgumentParser(description='Database Management Tool')
    parser.add_argument('action', choices=['clear', 'backup', 'restore', 'stats'])
    parser.add_argument('collection', help='Collection name')
    parser.add_argument('--backup-name', help='Backup collection name for restore')
    
    args = parser.parse_args()
    db_manager = DatabaseManager()

    if args.action == 'clear':
        print(db_manager.clear_collection(args.collection))
    elif args.action == 'backup':
        print(db_manager.backup_collection(args.collection))
    elif args.action == 'restore':
        if not args.backup_name:
            print("Error: --backup-name is required for restore action")
            return
        print(db_manager.restore_backup(args.backup_name, args.collection))
    elif args.action == 'stats':
        print(db_manager.view_collection_stats(args.collection))

if __name__ == '__main__':
    main() 