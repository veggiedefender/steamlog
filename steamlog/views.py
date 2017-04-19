from flask import jsonify, request, url_for, render_template, redirect
from steamlog.models import User
from steamlog.utils import stats
from steamlog import app, db
from flask_login import login_required, current_user


@app.route("/")
def index():
    if current_user.is_authenticated:
        return render_template("index.html", user=current_user)
    else:
        return redirect(url_for("login"))


@app.route("/api/profiles/<steam_id>")
@login_required
def basic_info():
    pass