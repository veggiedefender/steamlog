from steamlog.utils import get_json
from steamlog.models import Game
from steamlog import db, app as _app


def add_games():
    print("[ ADDING GAMES ]")
    apps = get_json(_app.config["STEAM_APP_LIST"])["applist"]["apps"]
    total_apps = len(apps)

    for i in range(total_apps):
        app = apps[i]
        game = Game(id=app["appid"], name=app["name"])
        db.session.add(game)
        if (i % 1000 == 0):
            db.session.commit()
    db.session.commit()
