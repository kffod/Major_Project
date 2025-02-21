from flask import Blueprint

bp = Blueprint("routes", __name__)

from . import predict  # Import prediction route
