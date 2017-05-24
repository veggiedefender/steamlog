from flask import jsonify, request, abort
from flask_login import current_user
from steamlog.models import User
from steamlog import app, db
from sqlalchemy import or_
from sqlalchemy import func


@app.route("/api/events/<steam_id>")
def events(steam_id):
    user = User.query.filter_by(steam_id=steam_id).first_or_404()
    if user.private or user.get_id() != current_user.get_id():
        abort(403)
    else:
        game_events = user.game_events
        events = [dict(event) for event in game_events]
        names = {event.game.id: event.game.name for event in game_events}
        return jsonify({
            "events": events,
            "names": names
        })


@app.route("/api/profiles/<steam_id>")
def user_info(steam_id):
    user = User.query.filter_by(steam_id=steam_id).first_or_404()
    return jsonify(user.json)


@app.route("/api/search")
def search():
    term = request.args.get("q")
    if term is None or len(term) == 0:
        return jsonify([])
    term = func.lower(term.replace('%', '\%').replace('_', '\_'))
    users = (
        User.query
        .filter(or_(
            func.lower(User.steam_id).contains(term, escape='\\'),
            func.lower(User.url).contains(term, escape='\\'),
            func.lower(User.name).contains(term, escape='\\')
        ))
        .limit(10)
        .all()
    )
    return jsonify([dict(user) for user in users])
