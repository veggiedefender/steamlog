from sqlalchemy.exc import IntegrityError
from steamlog.utils import get_json
from steamlog import db, app as _app


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    steam_id = db.Column(db.String(17), index=True, nullable=False, unique=True)
    name = db.Column(db.String(32), nullable=False)
    picture = db.Column(db.String(40), nullable=False)
    game_events = db.relationship("GameEvent", backref="user")

    @property
    def prev(self):
        event = (
            GameEvent.query
            .filter_by(user_id=self.id)
            .order_by(GameEvent.id.desc())
            .first()
        )
        return event

    def start_game(self, prev, game_id, time):
        if prev is None or prev.stop_time is not None:
            print(f"{time} {self.name} STARTED <><> {game_id}")
            if Game.query.get(game_id) is None:
                Game.add_game(game_id)
            event = GameEvent(user=self, start_time=time, game_id=game_id)
            db.session.add(event)
        elif prev.game_id != int(game_id):
            self.stop_game(prev, time)
            self.start_game(self.prev, game_id, time)

    def stop_game(self, prev, time):
        if prev is not None and prev.stop_time is None:
            print(f"{time} {self.name} STOPPED [[]] {prev.game_id}")
            prev.stop_time = time
            db.session.add(prev)


class Game(db.Model):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    name = db.Column(db.String(255), index=True, nullable=False)
    game_events = db.relationship("GameEvent", backref="game")

    @staticmethod
    def add_game(game_id):
        print(f"Adding game {game_id}")
        apps = get_json(_app.config["STEAM_APP_LIST"])["applist"]["apps"]["app"]
        apps = [app for app in apps if app["appid"] == int(game_id)]
        name = apps[0]["name"] if len(apps) > 0 else "__UNKNOWN_GAME__"
        game = Game(id=game_id, name=name)
        db.session.add(game)
        db.session.commit()


class GameEvent(db.Model):
    __tablename__ = "game_events"
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime, nullable=False)
    stop_time = db.Column(db.DateTime, nullable=True)

    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
