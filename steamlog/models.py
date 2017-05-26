from sqlalchemy.exc import IntegrityError
from steamlog.utils import get_json, get_player_info, get_genre
from flask_login import current_user
from steamlog import db, app as _app


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    steam_id = db.Column(db.String(17), index=True, nullable=False, unique=True)
    private = db.Column(db.Boolean, default=False)
    url = db.Column(db.String(32), index=True, nullable=False)
    name = db.Column(db.String(32), nullable=False)
    picture = db.Column(db.String(40), nullable=False)
    state = db.Column(db.Integer, nullable=False)
    game_events = db.relationship("GameEvent", backref="user")

    @property
    def json(self):
        if self.private and self.get_id() != current_user.get_id():
            details = dict(self)
            details["state"] = 0
            return details
        else:
            return dict(self)

    def __iter__(self):
        yield "steam_id", self.steam_id
        yield "name", self.name
        yield "picture", self.picture
        yield "private", self.private
        yield "my", self.get_id() == current_user.get_id()
        yield "state", self.state

    def update(self, profile):
        self.name = profile["personaname"]
        self.picture = profile["avatar"][-44:-4]
        self.url = profile["profileurl"].split("/")[-2]
        self.state = profile["personastate"]

    @staticmethod
    def get_or_create(steam_id):
        user = User.query.filter_by(steam_id=steam_id).first()
        if user is None:
            profile = get_player_info(steam_id)
            user = User(steam_id=steam_id)
            user.update(profile)
            db.session.add(user)
            db.session.commit()
        return user

    @property
    def prev(self):
        event = (
            GameEvent.query
            .filter_by(user_id=self.id)
            .order_by(GameEvent.id.desc())
            .first()
        )
        return event

    def play_game(self, prev, game_id, time):
        self.state = 7
        if prev is None or prev.stop_time is not None:
            print(f"{time} {self.name} STARTED <><> {game_id}")
            if Game.query.get(game_id) is None:
                Game.add_game(game_id)
            event = GameEvent(user=self, start_time=time, game_id=game_id)
            db.session.add(event)
        elif prev.game_id != int(game_id):
            self.stop_game(prev, time)
            self.play_game(self.prev, game_id, time)

    def stop_game(self, prev, time):
        if prev is not None and prev.stop_time is None:
            print(f"{time} {self.name} STOPPED [[]] {prev.game_id}")
            prev.stop_time = time
            db.session.add(prev)

    # flask_login properties
    @property
    def is_authenticated(self):
        return True
    @property
    def is_active(self):
        return True
    @property
    def is_anonymous(self):
        return False
    def get_id(self):
        return str(self.id)


class Game(db.Model):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    name = db.Column(db.String(255), index=True, nullable=False)
    genres = db.Column(db.ARRAY(db.String(255)))
    game_events = db.relationship("GameEvent", backref="game")

    @staticmethod
    def add_game(game_id):
        print(f"Adding game {game_id}")
        apps = get_json(_app.config["STEAM_APP_LIST"])["applist"]["apps"]
        apps = [app for app in apps if app["appid"] == int(game_id)]
        name = apps[0]["name"] if len(apps) > 0 else "__UNKNOWN_GAME__"
        genres = get_genre(game_id)
        game = Game(id=game_id, name=name, genres=genres)
        db.session.add(game)
        db.session.commit()

    def __iter__(self):
        yield "id", self.id
        yield "name", self.name
        yield "genres", self.genres or ["Other"]


class GameEvent(db.Model):
    __tablename__ = "game_events"
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime, nullable=False)
    stop_time = db.Column(db.DateTime, nullable=True)

    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __iter__(self):
        yield "game_id", self.game_id
        yield "start_time", self.start_time.timestamp()
        yield "stop_time", (self.stop_time.timestamp()
                            if self.stop_time is not None
                            else None)
