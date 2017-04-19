import time
import requests
from datetime import datetime
from steamlog.models import User, Game, GameEvent
from steamlog.utils import get_json
from steamlog import app, db


def get_users():
    """
    Generator to fetch 100 users from db at a time
    """
    offset = 0
    while True:
        users = User.query.order_by(User.id.asc()).limit(100).offset(offset).all()
        if (len(users) > 0):
            offset += 100
            yield users
        else:
            break


def transform(players):
    """
    Turns the Steam API's array of objects into a dict
    for random access.
    """
    return {player["steamid"]: player for player in players}


def get_profiles(users):
    """
    Get profile data from Steam API and call
    update() on each user
    """
    assert len(users) <= 100
    users_url = (app.config["STEAM_SUMMARIES"] +
                 "+".join([user.steam_id for user in users]))

    profiles = transform(get_json(users_url)["response"]["players"])
    curr_time = datetime.now()
    for user in users:
        update(user, profiles[user.steam_id], curr_time)
    db.session.commit()


def update(user, profile, curr_time):
    """
    Update individual user data in db
    """
    user.update(profile)
    game_id = profile.get("gameid")
    prev = user.prev

    if game_id is None:
        user.stop_game(prev, curr_time)
    else:
        user.play_game(prev, game_id, curr_time)

    db.session.add(user)


def begin():
    print(f"[ STARTED LOGGING! ] {datetime.now()}\n")
    # 100k requests/day + fuzzing
    pause_time = 100_000 / (60 * 60 * 24) + 0.1
    while True:
        start = datetime.now()

        for users in get_users():
            get_profiles(users)

        elapsed = (datetime.now() - start).total_seconds()
        if elapsed < pause_time:
            time.sleep(pause_time - elapsed)
