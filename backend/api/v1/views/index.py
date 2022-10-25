#!/usr/bin/python3
"""Module with a Blueprint object that have one
route with /status lie an end point"""
from api.v1.views import app_views
from models import storage
from flask import jsonify


@app_views.route("/status", strict_slashes=False)
def status():
    """Return JSON with the status of the API"""
    return jsonify({"status": "OK"})
