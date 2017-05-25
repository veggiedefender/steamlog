from flask import jsonify, request, abort
from flask_login import current_user, login_required
from steamlog.models import User
from steamlog import app, db
from sqlalchemy import or_
from sqlalchemy import func


@app.route("/api/events/<steam_id>")
def events(steam_id):
    user = User.query.filter_by(steam_id=steam_id).first_or_404()
    if user.private and user.get_id() != current_user.get_id():
        abort(403)
    else:
        game_events = user.game_events
        events = [dict(event) for event in game_events]
        games = {event.game.id: dict(event.game) for event in game_events}
        return jsonify({
            "events": events,
            "games": games
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
    return jsonify([user.json for user in users])


@app.route("/api/options", methods=["POST"])
@login_required
def options():
    data = request.get_json()
    if data.get("private") is not None:
        current_user.private = data["private"]
    db.session.add(current_user)
    db.session.commit()

    return jsonify({"success": True})
