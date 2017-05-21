from time import sleep
from steamlog import app
from steamlog.utils import get_json
from steamlog.models import Game

URL = app.config["STEAM_APPDETAILS"]


def get_genres():
    games = Game.query.all()

    for game in games:
        r = get_json(URL + str(game.id))[str(game.id)]
        if r["success"]:
            try:
                print(r["data"]["genres"])
            except KeyError:
                pass
