from flask import Blueprint

bp = Blueprint("routes", __name__)

from . import predict
