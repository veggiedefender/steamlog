from flask import url_for, redirect, render_template
from steamlog.models import User
from steamlog import app
from flask_login import current_user


@app.route("/")
def index():
    if current_user.is_authenticated:
        return redirect(url_for("profile_page_steam_id",
                                steam_id=current_user.steam_id))
    else:
        return redirect(url_for("login"))


@app.route("/profiles/<steam_id>")
def profile_page_steam_id(steam_id):
    profile = User.query.filter_by(steam_id=steam_id).first_or_404()
    return render_template("index.html", profile=profile, user=current_user)


@app.route("/id/<url>")
def profile_page_url(url):
    profile = User.query.filter_by(url=url).first_or_404()
    return render_template("index.html", profile=profile, user=current_user)
