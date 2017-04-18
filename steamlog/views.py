from flask import jsonify, Flask, request, url_for
from steamlog.models import User
from steamlog import app, db
from flask_login import login_required, current_user


@app.route("/")
def index():
    return current_user.steam_id
