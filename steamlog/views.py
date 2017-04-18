from flask import jsonify, Flask, request, url_for
from steamlog.models import User
from steamlog.utils import stats
from steamlog import app, db
from flask_login import login_required, current_user


@app.route("/")
def index():
    return "index"


@app.route("/api/profiles/<steam_id>")
def general_info_user(steam_id):
    user = User.query.filter_by(steam_id=steam_id).first()
    return stats.general_info(user)

@app.route("/api/my")
@login_required
def general_info_my():
    return stats.general_info(current_user)
