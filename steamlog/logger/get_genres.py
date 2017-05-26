from time import sleep
from steamlog import app, db
from steamlog.utils import get_json, get_genre
from steamlog.models import Game


def get_genres():
    games = Game.query.all()

    for game in games:
        genres = get_genre(game.id)
        game.genres = genres
        db.session.add(game)
        db.session.commit()
        sleep(1.5)
