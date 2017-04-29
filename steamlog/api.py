from flask import jsonify, request
from steamlog.utils import stats
from steamlog.models import User
from steamlog import app, db
from sqlalchemy import or_
from sqlalchemy import func


@app.route("/api/events/<steam_id>")
def events(steam_id):
    user = User.query.filter_by(steam_id=steam_id).first_or_404()
    game_events = user.game_events
    events = [dict(event) for event in game_events]
    names = {event.game.id: event.game.name for event in game_events}
    return jsonify({
        "events": events,
        "names": names
    })


@app.route("/api/search")
def search():
    term = request.args.get("q")
    if term is None or len(term) == 0:
        return jsonify([])
    term = func.lower(term)
    users = (
        User.query
        .filter(or_(
            func.lower(User.steam_id).contains(term),
            func.lower(User.url).contains(term),
            func.lower(User.name).contains(term)
        ))
        .limit(10)
        .all()
    )
    return jsonify([{
        "name": user.name
    } for user in users])
