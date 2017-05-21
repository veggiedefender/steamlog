from steamlog import app, oid
from steamlog.utils import is_safe_url
from flask_login import current_user, logout_user
from flask import redirect, url_for, request


@app.route("/login")
@oid.loginhandler
def login():
    if current_user.is_authenticated:
        next_url = oid.get_next_url()
        if is_safe_url(next_url):
            return redirect(next_url)
    return oid.try_login("https://steamcommunity.com/openid")


@app.route("/logout")
def logout():
    logout_user()
    next_url = request.args.get('next')
    if is_safe_url(next_url):
        return redirect(next_url)
    return redirect(url_for("index"))
