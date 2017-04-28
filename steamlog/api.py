from flask import jsonify
from steamlog.utils import stats
from steamlog.models import User
from steamlog import app


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
