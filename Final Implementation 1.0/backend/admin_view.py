from flask import Flask, render_template
from pymongo import MongoClient
from bson import json_util
import json

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client.bot_detector

@app.route('/')
def admin_view():
    # Get all collections and their data
    collections_data = {}
    for collection_name in db.list_collection_names():
        documents = list(db[collection_name].find({}))
        collections_data[collection_name] = json.loads(json_util.dumps(documents))

    return render_template('admin.html', collections_data=collections_data)

if __name__ == '__main__':
    app.run(port=5050) 