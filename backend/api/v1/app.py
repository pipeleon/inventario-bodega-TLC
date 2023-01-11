#!/usr/bin/python3
"""Module that initialice a flask web instance
it contain one route.
"""
from os import getenv
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from models import storage
from api.v1.views import app_views
from flask_session import Session


app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config["SECRET_KEY"] = "mysecret"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
Session(app)


@app.errorhandler(404)
def page_not_found(e):
    """Handler to the error 404 when a url(uri) is not
    found"""
    return make_response(jsonify({"error": "Not found"}), 404)


@app.teardown_appcontext
def close(execute):
    """Instance that close conection with engine"""
    storage.close()


if __name__ == "__main__":
    env_host = getenv("HBNB_API_HOST", default="0.0.0.0")
    env_port = getenv("HBNB_API_PORT", default=5000)
    app.run(host=env_host, port=int(env_port), threaded=True, debug=True)
