from flask import Flask
from flask_cors import CORS
from routes import predict

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Register blueprint for routes
app.register_blueprint(predict.bp)

if __name__ == "__main__":
    app.run(debug=True)
