from steamlog.models import User
from steamlog import oid, login_manager
from steamlog.auth import views
from steamlog.utils import is_safe_url
from flask import redirect
from flask_login import login_user
import re

_steam_id_re = re.compile("steamcommunity.com/openid/id/(.*?)$")


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@oid.after_login
def create_or_login(resp):
    match = _steam_id_re.search(resp.identity_url)
    steam_id = match.group(1)
    user = User.get_or_create(steam_id)
    login_user(user, remember=True)
    next_url = oid.get_next_url()
    if is_safe_url(next_url):
        return redirect(next_url)
    else:
        abort(400)
