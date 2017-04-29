from flask import jsonify, request
from steamlog.utils import stats
from steamlog.models import User
from steamlog import app, db
from sqlalchemy import or_


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


@app.route("/api/search", methods=["POST"])
def search():
    data = request.get_json()
    if data is None or data.get("term") is None:
        return jsonify([])
    term = data["term"].strip()
    if len(term) == 0:
        return jsonify([])

    users = (
        db.session.query(User)
        .filter(or_(
            User.steam_id.contains(term),
            User.url.contains(term),
            User.name.contains(term)
        ))
        .limit(10)
        .all()
    )
    return jsonify([{
        "name": user.name
    } for user in users])
