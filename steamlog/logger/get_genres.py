from time import sleep
from steamlog import app, db
from steamlog.utils import get_json
from steamlog.models import Game

URL = app.config["STEAM_APPDETAILS"]


def get_genres():
    games = Game.query.all()

    for game in games:
        json = get_json(URL + str(game.id))[str(game.id)]
        if json["success"]:
            try:
                genres = json["data"]["genres"]
                genres = [genre["description"] for genre in genres]
                print(f"{game.name}: {genres}")
                game.genres = genres
                db.session.add(game)
                db.session.commit()
            except KeyError:
                pass
